
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
        response.data.forEach(function (element) {
          // Get urls for static and animated images
          var stillImageUrl = element.images.fixed_width_still.url;
          var gifUrl = element.images.fixed_width.url;
          // Construct image tag
          var $newGif = $('<img class="gif">');
          $newGif.attr('src', stillImageUrl);
          $newGif.attr('data-still', stillImageUrl);
          $newGif.attr('data-animate', gifUrl);
          $newGif.attr('data-state', 'still');

          // TODO - get rating and construct rating+image combo element

          // Add new element to page
          $topicsDiv.prepend($newGif);
        });
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
