var React = self.React;

var News = React.createFactory(React.createClass({displayName: 'News',
  render: function () {
    if (typeof window !== 'undefined') {
      console.log("This is client side react!")
    }
    return (
      React.DOM.div(null,
        React.DOM.h1(null, "Go - React - Isomorphic"),
        React.DOM.h2(null, this.props.data.Title),
        NewsList(this.props)
      )
    );
  }
}));

var NewsList = React.createFactory(React.createClass({displayName: 'NewsList',
  render: function () {
    var newsItem;
    if (this.props.data !== undefined && this.props.data.ItemList !== undefined) {
      newsItem = this.props.data.ItemList.map(function (item, i) {
        return NewsItem({title: item.Title, pubDate: item.PubDate, link: item.Link, key: i}, item.Description);
      });
    }
    return (
      React.DOM.div({className: "newsList"}, newsItem)
    );
  }
}));

var NewsItem = React.createFactory(React.createClass({displayName: 'NewsItem',
  render: function () {
    return (
      React.DOM.div({className: "newsItem", key: this.props.key},
        React.DOM.div({className: "pubDate"}, this.props.pubDate),
        React.createElement("a", {href: this.props.link},
          React.DOM.div({className: "title"}, this.props.title))
      )
    );
  }
}));