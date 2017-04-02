var editMode = 1;
var indexOfMover = 0;
var indexOfNewPos = 0;


$(function() {
  $('.switch').change(function(){
    $(this).toggleClass('checked');
  });
});


function markActiveLink(el) {

  if (editMode == 1) {
    selectedId = $(el).attr("id");
    tag = document.getElementById(selectedId).tagName;
    inner = document.getElementById(selectedId).innerHTML;

    if (indexOfMover == 0) {
      indexOfMover = selectedId;
    } else if (indexOfMover != 0 && indexOfNewPos == 0 && (indexOfMover != indexOfNewPos)) {
      indexOfNewPos = selectedId;
    } 


    if (indexOfMover !== 0 || indexOfNewPos == 0) {
      var mess = "You have chosen " + inner + ". What do you want to change about this element? (delete, change font weight, italicize, swap with another element, etc.)?"
    }
    $(".messages").append("<div class='message'><div class='bot'>" + mess + "</div></div>");
  }
}
