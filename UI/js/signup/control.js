//Create account forms
const Register_forms= [...document.getElementsByClassName("task-content")];
const Next_Back = action => {
   	var activeIndex = Register_forms.indexOf(
		Register_forms.find(form => form.classList.contains("active"))
	);
   switch(action){
	   	case 'next':
	   	     Register_forms[activeIndex].classList.remove("active");
	         Register_forms[activeIndex+1].classList.add("active");
	   	break;
	         
	   	case 'back':
	          Register_forms[activeIndex].classList.remove("active");
	         Register_forms[activeIndex-1].classList.add("active");
	   	break;
   }
}
			//the model
const modal = document.getElementById("uploadImageModal");

const openModel = () => {
	console.log("Clicked")
  modal.classList.add('show');
};

const closeModel = () => {
  modal.style.display = "none";
  modal.style.transition = "display 5s";
};

/* anywhere user clikc, should close the model */
window.onclick = event => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};