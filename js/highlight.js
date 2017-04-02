var editMode = 1;

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

    if (tag == "P" || (tag[0] == 'H' && tag.length == 2) || tag == 'a') {
      var mess = "You have chosen " + inner + ". What do you want to change about this element? (delete, change font weight, italicize, etc.)?"
    }

    $(".messages").append("<div class='message'><div class='bot'>" + mess + "</div></div>");
  }
}
