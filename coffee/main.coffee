load = (url) ->
	cont = $('#cont')
	cont.empty()
	cont.load url, ->
		$('.eval').on 'click', (e) ->
			e.preventDefault()
			form = $(e.target).data('target')
			draw = $(e.target).data('draw')
			console.log form, draw
			evaluate form, draw

evaluate = (form, draw) ->
	answers = $('#'+form).serializeArray()
	console.log answers
	$('#'+draw).empty()
	$.each answers, (index, elem) ->
		answer = elem.value
		correct = v[elem.name]
		console.log answer, correct, String(answer) is String(correct)
		if String(answer).toLowerCase() is String(correct).toLowerCase()
			$('#'+draw).append (index + 1) + '. Correct<br />'
		else
			$('#'+draw).append (index + 1) + '. Incorrect<br />'

$(document).ready ->
	load './templates/A0.html'
	$('#menu a').on 'click', (e) ->
		e.preventDefault()
		load './templates/' + $(@).attr('href')