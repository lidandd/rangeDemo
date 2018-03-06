/*滑块*/
myRange.controller('rangeController', ['$scope','$rootScope','$http',function($scope,$rootScope,$http) {
	$scope.typeData = [
		{
			step:"10",
			type:"SSD"
		},
		{
			step:"1",
			type:"高效云盘"
		}
	];
	$scope.typeClick = function(index){
		//类型选中状态 
		$('.js-create-disk-type ul li').removeClass('type_active');
		$('.js-create-disk-type ul li').eq(index).addClass('type_active');
		if(index == 0){
		    var initObj = {
				'minSize': 100,
				'maxSize': 5000,
				'step': 10
			}
   			$scope.rangeSlider(initObj);
   			$(".js-scale-min").html(initObj.minSize + "G");
   			$(".js-scale-max").html(initObj.maxSize + "G");
		}
		if(index == 1){
			 var initObj = {
				'minSize': 10,
				'maxSize': 500
			}
   			$scope.rangeSlider(initObj);
			$(".js-scale-min").html(initObj.minSize + "G");
   			$(".js-scale-max").html(initObj.maxSize + "G");
		}
	}
	//容量滑块 
	$scope.rangeSlider = function(initObj){
		$('#js-change-value').html('<input type="range" min="'+ initObj.minSize +'" value="'+ initObj.minSize +'" max="'+ initObj.maxSize +'" data-rangeslider>');
    	$rootScope.comRangeSlider('.js-rangeslider [data-rangeslider]', initObj,callback);
    	function callback(val){
    		console.log(val);
	    }
    }
    //初始化 标准型
    var initObj = {
		'minSize': 100,
		'maxSize': 5000,
		'step': 10
	}
    $scope.rangeSlider(initObj);
	$(".js-scale-min").html(initObj.minSize + "G");
	$(".js-scale-max").html(initObj.maxSize + "G");

}])