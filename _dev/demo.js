

// let's eliminate that 300ms delay on touch devices.
FastClick.attach(document.body);


// ALL THE COLOR THINGS!!!
var usage = $( '.book-usage' );
var body = $( 'body' );


// show/hide the usage instructions
var toggle_usage = function(){

	if ( !usage.hasClass( 'visible' ) ) {
		// show em if they aren't visible
		show_usage();
	} else { 
		// or hide when they are
		hide_usage();
	}

};


// show the usage instructions
var show_usage = function(){
	console.log( 'toggling it' );
	if ( !usage.hasClass( 'visible' ) ) {
		usage.addClass( 'visible' );
		body.addClass( 'with-usage' );
	}
};


// hide the usage instructions
var hide_usage = function(){
	if ( usage.hasClass( 'visible' ) ) {
		usage.removeClass( 'visible' );
		body.removeClass( 'with-usage' );
	}
};


// onload
$(function(){

	// ajaxy stuffs go here.
	$( '.book-list a' ).click(function(){

		// store the book they clicked in variable
		var book = $( this ).attr( 'rel' );

		// if it exists
		if ( typeof book !== 'undefined' ) {

			// load the book into the viewer div
			$( '.book-viewer' ).load( 'book/'+book+'.html', function(){

				// populate the function name and make it more prominent
				$( '.function' ).html( book ).removeClass( 'quiet' );
				$( '.selected-color' ).html( '[color]' ).addClass( 'quiet' );

				// when they click a swatch
				$( '.book-viewer .swatch' ).click(function(){

					// set the color code in the function and variable in usage instructions
					$( '.selected-color' ).html( $(this).html() ).removeClass( 'quiet' );
					show_usage();

				});
			});

		}


	});

	$( '.book-usage-toggle' ).click( toggle_usage );

});

