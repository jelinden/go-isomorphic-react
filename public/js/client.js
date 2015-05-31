var xmlhttp = new XMLHttpRequest();

var route = function() {
    if (window.location.pathname === '/') {
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = xmlhttp.responseText;
                React.render(News({'data' : JSON.parse(json)}), document.getElementById('body'));
            }
        }
        xmlhttp.open("GET", "/api/frontpage", true);
        xmlhttp.send();

    }

    if (window.location.pathname === '/anotherpage') {
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = xmlhttp.responseText;
                React.render(Another({'data' : JSON.parse(json)}), document.getElementById('body'));
            }
        }
        xmlhttp.open("GET", "/api/anotherpage", true);
        xmlhttp.send();
    }
}
route();