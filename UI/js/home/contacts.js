class Contact {
	constructor(){
		this.itemList=[
		{
          "firstName":"Mukunzi",
          "lastName": "Elvis",
          "email":"elvismukunzi055@gmail.com",
          "phone":"+250781049218"
		},
		{
          "firstName":"Rukundo",
          "lastName": "Eric",
          "email":"elvismukunzi055@gmail.com",
          "phone":"+250781049218"
		},
		{
          "firstName":"Cyusa",
          "lastName": "Clever",
          "email":"elvismukunzi055@gmail.com",
          "phone":"+250781049218"
		},
		{
          "firstName":"Mukwiye",
          "lastName": "Daniel",
          "email":"elvismukunzi055@gmail.com",
          "phone":"+250781049218"
		}
		];
	}
    addItem(data){
        return this.itemList.push(data);
    }
    getContacts(){
    	return this.itemList;
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
		            var td_name = document.createElement('td');
		            td_name.classList.add('g-t-td');
		            td_name.classList.add('name');
		            td_name.setAttribute("onclick","openReadMessagePage('../../UI/html/inbox_read_mail.html')");
		            var name= document.createTextNode(data.firstName+" "+data.lastName);
		            td_name.appendChild(name);
		    //then append td_name to tr element        
		    tr.appendChild(td_name);
		            var td_email = document.createElement('td');
		            td_email.classList.add('g-t-td');
		            td_email.classList.add('feed');
		            var email = document.createTextNode(data.email);
		            td_email.appendChild(email);
		    //then append td_message to tr element
		    tr.appendChild(td_email);       
		   //Then append tr to tbody
		   tbody.appendChild(tr);
	}
}
const refleshContacts = () => {
   try{
	    var contacts_body = document.getElementById('contacts_list_body');
		var contacts = new Contact();
	    for (var i = 0;i<contacts.getContacts().length; i++) {
	      contacts.createRow(contacts_body,i,contacts.getContacts()[i]);
	    }	
      return true;
   }catch(error){
      console.log(error);
      return false;
   }
}
refleshContacts();