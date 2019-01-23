
$(document).ready(function () {

  // ---------- Global variables ---------- //

  var $topicButtonsDiv = $("#topic-buttons");
  var $topicFormDiv = $("#topic-form");
  var $topicsDiv = $("#topics");
  var giphyURL = "http://api.giphy.com/v1/gifs/search?q=";
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

  // Add user's new topic button to page
  $('#add-topic').on('click', function(event) {
    event.preventDefault();
    var newTopic = $("#topic-input").val();
    addButton(newTopic);
    $("#topic-input").val("");
  });

  // Get gifs and add to page
  $topicButtonsDiv.on('click', 'button', function(event) {
    var queryTopic = $(this).val();
    var queryURL = giphyURL + queryTopic + "&" + apiKey + "&" + limit;

    // Ajax request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
        console.log(response);


        // // Saving the image_original_url property
        // var imageUrl = response.data.image_original_url;

        // // Creating and storing an image tag
        // var catImage = $("<img>");

        // // Setting the catImage src attribute to imageUrl
        // catImage.attr("src", imageUrl);
        // catImage.attr("alt", "cat image");

        // // Prepending the catImage to the images div
        // $("#images").prepend(catImage);
      });
  });

  // image - click to start or stop animation
  $topicsDiv.on('click', '.gif', function () {
    var state = $(this).attr("data-state");
    // If you click on still image it animates
    // If you click on animated image, it stops
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
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
