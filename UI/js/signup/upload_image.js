'use strict';
/**
// ||||||||||||||||||||||||||||||| \\
//	Global Object $: Generic controls
// ||||||||||||||||||||||||||||||| \\
**/
(function(){
	var $ = function( elem ){
		if (!(this instanceof $)){
      return new $(elem);
		}
		this.el = document.getElementById( elem );
	};
	window.$ = $;
	$.prototype = {
		onChange : function( callback ){
			this.el.addEventListener('change', callback );
			return this;
		}
	};
})();

/**
// ||||||||||||||||||||||||||||||| \\
//	Drag and Drop code for Upload
// ||||||||||||||||||||||||||||||| \\
**/
var dragdrop = {
	init : function( elem ){
		elem.setAttribute('ondrop', 'dragdrop.drop(event)');
		elem.setAttribute('ondragover', 'dragdrop.drag(event)' );
	},
	drop : function(e){
		e.preventDefault();
		var file = e.dataTransfer.files[0];
		runUpload( file );
	},
	drag : function(e){
		e.preventDefault();
	}
};

/**
// ||||||||||||||||||||||||||||||| \\
//	Code to capture a file (image)
//  and upload it to the browser
// ||||||||||||||||||||||||||||||| \\
**/
function runUpload( file ) {
if( file.type === 'image/png'  ||
			file.type === 'image/jpg'  ||
		  file.type === 'image/jpeg' ||
			file.type === 'image/gif'  ||
			file.type === 'image/bmp'  ){
		var reader = new FileReader(),
				image = new Image();
		reader.readAsDataURL( file );
		reader.onload = function( _file ){
			$('profile-image').el.src = _file.target.result;
			$('profile-image').el.style.display = 'inline';
		} // END reader.onload()
	} // END test if file.type === image
}

/**
// ||||||||||||||||||||||||||||||| \\
//	window.onload fun
// ||||||||||||||||||||||||||||||| \\
**/
window.onload = function(){
	if( window.FileReader ){
		// Connect the DIV surrounding the file upload to HTML5 drag and drop calls
		dragdrop.init( $('profile-image-div').el );
		//	Bind the input[type="file"] to the function runUpload()
		$('fileUpload').onChange(function(){ runUpload( this.files[0] ); });
	}else{
		// Report error message if FileReader is unavilable
		var p   = document.createElement( 'p' ),
				msg = document.createTextNode( 'Sorry, your browser does not support FileReader.' );
		p.className = 'error';
		p.appendChild( msg );
		$('profile-image-div').el.innerHTML = '';
		$('profile-image-div').el.appendChild( p );
	}
};
