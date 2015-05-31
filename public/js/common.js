var clickHandler = function(e) {
  e.preventDefault()
  history.pushState({}, "", e.target.href);
  route();
}