var test = angular.module('testApp', ['ngRoute']);

	/* factory */
	test.factory('factoryOrang', function($http){
		var factoryOrang = {};

		factoryOrang.getOrang = function(){
			return $http.get('http://localhost/slimframe/tes');
		};

		factoryOrang.putOrang = function(datas){
			return $http.post('http://localhost/slimframe/tes', datas);
		};


		return factoryOrang;
	});

	test.directive('headerTitle', function(){
		return {
			restrict	: 'A',
			templateUrl : 'header.html'
		}
	});

	test.directive('partTitle', function(){
		return {
			restirct	: 'A',
			templateUrl : 'part.html',
			controller	: function($scope, factoryOrang){

				// $scope.data = [{ nama: 'Ahmad', kota: 'lamongan'},
				//  				{ nama: 'Efendi', kota: 'surabaya'},
				//  				{ nama: 'Rohman', kota: 'malang'}];

				factoryOrang.getOrang().success(function(hasil){
					$scope.data = hasil;

				});
			}
		};
	});


	// route 
	test.config(function($routeProvider){
		$routeProvider
		.when('/tambahinfo',{
			templateUrl : 'index2.html',
			controller 	: 'click' 
		})
		.when('/kontak', {
			templateUrl : 'kontak.html'
		})
		.otherwise({redirectTo: '/'});
	});

	test.controller('add', function($scope, $http, factoryOrang){
		$scope.tambahData = function(){
			databaru = {
				nama : $scope.databaru.nama,
				kota : $scope.databaru.kota
			};

			factoryOrang.putOrang(databaru).success(function($hasil){

				$scope.data.push({
					nama : $scope.databaru.nama,
					kota : $scope.databaru.kota
				});

				$scope.databaru.nama = '';
				$scope.databaru.kota = '';

				alert(hasil);

			});
		};

	});
