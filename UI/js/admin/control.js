// Get the modal
var modal = document.getElementById("add_group_dialog");
// Get the button that opens the modal
var btn = document.getElementById("add_new_group_btn");
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}