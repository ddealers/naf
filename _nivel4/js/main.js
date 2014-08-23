(function() {
  var evaluate, evaluateList, load;

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
        if ($('#' + form).hasClass('list')) {
          return evaluateList(form, draw);
        } else {
          return evaluate(form, draw);
        }
      });
    });
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
      var answer, correct, key, _i, _len;
      answer = elem.value;
      correct = v[elem.name];
      if (Object.prototype.toString.call(correct) === '[object Array]') {
        for (_i = 0, _len = correct.length; _i < _len; _i++) {
          key = correct[_i];
          if (String(answer).toLowerCase() === String(correct[key]).toLowerCase()) {
            $(draw).append('<p>' + (index + 1) + '. Correct</p>');
          } else {
            $(draw).append('<p>' + (index + 1) + '. Incorrect</p>');
          }
        }
      } else {
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
