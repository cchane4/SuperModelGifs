
// an array of themed buttons created here
var topics = ['naomi campbell', 'cindy crawford ', 'christy turlington', 'linda evangelista', 'claudia schiffer'];

function createButtons() {
    $('#buttonPopulate').empty();
    for (var i = 0; i < topics.length; i++) {
        var buttons = $('<button>');
        buttons.addClass('build'); //added a class to the dynamically created button for animals
        buttons.attr('type', 'button'); //set the button type attribute
        buttons.attr('data-name', topics[i]); //added a data- attribute for items in array
        buttons.text(topics[i]);
        $('#buttonPopulate').append(buttons);
    }
}

createButtons();
// when the user pushes a button, gifs are generated on the webpage
$(document).on('click', '.build', function() {
    var e = $(this).data("name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + e + "&api_key=dc6zaTOxFJmzC&limit=10";
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
                gifImage.attr('data-state', 'still');
                gifDiv.append(ratingDisplay);
                gifDiv.append(gifImage);
                $('#gifPopulate').prepend(gifDiv);

            }

        });

});

$(document).on('click', '.gif', function() {

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

// the user can create their own buttons that will also generate new gifs
$("#addenterText").on("click", function() {
    var enterTextTask = $('#enterText').val().trim();
    topics.push(enterTextTask);
    createButtons();
    return false
});