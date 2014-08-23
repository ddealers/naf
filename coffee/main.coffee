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
	#draw = '#'+draw
	draw = '.alert-box > div'
	answers = $('#'+form).serializeArray()
	console.log answers
	$(draw).empty()
	$(draw).append '<a href="#" class="close">x</a>'
	$.each answers, (index, elem) ->
		answer = elem.value
		correct = v[elem.name]
		console.log answer, correct, String(answer) is String(correct)
		if String(answer).toLowerCase() is String(correct).toLowerCase()
			$(draw).append '<p>' + (index + 1) + '. Correct</p>'
		else
			$(draw).append '<p>' + (index + 1) + '. Incorrect</p>'
		$('.alert-box').fadeIn 500

$(document).ready ->
	load './templates/A0.html'
	$('#menu a').on 'click', (e) ->
		e.preventDefault()
		load './templates/' + $(@).attr('href')
	$('.close').on 'click', (e) ->
		e.preventDefault()
		$('.alert-box').fadeOut 500