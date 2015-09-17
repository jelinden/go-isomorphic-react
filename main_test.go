package main

import (
	"testing"
)

func benchmarkRender(i int, b *testing.B) {
	fetchFeed()
	b.ResetTimer()
	v := newRenderer([]string{"public/js/frontpage.js", "public/js/common.js"})
	for n := 0; n < b.N; n++ {
		v.runCmd(`
				var data = ` + rss + `;
				React.renderToString(News({'data' : data}));
		`)
	}
}

func BenchmarkRender1(b *testing.B) { benchmarkRender(1, b) }
