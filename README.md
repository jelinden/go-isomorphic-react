React.js server and client side rendering with Go
=====

![ScreenShot](screenshot.jpg)

This experiment is based on [otto](https://github.com/robertkrimen/otto), a Javascript interpreter for Go.
The goal for the experiment was to explore if reactjs server side rendering could be 
done with Go and to use the same code in the browser. It seems to work fine if you can 
cache server side rendering results and use them. Otherwise it's just too slow.

In rss.go we are fetching a rss feed (scheduled in main.go). Scheduling also renders the results 
and saves them in a global variable to be used later.

To run:
```bash
go build && ./go-isomorphic-react
```

To benchmark serverside rendering:
```bash
go test -bench=.
```

The result on my MacBook Air (1.4 GHz i5):
```bash
PASS
BenchmarkRender1               1        4041006374 ns/op
ok      github.com/jelinden/go-isomorphic-react 4.059s
```
