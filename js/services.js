/*
var App = angular.module('HotelFeature');

App.factory('FeatureDataService', function($http) {
  return ({
    hotelFeatures: function(id) {
      return $http.get(appEndPoint+'features/'+id);  //1. this returns promise
    },

    allFeatures: function() {
    	
    	return $http.get(appEndPoint+'features');
    },
	
	selectedFeatures:function(id, data){
		
		return $http({
			method : "POST",
			url : appEndPoint+'features/'+id,
			data : angular.toJson(data),
			headers : {
				'Content-Type' : 'application/json'
			}
		});
	}

  });
});
*/

angular.module('HotelFeature').factory('FeatureDataService', function($http) {
  return ({
    hotelFeatures: function(id) {
      return $http.get(appEndPoint+'features/'+id);  //1. this returns promise
    },

    allFeatures: function() {
    	
    	return $http.get(appEndPoint+'features');
    },
	
	selectedFeatures:function(id, data){
		
		return $http({
			method : "POST",
			url : appEndPoint+'features/'+id,
			data : angular.toJson(data),
			headers : {
				'Content-Type' : 'application/json'
			}
		});
	}

  });
});