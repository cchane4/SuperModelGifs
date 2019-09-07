
// an array of themed buttons created here
let topics = ['professor x', 'emma frost', 'wolverine', 'magneto', 'jean grey'];

let create_buttons = () => {
    $('#button_populate').empty();
    for (let i = 0; i < topics.length; i++) {
        let buttons = $('<button>');
        buttons.addClass('build'); //added a class to the dynamically created button for animals
        buttons.attr('type', 'button'); //set the button type attribute
        buttons.attr('data-name', topics[i]); //added a data- attribute for items in array
        buttons.text(topics[i]);
        $('#button_populate').append(buttons);
    }
}

create_buttons();
// when the user pushes a button, the Populating container is emptied and gifs are generated on the webpage
$(document).on('click', '.build', function() {
    $('#gifPopulate').empty();
    let e = $(this).data("name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + e + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            let results = response.data;
            for (let i = 0; i < results.length; i++) {
                let gifDiv = $('<div>');
                let gifImage = $('<img>');
                let rating = results[i].rating;
                let ratingDisplay = $('<p>').text("Rating: " + rating);
                gifImage.attr('src', results[i].images.fixed_height_still.url);
                gifImage.addClass('gif');
                gifImage.attr('data-still', results[i].images.fixed_height_still.url);
                gifImage.attr('data-animate', results[i].images.fixed_height.url);
                gifImage.attr('data-state', 'still');
                gifDiv.append(ratingDisplay);
                gifDiv.prepend(gifImage);
                $('#gifPopulate').prepend(gifDiv);

            }

        });

});

// if the user clicks on the gif it animates, if they click again the gif pauses. 
$(document).on('click', '.gif', function() {
    let state = $(this).attr('data-state');
    //The if then statement to allow animation and pausing the gif
    if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

// the user can create their own buttons that will also generate new gifs with the same functionality as all other gifs (pausing/animating)
$("#addenterText").on("click",() => {
    let enterTextTask = $('#enterText').val().trim();
    topics.push(enterTextTask);
    create_buttons();
    return false
});