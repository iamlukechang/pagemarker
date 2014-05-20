(function () {
  var style = document.createElement('link');
  style.id = 'Pagemarks-Chrome-style';
  style.href = chrome.extension.getURL('contentstyle.css');
  style.type = 'text/css';
  style.rel = 'stylesheet';
  if (document.head) {
    document.head.appendChild(style);
  } else {
    var head = document.createElement('head'),
        body = document.body;
    document.documentElement.insertBefore(head, body);
    head.appendChild(style);
  }
  
})();