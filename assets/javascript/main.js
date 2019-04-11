$(document).ready(function () {

  //create topic array 
  var topics = [
    "sportscar", "ocean", "tiger", "rick and morty", "family guy", "fighting",
    "napoleon", "warrior", "dinosaurs", "drinking", "food", "pizza", "skateboard", "lumberjack", '300', "runner", "treehouse"
  ];
  
  //create default buttons for searching
  function mkButtons() {
    $('.btnBoard').empty();

    for (var i = 0; i < topics.length; i++) {
      var btn = $("<button>");
      btn.addClass("topics btn btn-primary m-3 p-3");
      btn.attr("data-type", topics[i]);
      btn.text(topics[i]);
      $('.btnBoard').append(btn);
    };
  };

  mkButtons();

  //add new topic buttons
  $("#addButton").on("click", function (event) {
    event.preventDefault();
    var newTopic = $("input").eq(0).val();
    var btn = $("<button>");

    if (newTopic.length > 2) {
      topics.push(newTopic);
      btn.addClass("topics btn btn-primary m-3 p-3");
      btn.attr("data-type", newTopic);
      btn.text(newTopic);
      $('.btnBoard').append(btn);
    }

  });


  //button search
  $(document).on("click", ".topics", function () {
    $("#imageBoard").empty();
    $(".topics").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=rnTI4CM8RAxngyt9ST3TkL7xeQ0LJrmS&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var topicDiv = $("<div class=\"card m-2\">");

          var rating = results[i].rating;

          var ptag = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var topicImage = $("<img>");
          topicImage.attr("src", still);
          topicImage.attr("data-still", still);
          topicImage.attr("data-animate", animated);
          topicImage.attr("data-state", "still");
          topicImage.addClass("topic-image");

          
          topicDiv.append(topicImage);
          topicDiv.append(ptag);

          $("#imageBoard").append(topicDiv);
        }
      });
  });

  $(document).on("click", ".topic-image", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});




