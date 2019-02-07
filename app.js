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
			var id = data.items[0].snippet.resourceId.videoId;
			mainVid(id);
			resultsLoop(data);

		})
	}

	function mainVid(id) {
		//`` allows us to direct variables directly
		$('#video').html(`
			<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			`);
	}

	function resultsLoop(data) {
		//using an each loop
		$.each(data.items, function(i, item) {
			var thumb = item.snippet.thumbnails.medium.url;
			var title = item.snippet.title;
			var description = item.snippet.description.substring(0,100); //first 100 characters
			var vid = item.snippet.resourceId.videoId;

			//using .append, not .html, because we want to reflect each data item in the loop on the DOM
			//by using the data-key, we're tying it to the video ID
			$('main').append(`
				<article class="item" data-key="${vid}">

					<img src="${thumb}" alt="" class="thumb">
					<div class="details">
						<h4>${title}</h4>
						<p>${description + "..."}</p>
					</div>

				</article>
				`);
		});
	}

	//dig down into main and find article
	$('main').on('click', 'article', function() {
		//pull out the video id, stored in data key of article
		var id = $(this).attr('data-key');
			//pass it to mainVid
			mainVid(id);
	});

});
