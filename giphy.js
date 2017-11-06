

    // an array of themed buttons created here
var topics = ['bikram', 'yoga', 'vegan', 'vegetarian', 'nutrition', 'exercise', 'pilates', 'calisthenics', 'ashtanga', 'vinyasa'];

function createButtons() {
    $('#buttonPopulate').empty();


    for (var i = 0; i < topics.length; i++) {
        var labelButton = $('<button>');
        labelButton.addClass('health');
        labelButton.attr('type', 'button');
        labelButton.attr('data-name', topics[i]);
        labelButton.text(topics[i]);
        $('#buttonPopulate').append(buttons);
    }
}

createButtons();

// when the user pushes a button, gifs are generated on the webpage
$(document).on('click', '.health', function() {
    var e = $(this).data("name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + e + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g&pg";
    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div>');
                var gifImage = $('<img>');
                var rating = results[i].rating;
                var ratingDisplay = $('<p>').text("Rating: " + rating);
                gifImage.attr('src', results[i].images.fixed_height_still.url);
                gifImage.addClass('gif');
                gifImage.attr('data-still', results[i].images.fixed_height_still.url);
                gifImage.attr('data-animate', results[i].images.fixed_height.url);
                gifImage.attr('data-state', 'still')
                gifDiv.append(gifImage);
                gifDiv.append(ratingDisplay);
                $('#gifPopulate').prepend(gifDiv);
             }
           });
      });

$(document).on('click', '.gif', function() {
    //Loading the clicked Gif's data state into a var called state
    var state = $(this).attr('data-state');
    //The if then statement to allow animation and pausing the gif
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

	});

$("#addenterText").on("click", function() {
    var enterTextTask = $('#enterText').val().trim();
    topics.push(enterTextTask);
    createButtons();
    return false
});

