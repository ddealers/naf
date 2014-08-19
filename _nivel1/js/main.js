(function() {
  var load;

  $(document).ready(function() {
    return load('./templates/A0.html');
  });

  load = function(url) {
    var cont;
    cont = $('#cont');
    cont.empty();
    return cont.load(url, function() {
      return console.log('loaded');
    });
  };

}).call(this);
