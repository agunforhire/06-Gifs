var gifs = ['LOL', 'SMH', 'FACE PALM'];

function renderButtons() {

    $("#gif-view").empty();
    for (var i = 0; i < gifs.length; i++) {
      var a = $("<button>");
      a.addClass("gif-button");
      a.attr("data-name", gifs[i]);
      a.text(gifs[i]);
      $("#gif-view").append(a);
    }
  };
  
  renderButtons();

  $("#add-gif").on("click", function(event) {
    event.preventDefault();

    var gifInput = $("#gif-input").val().trim();
    gifs.push(gifInput);

    renderButtons();
  });

//Our Display Funciton

  function displayGifs() {
  
    //Checks the kind of button pressed
    var search = $(this).attr("data-name");
    //Uses that data to query Github
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      search + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {

      //console logging our response
        console.log(queryURL);

        console.log(response);

      //looping through the response data
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          var gifDiv = $("<div>");

          var p = $("<p>").text("Rating: " + results[i].rating);

          var gifImage = $("<img>");
          //Sets the default image to Still
          gifImage.attr("src", results[i].images.fixed_height_still.url);
          //Pulls URLs for both still and animated versions
          gifImage.attr("data-animate", results[i].images.fixed_height.url);
          gifImage.attr("data-still", results[i].images.fixed_height_still.url);
          //Sets default state to still
          gifImage.attr("data-state", "still")
          //Adds gif class for click handler
          gifImage.addClass("gif");

          gifDiv.append(p);
          gifDiv.append(gifImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  };

// Switch between Still and Animated

function changeState()  {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
  };
};

// Click handlers

$(document).on("click", ".gif-button", displayGifs);


$(document).on("click", ".gif", changeState)
