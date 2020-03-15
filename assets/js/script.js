//global vars
let btns = ["Ninja Turtles", "Die Hard", "Family Matters", "Bill Nye the Science Guy"];

function buttonDisplay() {
     $("#button-queries").empty();
    for (var i = 0; i < btns.length; i++) {
      var a = $("<button>");
      a.addClass("query");
    //   a.addClass("btn btn-default btn-xs");
      a.attr("data-name", btns[i]);
      a.text(btns[i]);
      $("#button-queries").append(a);
      console.log(btns[i]);
    }
  }

buttonDisplay();

  $("#AddGifbutton").on("click", function(event) {
    event.preventDefault();
    var item = $("#user-input").val().trim();
    btns.push(item);
    buttonDisplay();
  });

//   gif find api
    function gifapi() {
        var key = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
        var name = $(this).attr("data-name");
        console.log("this is the button info  "+name);
        //   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key="+key+"&tag="+name;
        console.log("this is the url  "+queryURL)
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log("this is the button info  "+name);
            var imgUrl = response.data.image_original_url;
            var imgString = imgUrl.split(".gif");
            var imageStill = imgString[0]+"_s.gif";
            var itemimg = $("<img>");
            itemimg.attr("src", imageStill);
            itemimg.attr("data-still", imageStill);
            itemimg.attr("data-animate", imgUrl);
            itemimg.attr("alt", "image");
            itemimg.attr("data-state", "still");
            itemimg.attr("class", "gif")

            console.log(imgUrl);
            console.log(itemimg)
  
            $("#gifspace").prepend(itemimg);
          });
    };

    //gif pause and play
    function pausePlay() {
      var current = $(this).attr("data-state");
      console.log(current);
      if (current === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
      }
      if (current === "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
      }
    };

    $(document).on("click", ".query", gifapi);
    $(document).on("click", ".gif", pausePlay);
