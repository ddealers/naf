(function() {
  var evaluate, load;

  load = function(url) {
    var cont;
    cont = $('#cont');
    cont.empty();
    return cont.load(url, function() {
      return $('.eval').on('click', function(e) {
        var form;
        form = $(e.target).data('target');
        console.log(form);
        return evaluate(form);
      });
    });
  };

  evaluate = function(form) {
    var answers;
    answers = $('#' + form).serializeArray();
    console.log(answers);
    $('#z1').empty();
    return $.each(answers, function(index, elem) {
      var answer, correct;
      answer = elem.value;
      correct = v[elem.name];
      if (answer === correct) {
        return $('#z1').append((index + 1) + '. Correct<br />');
      } else {
        return $('#z1').append((index + 1) + '. Incorrect<br />');
      }
    });

    /*
    	answers = $('.q')
    	$('#z1').empty()
    	$.each answers, (index, elem) ->
    		answer = $(elem).val()
    		correct = $(elem).data('v').toString()
    		if answer is correct
    			$('#z1').append (index + 1) + '. Correct<br />'
    		else
    			$('#z1').append (index + 1) + '. Incorrect<br />'
     */
  };

  $(document).ready(function() {
    load('./templates/A0.html');
    return $('#menu a').on('click', function(e) {
      e.preventDefault();
      return load('./templates/' + $(this).attr('href'));
    });
  });

}).call(this);
