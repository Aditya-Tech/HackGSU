
$('.bottom').children().mouseover(function(e){
    $(".hova").removeClass("hova");
    $(e.target).addClass("hova");
  return false;
}).mouseout(function(e) {
    $(this).removeClass("hova");
});
