var myRange = angular.module('myRange',['ui.router']);
myRange.controller('comRangeSlider', ['$scope','$rootScope','$http',function($scope,$rootScope,$http){
	//滑块封装
    $rootScope.comRangeSlider = function(element, initObj,callback){
        var $document = $(document);
        var selector = '[data-rangeslider]';
        var $element = $(element);
        var $number = $element.parents('.js-rangeslider').find('.number');
        var $plus = $element.parents('.js-rangeslider').find('.plus');
        var $minus = $element.parents('.js-rangeslider').find('.minus');

        var minSize = initObj.minSize;
        var maxSize = initObj.maxSize;
        var step = initObj.step | null;

        function valueOutput(element) {
            var value = element.value;
            $(element).attr('value', value);
            $number.attr('value', value);
        }
        $document.on('input', 'input[type="range"], ' + selector, function(e) {
            valueOutput(e.target);
        });

        $number.off('blur'); //防止 blur 累计触发
        $number.on('blur', function(e) {
            var $inputRange = $(selector, e.target.parentNode.parentNode);
            var value = $number.val();
            if(step){
                value = parseInt(Math.round(Math.round(value)/10)*10);
            }

            if(parseInt(value) <= parseInt(minSize) || value == ''){
            	value = minSize;
            }

            if(parseInt(value) > parseInt(maxSize)){
                value = maxSize;
            }
            $(this).val(value);
            $inputRange.val(value).change(); 
        });

        $plus.off('click'); //防止 click 累计触发
        $plus.on('click', function(e){
        	var $inputRange = $(selector, e.target.parentNode.parentNode);
        	var value = $number.val();
        	if(parseInt(value) < parseInt(maxSize)){
                if(step){
                    value = parseInt(value) + 10;
                }else{
    		        value++;
                }
        		$inputRange.val(value).change();
        		$minus.addClass('on');
        	}
        	if(parseInt(value) >= parseInt(maxSize)){
        		$(this).removeClass('on');
        	}
        });

        $minus.off('click'); //防止 click 累计触发
        $minus.on('click', function(e){
        	var $inputRange = $(selector, e.target.parentNode.parentNode);
        	var value = $number.val();
        	if(parseInt(value) > parseInt(minSize)){
        		if(step){
                    value = parseInt(value) - 10;
                }else{
                  value--;
                }
        		$inputRange.val(value).change();
        		$plus.addClass('on');
        	}
        	if(parseInt(value) <= parseInt(minSize)){
        		$(this).removeClass('on');
        	}
        });

        $number.on('input propertychange',function () {
            var value = this.value;
            var re = /^0|\D/g;
            this.value = value.replace(re, '')
         	btnStyle(value, true);
        });

        //按钮样式切换
        function btnStyle(value, type){
        	if(parseInt(value) >= parseInt(maxSize)){
            	if(type){
        		 	$(this).val(maxSize);
            	}
                $minus.addClass('on');
            	$plus.removeClass('on');
            }else if(parseInt(value) <= parseInt(minSize)){
            	if(type){
        		 	$(this).val(minSize);
            	}
            	$minus.removeClass('on');
            	$plus.addClass('on');
            }else{
            	$minus.addClass('on');
            	$plus.addClass('on');
            }
        }
        //计算
        function computedPrice(value){
        	btnStyle(value);
			if (typeof callback == 'function') {
				callback(value);
			}
        }
        $element.rangeslider({
            polyfill: false,
            onInit: function() {
                var value = this.$element[0].value;
                valueOutput(this.$element[0]);
            },
            // Callback function
            onSlide: function(position, value) {
            	if(parseInt(value) < parseInt(minSize)){
                    $('input[type="range"]').val(minSize).change();
                    return;
                }
                computedPrice(value);
            },
            onSlideEnd: function(position, value) {
                if(step){
                    value = parseInt(Math.round(Math.round(value)/10)*10);
                    $('input[type="range"]').val(value).change();
                }
            }
        });
        
    }

   
}])