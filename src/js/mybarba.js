var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};

Barba.Pjax.start();

/**
 * Handle special javascript events that should normally fire on page load
 */
Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
	console.log(container);
	console.log(document);

	/* Scroll to the top of the page */
	window.scrollTo(0,0);

	/* Update the current menu option in navigation */
	var navAnchors = document.getElementById("menuList").getElementsByTagName("a");
	var i;
	for (i = 0; i < navAnchors.length; i++) { 
	    navAnchors[i].classList.remove("navActive");
	}
	var navID = container.getAttribute("data-id");
	if (navID){
		document.getElementById(navID).classList.add("navActive");		
	}

	/* Fire page-specific javascript events */
	if (container.hasAttribute("data-page")) {
		if (container.getAttribute("data-page") == "report") {
			setupMoreInfo();
		}
		if (container.getAttribute("data-page") == "thing") {
			setupCommentForm();
			activateNewCommentForm();
		}
	} else {
		console.log("nothing to do");
	}
});

