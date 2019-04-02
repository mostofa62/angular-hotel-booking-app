var App = angular.module('HotelFeature', ['checklist-model']);
var appEndPoint = "http://localhost:8080/api/";	

App.controller('MainController', function($scope, FeatureDataService) {
  
  $scope.roles = [
    {id: 1, text: 'guest'},
    {id: 2, text: 'user'},
    {id: 3, text: 'customer'},
    {id: 4, text: 'admin'}
  ];
  $scope.user = {
    roles: [$scope.roles[2]]
  };
  
  FeatureDataService.allFeatures().then(function(d) {
		//console.log(d.data);
		$scope.roles = d.data;
    	
  });
  
  var hotelId = 1;
  FeatureDataService.hotelFeatures(hotelId).then(function(d) { 
    	//console.log(d.data);
    	$scope.user = {
			roles: d.data
		};
  });
  
  $scope.selectionChanged = function(){
    $scope.selectedValues = $scope.user.roles.join(',');
  }
  
  $scope.selectedValue = function(){
	$scope.submitValues = $scope.user.roles.join(',');
	
	FeatureDataService.selectedFeatures(hotelId, $scope.user.roles).then(function(d) {
		console.log(d.data);
		
    	
	});
	
	
  }
  
  

});