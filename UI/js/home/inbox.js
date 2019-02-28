class inboxGroup extends Sent{
	constructor(){
		super();
		this.itemList =[
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
		    }
		    ];
	}
	getSize(){
		return this.itemList.length;
	}
    addItem(data){
		this.itemList.push(data)
	}
    getInboxGroupList(){
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
      var top_counter = document.createTextNode(this.itemList.length);
	  counter.appendChild(top_counter);
	}	
	removeItem(id){
	  return this.itemList.filter( item => item.id!==id );
    }
}
class inboxIndividual extends inboxGroup{
	constructor(){
	super();
	this.itemList = [
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../dist/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    },
		    {
		      "id": "1",
		      "createdOn": "Feb 24",
		      "subject": "Greating",
		      "image":"../dist/images/profile.png",
		      "message":"Hello my friend i was thinking if we can meet and discus about our deal and then make disision!",
		      "status":"sent"
		    }];
	}
    addItem(data){
     return this.itemList.push(data);    
	}
    getInboxIndividualList(){
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
		            td_name.setAttribute("onclick","openReadMessagePage('../../UI/pages/inbox_read_mail.html')");
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
	updateCount(leftcounter,topcounter){
      var inbox_left_counter = document.getElementById('left_menu_inbox_counter');
	  var inbox_top_counter = document.getElementById('top_menu_inbox_counter');
      var sent_counter = document.getElementById('left_menu_sent_counter');
      var draft_counter = document.getElementById('left_menu_draft_counter');

      var sentSize = new Sent().getSize();
      var draft = new Draft().getSize();

      var groupSize = new inboxGroup().getSize(); 
      var size=groupSize+this.itemList.length;
      var l_counter = document.createTextNode(size);
      var top_counter = document.createTextNode(this.itemList.length);
      var sent_rs = document.createTextNode(sentSize);
      var draft_rs = document.createTextNode(draft);
	  inbox_left_counter.appendChild(l_counter);
	  inbox_top_counter.appendChild(top_counter);
      sent_counter.appendChild(sent_rs);
      draft_counter.appendChild(draft_rs);
	}
}
const refleshInboxIndividual = () => {
   try{
	    var indiviual = document.getElementById('inbox-list-body-individual');
		var inbox = new inboxIndividual();
	    for (var i = 0;i<inbox.getInboxIndividualList().length; i++) {
	    inbox.createRow(indiviual,i,inbox.getInboxIndividualList()[i]);
	    }
        inbox.updateCount();
      return true;
   }catch(error){
      console.log(error);
      return false;
   }
}    
refleshInboxIndividual();
const refleshInboxGroup = () => {
   try{
   	    var top_counter = document.getElementById('top_menu_inbox_group_counter');
	    var group_body = document.getElementById('inbox-list-body-qroup');
		var group = new inboxGroup();
	    for (var i = 0; i<group.getInboxGroupList().length; i++) {
	    group.createRow(group_body,i,group.getInboxGroupList()[i]);
	    }	
	    group.updateCounter(top_counter);
      return true;
   }catch(error){
      console.log(error);
      return false;
   }
} 
refleshInboxGroup();