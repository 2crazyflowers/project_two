//Index Page
$(document).ready(function() {

  //Click Events
  $("#show-jokes").click(function(){
    $("#index-page").hide();
    $("#joke-list").show();
    $("#logo-main").animate({height:"90px"});
  });

  //Scroll Events
  window.sr = ScrollReveal({ duration: 2000 });
    sr.reveal('#individual-joke');
    $(".links").animate({bottom:"0px"});
  });

  //Update Votes
  $(document).on("click", ".spicy-vote", spicyVote); 
  $(document).on("click", ".icy-vote", icyVote); 

  //Spicy vote update
  function spicyVote() {
    if ($(this).parent().attr("data-guessed") === "true") {
      return;
    } else {
      var count = $(this).data('spicy');
      var thisId = $(this).data('id');
      var updatePost = {
        spicy: ++count,
        id: thisId
      }
      updateScore(updatePost);        
    }
    $(this).parent().attr("data-guessed", "true");
  }

  //Icy vote update
  function icyVote() {
    if ($(this).parent().attr("data-guessed") === "true") {
      return;
    } else {

      var count = $(this).data('icy');
      var thisId = $(this).data('id');
      var updatePost = {
        icy: ++count,
        id: thisId
      }
      updateScore(updatePost);
    }
    $(this).parent().attr("data-guessed", "true");
  }

  //Update database and page with new score
  function updateScore(post) {

   //Update database
   $.ajax({
    method: "PUT",
    url: "/api/posts",
    data: post
  })
   .then(function() {

      //Update page with new vote count
      $.get("/api/posts/" + post.id, function(data) {
        if (data) {
          $('[data-row-id="'+post.id+'"]').find('.spicy-vote').find('.value').html(data.spicy);
          $('[data-row-id="'+post.id+'"]').find('.icy-vote').find('.value').html(data.icy);
        }
      });
    });
 }
