class inboxGroup{
	constructor(){
		this.groupList =[
		  {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },{
		      "id": "2",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },
		    {
		      "id": "2",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    }
		    ];
	}
	getGroupSize(){
		return this.groupList.length;
	}
    addGroupItem(data){
		this.groupList.push(data)
	}
    getInboxGroupList(){
		return this.groupList;
	}	
}
class inboxIndividual {
	constructor(){
	this.individualList = [
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
    addIndividualItem(data){
     return this.individualList.push(data);    
	}
    getInboxIndividualList(){
	 return this.individualList;
	}
	getIndividualSize(){
	 return this.individualList.length;
	}
} 
class Sent {
	constructor(){
	this.sentLis = [
		    {
		      "id": "4",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../../UI/assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },
		    {
		      "id": "6",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../../UI/assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    }];
	}
	addSentItem(data){
       return this.sentLis.push(data);
	}
	getSentMailList(){
		return this.sentLis;
	}
	getSentSize(){
		return this.sentLis.length;
	}
	createRow(tbody,positon,data){

	 }
}
class Draft {
	constructor(){
		this.draftList = [
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../../UI/assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../../UI/assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../../UI/assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../../UI/assets/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    }];
	}

	addItem(data){
		return this.draftList.push(data);
	}

	getDraftList(){
		return this.draftList;
	}
    getDraftSize(){
		return this.draftList.length;
	}
}
class Contact {
	constructor(){
		this.contactsList=[
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
    addContactsItem(data){
        return this.contactsList.push(data);
    }
    getContactsContacts(){
    	return this.contactsList;
    }

}


const creatInboxIndividualRow = (tbody,position,data) => {
		//create tr element and then add some class
		   var tr = document.createElement('tr');
		   tr.classList.add('g-t-tr');
		   if(position % 2 != 0 ){tr.classList.add('tr-backgound')};         
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
const createInboxGroupRow = (tbody,position,data) => {
    		//create tr element and then add some class
		   var tr = document.createElement('tr');
		   tr.classList.add('g-t-tr');
		   if(position % 2 != 0 ){tr.classList.add('tr-backgound')};         
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
const createSentRow = (tbody,position,data) => {
		//create tr element and then add some class
		   var tr = document.createElement('tr');
		   tr.classList.add('g-t-tr');
		   if(position % 2 != 0 ){tr.classList.add('tr-backgound')};         
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
const createDraftRow = (tbody,position,data) => {
		  //create tr element and then add some class
		   var tr = document.createElement('tr');
		   tr.classList.add('g-t-tr');
		   if(position % 2 != 0 ){tr.classList.add('tr-backgound')};         
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
const createContactRow = (tbody, position,data) => {
		//create tr element and then add some class
		   var tr = document.createElement('tr');
		   tr.classList.add('g-t-tr');
		   if(position % 2 != 0 ){tr.classList.add('tr-backgound')};         
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


const RefleshContent = (type) => {
   try{

     switch(type){
	         case 'individual':
	            var inbox = new inboxIndividual();
	            var i=0;
	            inbox.getInboxIndividualList().forEach((item) => {
					creatInboxIndividualRow(document.getElementById('inbox-list-body-individual'),i,item);
					i=i+1;
			    });
			    callUpdateCounter('individual');
	   	     break;
	   	     case 'group':
	   	         var group = new inboxGroup();
	   	         var i=0;
				 group.getInboxGroupList().forEach((item) => {
					
					createInboxGroupRow(document.getElementById('inbox-list-body-qroup'),i,item);
					i++;
			    });
			    callUpdateCounter('group');
			break;    
			case 'sent':
			     var sent = new Sent();
			     var i=0;
			     sent.getSentMailList().forEach((item) => {
					createSentRow(document.getElementById('sent_mail_list_body'),i,item);
					i++;
			    });
			     callUpdateCounter('sent');
			break;    
            case 'draft':
                 var draft = new Draft();
                 var i=0;
                 draft.getDraftList().forEach((item) => {
					createDraftRow(document.getElementById('draft_list_body'),i,item);
					i++;
				});	
                callUpdateCounter('draft');                 
             break;
             case 'contacts':
                 var contacts = new Contact();
                 var i=0;
                 contacts.getContactsContacts().forEach((item) => {
					createContactRow(document.getElementById('contacts_list_body'),i,item);
					i++;
				});	
                callUpdateCounter('contacts'); 
             break;
             case 'compose':
                callUpdateCounter('compose'); 
             break;
             case 'inbox_read_mail':
                callUpdateCounter('compose');      
   	   }
    
      return true;
   }catch(error){
      console.log(error);
      return false;
   }
}  
const callUpdateCounter = (caller) =>{
    updateCounter({
	         inboxIndividual : new inboxIndividual().getIndividualSize(),
	         inboxGroup : new inboxGroup().getGroupSize(),
	         sent : new Sent().getSentSize(),
	         draft : new Draft().getDraftSize()
        },caller);
}
const updateCounter = (size,caller) => {
	  var inbox_left_counter_elem = document.getElementById('left_menu_inbox_counter');
	
      var sent_counter_elem = document.getElementById('left_menu_sent_counter');
      var draft_counter_elem = document.getElementById('left_menu_draft_counter');
      
      var inboxTotalSize=size.inboxGroup+size.inboxIndividual;
      var inbox_left_counter = document.createTextNode(inboxTotalSize);


      var sent_rs = document.createTextNode(size.sent);
      var draft_rs = document.createTextNode(size.draft);

      inbox_left_counter_elem.innerHTML ='';
	  inbox_left_counter_elem.appendChild(inbox_left_counter);

      sent_counter_elem.innerHTML ='';
      sent_counter_elem.appendChild(sent_rs);

      draft_counter_elem.innerHTML ='';
      draft_counter_elem.appendChild(draft_rs);


     if (caller==='individual' || caller==='group') {
      var inbox_ind_top_counter = document.createTextNode(size.inboxIndividual);
      var inbox_gr_top_counter = document.createTextNode(size.inboxGroup);
      var inbox_ind_top_counter_elem = document.getElementById('top_menu_inbox_counter');
	  var inbox_gr_top_counter_elem = document.getElementById('top_menu_inbox_group_counter');
	  inbox_ind_top_counter_elem.innerHTML ='';
	  inbox_ind_top_counter_elem.appendChild(inbox_ind_top_counter);

	  inbox_gr_top_counter_elem.innerHTML ='';
	  inbox_gr_top_counter_elem.appendChild(inbox_gr_top_counter);
      }
}

const Reflesh = (current_document) => {
   RefleshContent(current_document);
}