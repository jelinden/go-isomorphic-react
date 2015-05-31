var React = self.React;

var Another = React.createFactory(React.createClass({displayName: 'Another',
    render: function () {
        if (typeof window !== 'undefined') {
            console.log("This is client side react!")
        }
        return (
            React.DOM.div(null,
                React.DOM.div({className: "pure-menu pure-menu-horizontal"},
                    React.createElement("a", {
                            className: "pure-menu-heading pure-menu-link",
                            href: "/",
                            onClick: clickHandler
                        }, "Home"),
                    React.DOM.ul({className: "pure-menu-list"},
                        React.DOM.li({className: "pure-menu-item"},
                            React.createElement("a", {
                                href: "/anotherpage",
                                onClick: clickHandler
                                }, "Another page")
                        )
                    )
                ),
                React.DOM.div({className: "main"},
                    React.DOM.h1(null, "Go - React - Isomorphic"),
                    React.DOM.h2(null, "Another page"),
                    AnotherItem()
                )
            )
        );
}
}));

var AnotherItem = React.createFactory(React.createClass({displayName: 'AnotherItem',
    render: function () {
        return (
            React.DOM.div({className: "anotherItem"},
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            )
        );
    }
}));