'use strict';
//When User Click on Navigation Button
const  openNav = () => {
  document.getElementById("left-nav-open").classList.toggle('active');
  document.getElementById("left-nav-close").classList.toggle('active');
}
const swich_individual_or_group = () => { 
    const elm_menu = [...document.getElementsByClassName('g-h-inbox-menu')];
    const elm_list = [...document.getElementsByClassName('inbox-tables')];
    for(var i=0;i<elm_menu.length;i++){elm_menu[i].classList.toggle('curent-opened')}
    for(var i=0;i<elm_list.length;i++){elm_list[i].classList.toggle('hiden')}  
}
//Open page 
const openPage = url => {
  window.open(url, '_self'); 
}
const openReadMessagePage = url =>{
  openPage(url);
} 
var modal = document.getElementById('send_sms_dialog');
const openSmsDialog= () => {
modal.style.display = "block";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}