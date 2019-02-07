// setup for jQuery by creating the container
$(document).ready(function() {
	var key = 'AIzaSyDXkGlhZ1rmVUKdczl8v5h1yYv40RUTP-s';
	var playlistId = 'PL2fnLUTsNyq7A335zB_RpOzu7hEUcSJbB';
	var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

	//GET options - conforms to YouTube API expectations as documented
	var options = {
		part: 'snippet',
		key: key,
		maxResults: 20,
		playlistId: playlistId
	}

	loadVids();

	function loadVids() {
		//sends a request
		$.getJSON(URL, options, function(data){
			console.log(data);
		})
	}
});
