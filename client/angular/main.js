var shopApp = angular.module('ShopApp', ['ngRoute']);
shopApp.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'homeController'
	})
	.when('/models', {
		templateUrl: 'partials/models.html'
	})
	.when('/modelsapp', {
		templateUrl: 'partials/modelsapp.html',
		controller: 'vehiclesController',
		controllerAs: 'VC'
	})
})
//creating preloader factory
shopApp.factory('preloader', function($q, $rootScope){

	function Preloader(imageLocations){
		this.imageLocations = imageLocations;

		this.imageCount = this.imageLocations.length;
		this.loadCount = 0;
		this.errorCount = 0;

		this.states = {
			PENDING: 1, 
			LOADING: 2,
			RESOLVED: 3, 
			REJECTED: 4
		}

		this.state = this.states.PENDING;

		//when image is loaded, return promise
		this.deferred = $q.defer();
		this.promise = this.deferred.promise;
	}

	Preloader.preloadImages = function(imageLocations){
		var preloader = new Preloader(imageLocations);

		return(preloader.load());
	};

	Preloader.prototype = {
		constructor: Preloader,

		isInitiated: function isInitiated(){
			return( this.state !== this.states.PENDING);
		},
		isRejected: function isRejected(){
			return(this.state === this.states.REJECTED);
		},
		isResolved: function isResolved(){
			return(this.state === this.states.RESOLVED);
		},
		load: function load(){
			if (this.isInitiated()){
				return(this.promise);
			}
			this.state = this.states.LOADING;

			for(var i=0;i<this.imageCount; i++){
				this.loadImageLocation(this.imageLocations[i]);
			}

			return(this.promise);
		},

		handleImageError: function handleImageError(imageLocation){
			this.errorCount++;

			if(this.isRejected()){
				return;
			}
			this.state = this.states.REJECTED;
			this.deferred.reject(imageLocation);
		},

		handleImageLoad: function handleImageLoad(imageLocation){
			this.loadCount++;

			if(this.isRejected()){
				return;
			}

			this.deferred.notify({
				percent: Math.ceil(this.loadCount/this.imageCount * 100),
				imageLocation: imageLocation
			});

			if(this.loadCount === this.imageCount){
				this.state = this.states.RESOLVED;
				this.deferred.resolve(this.imageLocations);
			}
		},

		loadImageLocation: function loadImageLocation(imageLocation){
			var preloader = this;

			var image = $(new Image())
				.load(
					function(event){
						$rootScope.$apply(
							function(){
								preloader.handleImageLoad(event.target.src);
								preloader = image = event = null;
							}
						);
					}
				)
				.error(
					function(event){
						$rootScope.$apply(
							function(){
								preloader.handleImageError(event.target.src);
								preloader = image = event = null;
							}
						);
					}
				)
				.prop("src", imageLocation);
		}
	};
	return(Preloader);
	}
);

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
//creating vehicles controller
shopApp.controller('vehiclesController', function(VehicleFactory){
	var that = this;
	this.boolean = true;
	
	this.loadScript = function(){
		$(document).ready(function(){
			setTimeout(function(){
				$('ul.tabs').tabs();
				$('.parallax').parallax();
			}, 500);
			
		 	$('.parallax').parallax();
		})
	}
	
	this.loadScript();
	
	this.getvehicles = function(){
		VehicleFactory.getVehicles(function(data){
			that.vehicles = data;

			console.log(that.vehicles);
		})
	}
	this.getvehicles();
	this.testfunction = function(){
		console.log('TESTED');
	}
})
//preloader controller 
shopApp.controller('preloaderController', function(VehicleFactory, preloader){
	var that = this;
	this.isLoading = true;
	this.isSuccessful = false;
	this.percentLoaded = 0;

	this.imageLocations = [
	];

	this.loadThem = function(callback){
		var myarray = [];
		VehicleFactory.getVehicles(function(data){
			for(x in data){
				for(n in data[x].img_urls){
					myarray.push(data[x].img_urls[n].url);
				}
			}
			callback(myarray);
		})
	}
	this.imageLocations = this.loadThem(function(myarray){
		console.log(myarray);
		return myarray;
	});
	
	preloader.preloadImages(this.imageLocations).then(
		function handleResolve(imageLocations){
			that.isLoading = false;
			that.isSuccessful = true;

			console.log('Preload successful');
		},
		function handleReject(imageLocation){
			that.isLoading = false;
			that.isSuccessful = false;

			console.log('ERROR LOADING IMAGEs');
		},
		function handleNotify(event){
			that.percentLoaded = event.percent;
			console.log('Percent loaded:', event.percent);
		}
	)
	console.log(this.loadThem(function(){
		console.log('Made it to point C');
	}));
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

