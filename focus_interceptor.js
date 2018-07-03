(function() {
  var maxMetaCharacters = 1000;

  // Store a reference to the browser's focus function and create our own implementation for all HTMLElement objects
  var browserFocus = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function(){
    // If this document doesn't currently have focus ignore it and log details
    if(!document.hasFocus()){
      // Attempt to extract as much informational detail as possible on the origination of this invocation
      try {
        var element = this;
        var encodedOuterHTML = element.outerHTML;
        while(element && element.outerHTML.length < maxMetaCharacters){
          encodedOuterHTML = element.outerHTML;
          element = element.parentElement;
        }
      }
      catch(err){
        // set the details indicating that an error occured when attempting to grab additional information
      }
      var textNode = document.createTextNode(encodedOuterHTML);
      var textDiv = document.createElement("DIV");
      textDiv.appendChild(textNode);
      document.body.appendChild(textDiv);
      return;
    }

    // Document has focus, so we can allow the browser's focus handler to take over
    browserFocus.apply(this, arguments);
  }
})();
