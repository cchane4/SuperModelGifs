$(document).ready(function(){ 
// an array of themed buttons 
var topics = ['bikram', 'yoga', 'vegan', 'vegetarian', 'nutrition', 'exercise', 'pilates','calisthenics', 'ashtanga', 'vinyasa']; 
	 for (var i = 0; i < topics.length; i++){ 
	 		var buttons = $('<button data-health =' + topics[i] + ">"+ topics[i] + '</button>')
			$('#buttonDiv').append(buttons); 
	} 
	
// those buttons produce  10 gif results 
	 $('button').on('click',function(){
	 	$('#gifsAppearHere').empty(); 
  		var e = $(this).data("health");
  		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + e + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({ 
			url:queryURL, 
			method:'GET'
		}).done(function(response){ 
			console.log(response);
			var results = response.data; 
			for (var i = 0; i < results.length; i++){ 
				var gifDiv = $('<div class="item">');
				var rating = results[i].rating; 
				var j = $('<p>').text("Rating: " + rating); 
				var gifImage = $('<img>'); 
				gifImage.attr('src', results[i].images.fixed_height.url);
				gifDiv.append(j);
				gifDiv.append(gifImage);
				$('#gifsAppearHere').prepend(gifDiv); 
			}
		}); 
	}); 

		$("#addTodo").on("click", function(){
			var todoTask = $('#todo').val().trim(); 
			var todoItem = $('<p>');
			var todoClose = $("<button data-health>");
			todoClose = $("<button data-health = " + todoTask + ">"); 
			todoClose.prepend(todoTask); 
			todoItem = todoItem.prepend(todoClose);
			$('#buttonDiv').append(todoClose);
			$('#todo').val(""); 

		return false;  
		}) 
});  
