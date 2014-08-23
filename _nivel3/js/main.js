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
    draw = '.alert-box > div';
    answers = $('#' + form).serializeArray();
    console.log(answers);
    $(draw).empty();
    $(draw).append('<a href="#" class="close">x</a>');
    return $.each(answers, function(index, elem) {
      var answer, correct;
      answer = elem.value;
      correct = v[elem.name];
      console.log(answer, correct, String(answer) === String(correct));
      if (String(answer).toLowerCase() === String(correct).toLowerCase()) {
        $(draw).append('<p>' + (index + 1) + '. Correct</p>');
      } else {
        $(draw).append('<p>' + (index + 1) + '. Incorrect</p>');
      }
      return $('.alert-box').fadeIn(500);
    });
  };

  $(document).ready(function() {
    load('./templates/A0.html');
    $('#menu a').on('click', function(e) {
      e.preventDefault();
      return load('./templates/' + $(this).attr('href'));
    });
    return $('.close').on('click', function(e) {
      e.preventDefault();
      return $('.alert-box').fadeOut(500);
    });
  });

}).call(this);
