(function() {
  var evaluate, load;

  load = function(url) {
    var cont;
    cont = $('#cont');
    cont.empty();
    return cont.load(url, function() {
      return $('.eval').on('click', function(e) {
        var draw, form;
        e.preventDefault();
        form = $(e.target).data('target');
        draw = $(e.target).data('draw');
        console.log(form, draw);
        return evaluate(form, draw);
      });
    });
  };

  evaluate = function(form, draw) {
    var answers;
    answers = $('#' + form).serializeArray();
    $('#' + draw).empty();
    return $.each(answers, function(index, elem) {
      var answer, correct;
      answer = elem.value;
      correct = v[elem.name];
      console.log(answer, correct, String(answer) === String(correct));
      if (String(answer).toLowerCase() === String(correct).toLowerCase()) {
        return $('#' + draw).append((index + 1) + '. Correct<br />');
      } else {
        return $('#' + draw).append((index + 1) + '. Incorrect<br />');
      }
    });
  };

  $(document).ready(function() {
    load('./templates/A0.html');
    return $('#menu a').on('click', function(e) {
      e.preventDefault();
      return load('./templates/' + $(this).attr('href'));
    });
  });

}).call(this);
