load = (url) ->
	cont = $('#cont')
	cont.empty()
	cont.load url, ->
		$('.eval').on 'click', (e) ->
			form = $(e.target).data('target')
			console.log form
			evaluate form

evaluate = (form) ->
	answers = $('#'+form).serializeArray()
	console.log answers
	$('#z1').empty()
	$.each answers, (index, elem) ->
		answer = elem.value
		correct = v[elem.name]
		if answer is correct
			$('#z1').append (index + 1) + '. Correct<br />'
		else
			$('#z1').append (index + 1) + '. Incorrect<br />'
	###
	answers = $('.q')
	$('#z1').empty()
	$.each answers, (index, elem) ->
		answer = $(elem).val()
		correct = $(elem).data('v').toString()
		if answer is correct
			$('#z1').append (index + 1) + '. Correct<br />'
		else
			$('#z1').append (index + 1) + '. Incorrect<br />'
	###

$(document).ready ->
	load './templates/A0.html'
	$('#menu a').on 'click', (e) ->
		e.preventDefault()
		load './templates/' + $(@).attr('href') + '.html'