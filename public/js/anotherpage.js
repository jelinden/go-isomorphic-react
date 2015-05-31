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
                React.DOM.h1(null, "Go - React - Isomorphic"),
                React.DOM.div(null, "Another page"),
                React.createElement("a", {
                        href: "/",
                        onClick: clickHandler
                    }, "Frontpage")
            )
        );
}
}));