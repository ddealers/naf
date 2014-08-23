load = (url) ->
	cont = $('#cont')
	cont.empty()
	cont.load url, ->
		$('.list input[type=checkbox]').val('false')
		$('.list input[type=checkbox]').on 'change', ->
			cb = $(this)
			cb.val(cb.prop('checked'))
		$('button.eval').on 'click', (e) ->
			e.preventDefault()
			form = $(e.target).data('target')
			draw = $(e.target).data('draw')
			console.log form, draw
			if $('#'+form).hasClass 'list'
				evaluateList form, draw
			else
				evaluate form, draw

evaluateList = (form, draw) ->
	draw = '.alert-box > div'
	response = '<p>1. Correct</p>'
	list = v[$('#'+form).data('list')];
	for item of list
		checked = $('[name="'+item+'"]').prop('checked') ? on : off
		if not checked is list[item]
			response = '<p>1. Incorrect</p>'
	$(draw).empty()
	$(draw).append '<a href="#" class="close">x</a>'
	$(draw).append response
	$('.alert-box').fadeIn 500

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

		if Array.isArray correct
			c = off
			for key of correct
				if String(answer).toLowerCase() is String(correct[key]).toLowerCase()
					c = on
			if c
				$(draw).append '<p>' + (index + 1) + '. Correct</p>'
			else
				$(draw).append '<p>' + (index + 1) + '. Incorrect</p>'
		else
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