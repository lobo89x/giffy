//global vars
let btns = ["Ninja Turtles", "Die Hard", "Family Matters", "Bill Nye the Science Guy"];

function buttonDisplay() {
     $("#button-queries").empty();
    for (var i = 0; i < btns.length; i++) {
      var a = $("<button>");
      a.addClass("query");
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

//   $("#button-queries").on("click", function() {
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
            var itemimg = $("<img>");
            itemimg.attr("src", imgUrl);
            itemimg.attr("alt", "image");

            console.log(imgUrl);
            console.log(itemimg)
  
            $("#gifspace").prepend(itemimg);
          });
    };

    $(document).on("click", ".query", gifapi);