document.addEventListener('DOMContentLoaded', function() {
  var els = document.getElementsByClassName('code-collapsed-toggle');
  for (var i = 0; i < els.length; i++) {
    els[i].addEventListener('click', function() {
      var sourceEl = this.parentElement.parentElement.getElementsByClassName('source')[0];
      if (sourceEl.className.indexOf('collapsed') !== -1) {
        sourceEl.className = sourceEl.className.replace(/\s*collapsed/, '');
      } else {
        sourceEl.className += ' collapsed';
      }
    });
  }
}, false);
