
$(document).ready(function () {

  // ---------- Global variables ---------- //

  var $topicButtonsDiv = $("#topic-buttons");
  var $topicsDiv = $("#topics");
  var giphyURL = "https://api.giphy.com/v1/gifs/search?q=";
  var apiKey = "api_key=D39qfZFwvT1y8rgUTRAWeqRm5du5pQ2q";
  var limit = "limit=10";

  // Create array of topics
  var topics = [
    "beans",
    "burgers",
    "catfish",
    "cheese",
    "dumplings",
    "mushrooms",
    "oranges",
    "oysters",
    "popcorn",
    "salad",
    "sausage",
    "shrimp",
    "tacos",
    "tofu"
  ];

  // Add a button to the page for each topic
  topics.forEach(addButton);


  // ---------- Click handlers ---------- //

  // Click to add user's new topic button to page
  $('#add-topic').on('click', function(event) {
    event.preventDefault();
    var newTopic = $("#topic-input").val();
    if (newTopic && !topics.includes(newTopic)) {
      topics.push(newTopic);
      $topicButtonsDiv.empty();
      topics.forEach(addButton);
    }
    $("#topic-input").val("");
  });

  // Click button to add gifs to page
  $topicButtonsDiv.on('click', 'button', function(event) {
    var queryTopic = $(this).val();
    // Swap spaces for '+' chars
    queryTopic = queryTopic.replace(/ /g, '+');
    var queryURL = giphyURL + queryTopic + "&" + apiKey + "&" + limit;
    console.log(queryURL);

    // Ajax request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
        response.data.forEach(function (element) {
          console.log(element);
          // Get image urls and rating
          var stillImageUrl = element.images.fixed_height_still.url;
          var gifUrl = element.images.fixed_height.url;
          var rating = element.rating.toUpperCase();

          // Construct image tag
          var $newGif = $('<img class="gif">');
          $newGif.attr('src', stillImageUrl);
          $newGif.attr('data-still', stillImageUrl);
          $newGif.attr('data-animate', gifUrl);
          $newGif.attr('data-state', 'still');

          // Create 'favorite' button
          var favoritesMessage = "Add to favorites";
          var $favoriteButton = $('<button type="button" class="favorite">');
          $favoriteButton.val(favoritesMessage);
          $favoriteButton.text(favoritesMessage);

          // Create download button
          // var $downloadButton = $('<button type="button" class="download">');
          var $downloadButton = $('<a href="data:' + element.images.original.url + '" target="_blank" download="giphy.gif">');
          $downloadButton.html('<button type="submit">Download!</button>');
          // $downloadButton.text("Download");

          // Construct div containing image, rating and button
          $newDiv = $('<div class="giphy-element">');
          $newH3 = $("<h3>");
          $newH3.text(rating);
          $newDiv.append($newGif);
          $newDiv.append($newH3);
          $newDiv.append($favoriteButton);
          $newDiv.append($downloadButton);

          // Add new div to page
          $topicsDiv.prepend($newDiv);
        });
      });
  });

  // Click an image to start or stop animation
  $('main').on('click', '.gif', function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  // Add gif to favorites
  $topicsDiv.on('click', '.favorite', function() {
    // Make a copy of the element to be added to favorites
    var favoriteGif = $(this).parent().clone();
    // Change button text
    favoriteGif.children("button").text("Remove from favorites");
    image = favoriteGif.children("img");
    // Image in favorites section should initially be still
    if (image.attr("data-state") === "animate") {
      image.attr("src", image.attr("data-still"));
      image.attr("data-state", "still");
    }
    favoriteGif.appendTo($("#favorites"));
  });

  // Remove gif from favorites
  $("#favorites").on('click', '.favorite', function () {
    $(this).parent().remove();
  });

  // ---------- Additional functions ---------- //

  // Add new button to page
  function addButton(topic) {
    var $newButton = $('<button type="button">');
    $newButton.val(topic);
    $newButton.text(topic);
    $topicButtonsDiv.append($newButton);
  }

});
