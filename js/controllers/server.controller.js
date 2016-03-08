var app = angular.module("Warroom");

app.controller('ServerController', ['$scope','$routeParams','$http', 'GetServer', ServerController]);



function ServerController($scope, $routeParams, $http, GetServer){

	vm = this;

	//setup variables
	vm.allData;
	vm.server = [];
	vm.serverAverages = {};
	vm.totalAverages = {};
	vm.setupAvg = true;

	//Timer Functions
	vm.statusInterval;
	vm.startStatus = startStatus;
	vm.updateStatus = updateStatus;
	vm.stopStatus = stopStatus;
	
	//Route Parameters
	vm.serverId = $routeParams.id;
	vm.serverData;
	


    function startStatus() {
    	console.log("Starting Server Watching");
    	statusInterval = setInterval(vm.updateStatus, 1000);
    }
 
    function updateStatus() {
      	//get Servers

      	//setInterval
		GetServer.callAPI().then(function(response){
			if(response){
				vm.allData = response.data;

				if(vm.serverId){
					vm.serverData = vm.allData.data[vm.serverId];
				}



				//If the object has been newly created then add the needed
				//dynamic spots for the response data to fill or it will through
				//an error
				if(vm.setupAvg =  true){
					for(var i = 0; i < vm.allData.data.length; i++){
						vm.serverAverages[i] = [];
						vm.totalAverages[i] = [];
					}
					vm.setupAvg = false;
				}


				//Fill the spots with the data
				for(var i = 0; i < vm.allData.data.length; i++){

					//Update our averages in our serverAverages Object
					var newTime = vm.allData.data[i].responseTime;
					var pos = i;
					vm.serverAverages[pos].push(newTime); //Won't push correctly .... no clue why
					

					//Set our totalAverages to the addition of all our collected number
					vm.totalAverages[i] = vm.serverAverages[i].reduce(function(a, b) {
  						return a + b;
					});
					vm.totalAverages[i] = (vm.totalAverages[i]/vm.serverAverages[i].length);
				}	

				// console.log("setuAvg: ", vm.setupAvg)
				// console.log("Avgs: ", vm.serverAverages);
				// console.log("Totals: ", vm.totalAverages);
				console.log(vm.serverAverages);

			} else {
				console.error("Did not recieve any data.");
			}
		});

    }


    function stopStatus() {
      clearInterval(statusInterval);
    }

	

}



/*END OF FILE*/
