package main

import (
	"github.com/robertkrimen/otto"
	"io/ioutil"
)

type renderer struct {
	*otto.Otto
}

func newRenderer(files []string) *renderer {
	r := &renderer{otto.New()}
	r.runFile("assets/global.js")
	r.runFile("public/js/react-0.13.3.min.js")
	r.runFiles(files)
	return r
}

func (r *renderer) runCmd(cmd string) otto.Value {
	v, err := r.Run(cmd)
	if err != nil {
		panic(err)
	}
	return v
}

func (r *renderer) runFiles(files []string) {
	for _, file := range files {
		r.runFile(file)
	}
}

func (r *renderer) runFile(path string) otto.Value {
	data, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}

	result, err := r.Run(data)
	if err != nil {
		panic(err)
	}
	return result
}
