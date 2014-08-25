(function() {
  var evaluate, evaluateGeneric, evaluateList, evaluateQuiz, evaluateScore, load;

  load = function(url) {
    var cont;
    cont = $('#cont');
    cont.empty();
    return cont.load(url, function() {
      $('.list input[type=checkbox]').val('false');
      $('.list input[type=checkbox]').on('change', function() {
        var cb;
        cb = $(this);
        return cb.val(cb.prop('checked'));
      });
      return $('button.eval').on('click', function(e) {
        var draw, form;
        e.preventDefault();
        form = $(e.target).data('target');
        draw = $(e.target).data('draw');
        console.log(form, draw);
        if ($('#' + form).hasClass('score')) {
          return evaluateScore(form, draw);
        } else if ($('#' + form).hasClass('list')) {
          return evaluateList(form, draw);
        } else if ($('#' + form).hasClass('generic')) {
          return evaluateGeneric(form, draw);
        } else if ($('#' + form).hasClass('quiz')) {
          return evaluateQuiz(form, draw);
        } else {
          return evaluate(form, draw);
        }
      });
    });
  };

  evaluateScore = function(form, draw) {
    var answer, answers, score, _i, _len;
    score = 0;
    draw = '.alert-box > div';
    answers = $('#' + form).serializeArray();
    for (_i = 0, _len = answers.length; _i < _len; _i++) {
      answer = answers[_i];
      score += parseInt(answer.value);
    }
    $(draw).empty();
    $(draw).append('<a href="#" class="close">x</a>');
    $(draw).append("<p>Score: " + score + "</p>");
    return $('.alert-box').fadeIn(500);
  };

  evaluateGeneric = function(form, draw) {
    draw = '.alert-box > div';
    $(draw).empty();
    $(draw).append('<a href="#" class="close">x</a>');
    console.log($('#' + form).data('generic'));
    $(draw).html($('#' + form).data('generic'));
    return $('.alert-box').fadeIn(500);
  };

  evaluateQuiz = function(form, draw) {
    draw = '.alert-box > div';
    $(draw).empty();
    $(draw).append('<a href="#" class="close">x</a>');
    $(draw).html('If you answered 5 A\'s or more you are a Middle Youth-er. <br>If you answered 5 B\'s or more you are a Yuppie. <br>If you answered 5 C\'s or more you are a Yubbie. <br>If you answered 5 D\'s or more you are a home-loving family person. <br>If you answered less than 5 in any of A-D you are a unique individual who is impossible to label.');
    return $('.alert-box').fadeIn(500);
  };

  evaluateList = function(form, draw) {
    var checked, item, list, response, _ref;
    draw = '.alert-box > div';
    response = '<p>1. Correct</p>';
    list = v[$('#' + form).data('list')];
    for (item in list) {
      checked = (_ref = $('[name="' + item + '"]').prop('checked')) != null ? _ref : {
        on: false
      };
      if (!checked === list[item]) {
        response = '<p>1. Incorrect</p>';
      }
    }
    $(draw).empty();
    $(draw).append('<a href="#" class="close">x</a>');
    $(draw).append(response);
    return $('.alert-box').fadeIn(500);
  };

  evaluate = function(form, draw) {
    var answers;
    draw = '.alert-box > div';
    answers = $('#' + form).serializeArray();
    console.log(answers);
    $(draw).empty();
    $(draw).append('<a href="#" class="close">x</a>');
    return $.each(answers, function(index, elem) {
      var answer, c, correct, key;
      answer = elem.value;
      correct = v[elem.name];
      if (Array.isArray(correct)) {
        c = false;
        for (key in correct) {
          if (String(answer).toLowerCase() === String(correct[key]).toLowerCase()) {
            c = true;
          }
        }
        if (c) {
          $(draw).append('<p>' + (index + 1) + '. Correct</p>');
        } else {
          $(draw).append('<p>' + (index + 1) + '. Incorrect</p>');
        }
      } else {
        console.log(String(answer).toLowerCase(), String(correct).toLowerCase());
        if (String(answer).toLowerCase() === String(correct).toLowerCase()) {
          $(draw).append('<p>' + (index + 1) + '. Correct</p>');
        } else {
          $(draw).append('<p>' + (index + 1) + '. Incorrect</p>');
        }
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
