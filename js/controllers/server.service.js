var app = angular.module("Warroom");

app.service( 'GetServer', ['$http', GetServer]);

function GetServer($http){
	return {
			callinfo : {
				method: 'GET',
				url: "http://localhost:3000/status",
				data: {}
			},

			callAPI : function(){
				return $http(this.callinfo);
			}

	}
}; //END BOOKS