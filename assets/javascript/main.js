
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


  // ---------- Event listeners ---------- //

  // button - add button to page
  $('#add-food').on('click', function(event) {
    event.preventDefault();
    var newFood = $("#food-input").val();
    addButton(newFood);
    $("#food-input").val("");
  });

  // gif button - get gifs and add to page
  $('#food-button').on('click', addGifs);

  // image - click to start or stop animation
  $foodsDiv.on('click', '.image', toggleImage);


  // ---------- Event handlers ---------- //

  // Add new button to page
  function addButton(food) {
    console.log(food);
  }

  // Display new food gifs on page with rating above each gif
  function addGifs() {
    clear();
    // Create ajax request for a given food
  }
  
  function toggleImage() {
    // If you click on still image it animates
    // If you click on animated image, it stops

  }
  

  // ---------- Helper functions ---------- //

  function clear() {
    $foodsDiv.empty();
  }

});

