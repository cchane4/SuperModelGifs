

    // an array of themed buttons
 var topics = ['bikram', 'yoga', 'vegan', 'vegetarian', 'nutrition', 'exercise', 'pilates', 'calisthenics', 'ashtanga', 'vinyasa'];

 function createButtons() {
     $('#gifSpace').empty();
     for (var i = 0; i < topics.length; i++) {
         var buttons = $('<button data-health =' + topics[i] + ">" + topics[i] + '</button>');
         $('#buttonDiv').append(buttons);
     }
 }

 createButtons();

 $(document).on('click', 'button', function() {
     var e = $(this).data("health");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + e + "&api_key=dc6zaTOxFJmzC&limit=10";
     $.ajax({
             url: queryURL,
             method: 'GET'
         })
         .done(function(response) {
             var results = response.data;
             for (var i = 0; i < results.length; i++) {
                 var gifDiv = $('<div class="item">');
                 var rating = results[i].rating;
                 var j = $('<p>').text("Rating: " + rating);
                 var gifImage = $('<img>');
                 gifImage.attr('src', results[i].images.fixed_height.url);
                 gifDiv.append(j);
                 gifDiv.append(gifImage);
                 $('#gifSpace').prepend(gifDiv);

             }

         });

 });
 //this is where the new themed buttons are created from the text field.
 $("#addTodo").on("click", function() {
     var todoTask = $('#todo').val().trim();
     topics.push(todoTask);
     createButtons();
     return false
 });