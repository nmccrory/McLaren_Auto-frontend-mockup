var shopApp = angular.module('ShopApp', ['ngRoute']);
shopApp.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'homeController'
	})
	.when('/models', {
		templateUrl: 'partials/models.html',
		controller: 'modelsController as mC'
	})
  .when('/contact', {
    templateUrl: 'partials/contact.html',
    controller: 'contactController'
  })
})
//creating scroll service
shopApp.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
});

//creating vehicles factory
shopApp.factory('VehicleFactory', function($http, $location){
	var vehicles = [];
	var factory = {};

	factory.getVehicles = function(callback){
		console.log('inside our factory');
		$http.get('/models').success(function(output){
			callback(output);
		})
	}
	return factory;
})


//creating generic home page controller
shopApp.controller('homeController', function(){
	var that = this;

	this.loadScripts = function(){
		$(document).ready(function(){
			$(".button-collapse").sideNav();
			$('.parallax').parallax();
		})
	}

	this.loadScripts();
})
//creating models page controller
shopApp.controller('modelsController', function($scope, $location, anchorSmoothScroll){
	var that = this;

	this.gotoElement = function(eID){
		$location.hash(eID);
		anchorSmoothScroll.scrollTo(eID);
	}
	this.i = 0; 
	this.k = 0;
	this.models = document.getElementsByClassName('mainModelsTitle');
	this.series = document.getElementsByClassName('modelNavElement');
	var routine = window.setInterval(function(){
		that.models.item(that.i).style.opacity = 1;
		that.i++;
		if(that.i == that.models.length){
			window.clearInterval(routine);
		}
	},200);
	window.setTimeout(function(){
		var routine2 = window.setInterval(function(){
			that.series.item(that.k).style.opacity = 1;
			that.k++;
			if(that.k == that.series.length){
				window.clearInterval(routine2);
			}
		}, 500);
	}, 1800);

})

shopApp.controller('contactController', function($scope, $location, anchorSmoothScroll){
  console.log("In contact controller");
})
shopApp.directive('setClassWhenAtBottom', function ($window,$timeout) {
  var $win = angular.element($window); // wrap window object as jQuery object
  
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var bottomClass = attrs.setClassWhenAtBottom;// get CSS class from directive's attribute value 
      // get element's offset top relative to document
      var thresh = $(window).height() - (($(window).height()/3)*2);
      console.log("Thresh: "+thresh);
      $win.on('scroll', function (e) {
      	offsetBottom = $(window).height() - element.prop('offsetTop');
      	console.log(offsetBottom);
        if (offsetBottom > 400) {
          element.addClass(bottomClass);
          console.log("offsetBottom = "+offsetBottom);
          console.log("Inside of scroll conditional");
        } else {
        	console.log("Removing");
        	console.log("offsetBottom = "+offsetBottom);
          element.removeClass(bottomClass);
        }
      })
    }
  };
})
