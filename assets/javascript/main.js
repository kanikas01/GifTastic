
$(document).ready(function () {

  // ---------- Global variables ---------- //

  var $foodButtonsDiv = $("#food-buttons");
  var $foodFormDiv = $("#food-form");
  var $foodsDiv = $("#foods");

  // Create array of foods
  var foods = ["cow"];

  //  For food in food array
  //    add food button to page 
  
  foods.forEach(addButton);


  // ---------- Click handlers ---------- //

  // button - add button to page
  $('#add-food').on('click', function(event) {
    event.preventDefault();
    var newFood = $("#food-input").val();
    addButton(newFood);
    $("#food-input").val("");
  });

  // gif button - get gifs and add to page
  $('#food-button').on('click', function(event) {
    var queryTopic = tomato; // define me 
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=D39qfZFwvT1y8rgUTRAWeqRm5du5pQ2q&tag=" + queryTopic;

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      // After the data from the AJAX request comes back
      .then(function (response) {
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
  $foodsDiv.on('click', '.gif', function () {
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
  function addButton(food) {
    console.log(food);
  }

  // Display new food gifs on page with rating above each gif
  function addGifs() {
    clear();
    // Create ajax request for a given food
  }

  function clear() {
    $foodsDiv.empty();
  }

});
