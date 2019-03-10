// Get the modal
var Groupmodal = document.getElementById("add_group_dialog");
// Get the button that opens the Groupmodal
var btn = document.getElementById("add_new_group_btn");
// When the user clicks the button, open the Groupmodal 
btn.onclick = function() {
  Groupmodal.style.display = "block";
}
// When the user clicks anywhere outside of the Groupmodal, close it
window.onclick = function(event) {
  if (event.target == Groupmodal) {
    Groupmodal.style.display = "none";
  }
}