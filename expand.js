/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
*/

/*jshint browser: true, strict: true, undef: true, node:true*/
/*global define: false, classie:false*/
'use strict';

( function( window ) {


// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );


/////////////////////Overlay code///////////////////////

//function to open overlay. onclick="openMorph('caseName')"
//elementID = id of the square link to be clicked
var body = document.body;

var openMorph = function(elementID) {
  var docID = elementID + "-doc";
  var morphDoc = document.getElementById(docID);
  var ctrlClose = morphDoc.querySelector('input.morphDoc-input');
  var offsets = morphDoc.getBoundingClientRect();
  classie.add(morphDoc, 'open');
  classie.add(body, 'noscroll');
};

//function to close overlay. onclick="closeMorph('caseNmae')"
//elementID = id of the square link to be clicked
var closeMorph = function(elementID) {
  var docID = elementID + "-doc";
  var morphDoc = document.getElementById(docID);
  classie.remove(body, 'noscroll');
  classie.remove(morphDoc, 'open');

};
