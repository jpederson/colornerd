

// we'll need filesystem functionality
var fs = require('fs');



// template directory path, for DRY sake
var dir_tpl = "_dev/";

// set up a list of the files we'll create.
var files = JSON.parse( fs.readFileSync( dir_tpl+"books.json", "utf8" ) );
var file_title = [];
files.forEach(function( file_info ){
	file_title[file_info.filename] = file_info.title;
});

// open the book template files
var tpl_stylus = fs.readFileSync( dir_tpl+"book.styl", "utf8" );
var tpl_scss = fs.readFileSync( dir_tpl+"book.scss", "utf8" );

// open the index template files
var tpl_index = fs.readFileSync( dir_tpl+"index.html", "utf8" );



// arrays for each index file
var files_stylus = [], 
	files_scss = [],
	files_less = [],
	files_index = [];



// directory location
var dir = 'json/';


// loop through the directory
fs.readdir( dir, function( err, files ){

    // throw an error if applicable
    if ( err ) throw err;

    var total = 0;

    // loop through the files in the directory
    files.forEach(function( file ){

    	// 
    	var filename = file.replace( '.json', '' );

		// open the file
		var records = JSON.parse( fs.readFileSync( "json/"+file, "utf8" ) );


		// some empty arrays for our colors
		var records_csv = [];
		var records_less = [];
		var records_scss = [];
		var records_html = [];
		var records_index = [];


		// start logging
		console.log( "" );
		console.log( "-------------------------------------------------------------------" );
		console.log( "  Book: " + file );
		console.log( "-------------------------------------------------------------------" );


		// variable name in Sass and Stylus
		var var_name = filename+'-colors';


		// loop through all the colors in this file.
		records.forEach(function( color ){

			// push another line of html
			records_html.push( '<div class="swatch" style="background-color: '+color.hex+';"><span>'+color.label+'</span></div>' );
			
			// push another scss array value
			records_scss.push( '("'+color.label+'" '+color.hex+')' );
			
			// push another less array value
			records_less.push( '@'+filename+'-'+color.label+': '+color.hex+';' );
			
			// push another xml record
			records_csv.push( '"'+color.name+'","'+color.label+'","'+color.hex+'"' );

		});


		// stylus files
		files_less.push( "\n// " + file_title[filename] + '\n@import "book-'+filename+'.less";' );

		// stylus files
		files_scss.push( "\n// " + file_title[filename] + '\n@import "book-'+filename+'";' );

		// stylus files
		files_stylus.push( "\n// " + file_title[filename] + '\n@import "book-'+filename+'.styl"' );

		// stylus files
		files_index.push( '<li><a rel="' + filename + '">' + file_title[filename] + ' <span>' + records.length + ' colors</span></a></li>' );


		// dump a color count for each book
		console.log( " > Colors in File: " + records_csv.length );
		total = total + records_csv.length;


		// write out the csv file
		fs.writeFileSync( "csv/"+filename+".csv", records_csv.join( "\n" ) );
		console.log( " > csv/"+filename+".csv created..." );


		// write out the index.html file
		fs.writeFileSync( 'book/'+filename+'.html', records_html.join("\n") )
		console.log(' > book/'+filename+'.html created...');


		// write out the Sass book file
		fs.writeFileSync( 'scss/_book-'+filename+'.scss', tpl_scss
			.replace( "{{colors}}", records_scss.join(", ") )
			.replace( /\{\{var_name\}\}/g, var_name )
			.replace( "{{fn_name}}", filename ), 
		console.log(' > scss/_book-' + filename + '.scss created...') );


		// write out the Stylus book file
		fs.writeFileSync( 'stylus/book-'+filename+'.styl', tpl_stylus
			.replace( "{{colors}}", records_scss.join(" ") )
			.replace( /\{\{var_name\}\}/g, var_name )
			.replace( "{{fn_name}}", filename ) );
		console.log(' > stylus/book-'+filename+'.styl created...');


		// write out the LESS book file
		fs.writeFileSync( 'less/book-'+filename+'.less', "// "+filename+"\n"+records_less.join("\n") ); 
		console.log(' > less/book-'+filename+'.less created...');
		

    });


	// start outputting main file generation progress
	console.log( "" );
	console.log( "-------------------------------------------------------------------" );
	console.log( "  Main Files" );
	console.log( "-------------------------------------------------------------------" );


	// dump the total colors
	console.log( " > Total Colors: " + total );


	// write out the Sass book file
	fs.writeFileSync( 'scss/_colornerd.scss', files_scss.join("\n") );
	console.log(' > scss/_colornerd.scss created...');


	// write out the Stylus book file
	fs.writeFileSync( 'stylus/colornerd.styl', files_stylus.join("\n") );
	console.log(' > stylus/colornerd.styl created...');


	// write out the LESS book file
	fs.writeFileSync( 'less/colornerd.less', files_less.join("\n") );
	console.log(' > less/colornerd.less created...');


	// write out the LESS book file
	fs.writeFileSync( 'index.html', tpl_index.replace( "{{colors}}", files_index.join("\n") ) );
	console.log(' > index.html created...');

	console.log( "" );

});

