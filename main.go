package main

import (
	"fmt"
	"github.com/labstack/echo"
	mw "github.com/labstack/echo/middleware"
	"github.com/rs/cors"
	"github.com/thoas/stats"
	"io"
	"net/http"
	"text/template"
	"time"
)

type (
	Template struct {
		templates *template.Template
	}
)

var frontPageRendered string

func (t *Template) Render(w io.Writer, name string, data interface{}) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func index(c *echo.Context) error {
	return c.Render(http.StatusOK, "index", frontPageRendered)
}

func anotherpage(c *echo.Context) error {
	return c.Render(http.StatusOK, "index", reactAnother())
}

func apiFrontPage(c *echo.Context) error {
	return c.JSON(http.StatusOK, rssObject)
}

func apiAnotherPage(c *echo.Context) error {
	return c.JSON(http.StatusOK, "")
}

func reactIndex() {
	v := newRenderer([]string{"public/js/frontpage.js", "public/js/common.js"}).
		runCmd(`
			var data = ` + rss + `;
			React.renderToString(News({'data' : data}));
	`)
	//fmt.Printf("\n%v\n", v)
	sValue, err := v.ToString()
	if err != nil {
		fmt.Println(err)
	}
	frontPageRendered = sValue
}

func reactAnother() string {
	v := newRenderer([]string{"public/js/anotherpage.js", "public/js/common.js"}).
		runCmd(`
			React.renderToString(Another({'data' : {}}));
	`)
	//fmt.Printf("\n%v\n", v)
	sValue, err := v.ToString()
	if err != nil {
		fmt.Println(err)
	}
	return sValue
}

func main() {
	t1 := time.Now()
	fetchFeed()
	reactIndex()
	fmt.Println("rendering frontpage ready in", time.Now().Sub(t1))
	e := echo.New()
	e.Use(mw.Logger())
	e.Use(mw.Recover())
	e.Use(mw.StripTrailingSlash())
	e.Use(mw.Gzip())
	e.Use(cors.Default().Handler)

	// stats
	s := stats.New()
	e.Use(s.Handler)
	e.Get("/stats", func(c *echo.Context) error {
		return c.JSON(http.StatusOK, s.Data())
	})
	// static files
	e.Static("/public/js", "public/js")
	e.Static("/public/css", "public/css")
	e.Static("/favicon.ico", "public/favicon.ico")

	t := &Template{
		// Cached templates
		templates: template.Must(template.ParseFiles("assets/html/index.html")),
	}
	e.SetRenderer(t)
	e.Get("/", index)
	e.Get("/anotherpage", anotherpage)
	e.Get("/api/frontpage", apiFrontPage)
	e.Get("/api/anotherpage", apiAnotherPage)
	go tick()
	fmt.Println("serving at port 3000")
	e.Run(":3000")
}

func tick() {
	ticker := time.NewTicker(70 * time.Second)
	for {
		fetchFeed()
		reactIndex()
		<-ticker.C
	}
}
