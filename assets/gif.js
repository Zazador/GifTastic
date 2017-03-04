$(document).ready(function(){


	var games = ["World of Warcraft", "Pokemon", "Mario", "Starcraft", "Overwatch", "Hearthstone", "Neopets", "Digimon",
	"Final Fantasy", "Sonic", "Dark Souls"];

	initialButtons();

	function initialButtons() {
		for (var i = 0; i < games.length; i++) {
			var gifHolder = $("<button/>").attr({
				type: "button",
				name: "btn_"+i,
				id: "gameButton",
				class: "btn btn-default"
			});
			$(gifHolder).text(games[i]);
			$("#gifButtons").append(gifHolder);
		}
	}

	$("#newGame").on("click", function() {
		if (!$("#newCat").val()) {
			return;
		} else {
			var newGame = $("#newCat").val();
			$("#newCat").val("");
			var gifHolder = $("<button/>").attr({
				type: "button",
				id: "newGameButton",
				class: "btn btn-default"
			});
			$(gifHolder).text(newGame);
			$("#gifButtons").append(gifHolder);
		}
	});

	$("#gifDiv").on("click", "img", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

// Event listener for all button elements
$("#gifButtons").on("click", "button", function() {
	console.log("buttonClicked");
	if ($(this).attr('id') === "newGame") {
		return;
	} else {
		$("#gifDiv").empty();
      // In this case, the "this" keyword refers to the button that was clicked
      var game = $(this).text();
      console.log(game);

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      game + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
      	url: queryURL,
      	method: "GET"
      })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var videogameGif = $("<img>").attr({
              	"data-state": "still",
              	src: results[i].images.fixed_height_still.url,
              	"data-animate":  results[i].images.fixed_height.url,
              	"data-still": results[i].images.fixed_height_still.url
              });

              // Appending the paragraph and videogameGif we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(videogameGif);

              // Prepending the gifDiv to the "#gifDiv" div in the HTML
              $("#gifDiv").append(gifDiv);
          }
      }
  });
    }
});
});