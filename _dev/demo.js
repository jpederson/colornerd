

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


// hide the usage instructions
var hide_usage = function(){
	if ( usage.hasClass( 'visible' ) ) {
		usage.removeClass( 'visible' );
		body.removeClass( 'with-usage' );
	}
};


// onload
$(function(){

	// a function to load a specific book
	var loadBook = function( book ) {
		$( '.book-viewer' ).load( 'book/'+book+'.html', function(){

			window.scrollTo( 0, 0 );

			// populate the function name and make it more prominent
			$( '.function' ).html( book ).removeClass( 'quiet' );
			$( '.selected-color' ).html( '[color]' ).addClass( 'quiet' );

			// when they click a swatch
			$( '.book-viewer .swatch' ).click(function(){

				$('.clipboard').show();

				$('.swatch.selected').removeClass( 'selected' );
				$(this).addClass( 'selected' );
				$('.color-selected').css( 'background-color', $(this).css( 'background-color' ) );
				$('.hex').html( $(this).data( 'hex' ) ).removeClass( 'quiet' );

				$('.hex-code.clipboard').attr( 'data-clipboard-text', $(this).data('hex') );
				$('.sass.clipboard').attr( 'data-clipboard-text', $( '.function' ).html() + "( '" + $(this).attr('rel') + "' )" );
				$('.less.clipboard').attr( 'data-clipboard-text', '@' + $( '.function' ).html() + '-' + $(this).attr('rel') );

				// set the color code in the function and variable in usage instructions
				$( '.selected-color' ).html( $(this).attr('rel') ).removeClass( 'quiet' );

			});
		});
	};


	// ajaxy stuffs go here.
	$( 'select.book' ).change(function(){

		// store the book they clicked in variable
		var book = $( this ).val();

		// if it exists
		if ( typeof book !== 'undefined' ) {

			loadBook( book );
		}
	});


	// set default
	var def = 'dunn-edwards';
	$('select.book').val( def );
	loadBook( def );

	new ClipboardJS('.clipboard');

});

