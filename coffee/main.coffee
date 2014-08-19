$(document).ready ->
	load './templates/A0.html'

load = (url) ->
	cont = $('#cont')
	cont.empty()
	cont.load url, ->
		console.log 'loaded'