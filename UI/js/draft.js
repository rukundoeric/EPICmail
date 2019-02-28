class Draft 
{
	constructor(){
		this.itemList = [
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    }];
	}

	addItem(data){
		return this.itemList.push(data);
	}

	getDraftList(){
		return this.itemList;
	}
    getSize(){
		return this.itemList.length;
	}
	createRow(tbody,positon,data){
		  //create tr element and then add some class
		   var tr = document.createElement('tr');
		   tr.classList.add('g-t-tr');
		   if(positon % 2 != 0 ){tr.classList.add('tr-backgound')};         
				  //create td elements and then add some class
				   var td_check = document.createElement('td');
				   var td_check_classes=['g-t-td','check'];
				   td_check.classList.add(td_check_classes);
				   td_check.setAttribute("width","5%")
						   //create label element inside td
						   var label = document.createElement('label');
					       label.classList.add('chk_unchk_icon');
								   //create input element inside label
								   var input = document.createElement('input');
								   input.setAttribute("type", "checkbox");
								   //create span element inside label
								   var span = document.createElement('span')
								   span.classList.add('checkmark');
							//append input element and span element to label	   
							label.appendChild(input);
							label.appendChild(span);
					//append label element to td_check			   
		            td_check.appendChild(label);
		    //then appen td_check element to tr
		    tr.appendChild(td_check);
		            //create another td 
		            var td_img = document.createElement('td');
		            td_img.classList.add('g-t-td');
		                   var img = document.createElement('img');
		                   img.classList.add('img-user-row');
		                   img.setAttribute('src',data.image);
		            td_img.appendChild(img);        
		            
		    //then apped td_img element to tr
		    tr.appendChild(td_img);        
		            var td_name = document.createElement('td');
		            td_name.classList.add('g-t-td');
		            td_name.classList.add('name');
		            td_name.setAttribute("onclick","openReadMessagePage('../../UI/html/inbox_read_mail.html')");
		            var name= document.createTextNode(data.subject);
		            td_name.appendChild(name);
		    //then append td_name to tr element        
		    tr.appendChild(td_name);
		            var td_message = document.createElement('td');
		            td_message.classList.add('g-t-td');
		            td_message.classList.add('feed');
		            var message = document.createTextNode(data.message);
		            td_message.appendChild(message);
		    //then append td_message to tr element
		    tr.appendChild(td_message);  
		            var td_date = document.createElement('td');
		            td_date.classList.add('g-t-td');
		            td_date.classList.add('date');
		            var date = document.createTextNode(data.createdOn);
		            td_date.appendChild(date);
		    tr.appendChild(td_date);                      
		   //Then append tr to tbody
		   tbody.appendChild(tr);
	}

	updateCounter(counter){
      var data_ounter = document.createTextNode(this.itemList.length);
	  counter.appendChild(data_ounter);
	}

}

const refleshDraft = () => {
   try{
	    var draft_body = document.getElementById('draft_list_body');
		var draft = new Draft();
	    for (var i = 0;i<draft.getDraftList().length; i++) {
	      draft.createRow(draft_body,i,draft.getDraftList()[i]);
	    }	
      return true;
   }catch(error){
      console.log(error);
      return false;
   }
}
refleshDraft();