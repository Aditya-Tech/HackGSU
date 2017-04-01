if (editMode == 1) {


  function markActiveLink(el) {
    selectedId = $(el).attr("id");
    $(".messages").append("<div class='message'><div class='bot'>" + selectedId + "</div></div>");
  }

  $('.bottom').children().mouseover(function(e){
      $(".hova").removeClass("hova");
      $(e.target).addClass("hova");
    return false;
  }).mouseout(function(e) {
      $(this).removeClass("hova");
  });


}
