$(document).ready(function(){


var games = ["World of Warcraft", "Pokemon", "Mario", "Starcraft", "Overwatch", "Hearthstone", "Neopets", "Digimon",
"Final Fantasy", "Sonic", "Dark Souls"];

initialButtons();

function initialButtons() {
	for (var i = 0; i < games.length; i++) {
		var gifHolder = $("<button/>").attr({
			type: "button",
			name: "btn_"+i
		});
		$(gifHolder).text(games[i]);
		$("#gifDiv").append(gifHolder);
	}
}

$("#newGame").click(function() {
    var newGame = $("#newCat").val();
    $("#newCat").val("");
    var gifHolder = $("<button/>").attr({
			type: "button"
		});
		$(gifHolder).text(newGame);
		$("#gifDiv").append(gifHolder);
});
















});