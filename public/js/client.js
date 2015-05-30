var xmlhttp = new XMLHttpRequest();
var url = "/api/frontpage";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var json = xmlhttp.responseText;
        React.render(News({'data' : JSON.parse(json)}), document.getElementById('body'));
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();