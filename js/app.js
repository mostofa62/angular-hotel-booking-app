var App = angular.module('BookingSearchApp', ['daterangepicker']);
var appEndPoint = "http://localhost:8080/api/";	

//service
//hotel service
App.factory('HotelDataService', function($http,calendar) {
  return ({
    roomtypedata: function(id) {
      return $http.get(appEndPoint+'roomtypes/'+id);  //1. this returns promise
    },

    searchbookdata: function(sdate, edate, rmtypeid) {
    	
    	calendar.fromto(sdate, edate);
    }

  });
});
//calender service
App.service('calendar', function() {
	var c = $('#calendar');
	var options = {
		defaultView: 'month',
		header: {
			left: 'title', 
			right: 'prev,next today'
		},
		views: {
			month:{
				titleFormat: 'MMM D, Y',
				titleRangeSeparator: ' to ',
			}
		}


	};

	return ({
		fromto:function(sdate, edate){
			
			
			enddate = moment(edate).add(1, 'days').format('YYYY-MM-DD');
			c.fullCalendar('select',sdate, enddate);
			//c.fullCalendar('option','visibleRange',{start: sdate, end: enddate});
		},
		render:function(){

			c.fullCalendar(options);
		}

	});

});




//controller
App.controller('SearchBooking', function($scope, HotelDataService, calendar) {
	
	/**
	$scope.roomTypes = [
		{
			id:10,
			label: 'Delux',
		},
		{
			id:11,
			label: 'Full Delux',
		},

	];**/
	
	HotelDataService.roomtypedata(1).then(function(d) { 
    	// console.log(d.data);
    	$scope.roomTypes = d.data;
  	});

  	calendar.render();
	
	//console.log(RoomtypeService.roomtypedata());
	//$scope.selectedRoom = $scope.roomTypes[0];

	$scope.datePicker = { 
		date: {
			//startDate: '2019-03-05', 
			//endDate: '2019-03-05',
			startDate: moment(),
			endDate: moment(),
		},
		
		options: {
			autoApply:true,
        	minDate: moment(),
        	eventHandlers: {
        		'apply.daterangepicker': function(event) { 
        			//console.log(event.model.startDate.format('YYYY-MM-DD')); 
        			//console.log(event.model.endDate.format('YYYY-MM-DD'));
        			var sDate = event.model.startDate;
					var eDate = event.model.endDate;
					
					$scope.numberOfDay = eDate.diff(sDate,'days');
        		}
    		}            	
    	}
			

	};

	//submit form data
	$scope.submit = function() {
		//search with data
		sdate = $scope.datePicker.date.startDate.format('YYYY-MM-DD');
		edate = $scope.datePicker.date.endDate.format('YYYY-MM-DD');
		rmtypeid = $scope.selectedRoom.id;
		HotelDataService.searchbookdata(sdate, edate, rmtypeid);

		

		
	};


});




// App.factory('RoomtypeService',function($http){	
// 	return ({

// 		roomtypedata:function(){

// 			$http.get(appEndPoint+'roomtypes/1').then(function(response) {                
//                 return (response.data);
//             }); 
// 		}		  

// 	});

// });

//required when inline one file
//angular.bootstrap(document, ['']);


