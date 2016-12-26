/*header*/
var app = angular.module('app',[]);

// 分页
app.controller('pager', ['$scope', '$http', function($scope, $http) {
         $scope.paginationConf = {
         	pageCount:160,
            current:1,
            callBack : function(page){
            	// 绑定数据
            	//console.log(page)
            }
         }
}])
	// 指令
app.directive('tcdpagecode', ['$compile', function($compile) {
		return {
			restrict: 'EA',
			template: '<div class="tcdPageCode"></div>',
			replace: true,
			scope: {
				config: '=' 
			}, 
			link: function(scope, element, attrs) {
				var obj = $(element);
				var args = scope.config;
				// 创建Dom
				var greatDom = function(obj,args) {
					// 清空html
					obj.empty();
					//上一页
					if(args.current > 1) {
						obj.append('<a href="javascript:;" class="prevPage" ng-click="prevPage()">上一页</a>');
					} else {
						obj.remove('.prevPage');
						obj.append('<span class="disabled">上一页</span>');
					}
					//中间页码
					if(args.current != 1 && args.current >= 4 && args.pageCount != 4) {
						obj.append('<a href="javascript:;" class="pageNumber" ng-click="goTopage($event)">' + 1 + '</a>');
					}
					if(args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
						obj.append('<span>...</span>');
					}
					var start = args.current - 2,
						end = args.current + 2;
					if((start > 1 && args.current < 4) || args.current == 1) {
						end++;
					}
					if(args.current > args.pageCount - 4 && args.current >= args.pageCount) {
						start--;
					}
					for(; start <= end; start++) {
						if(start <= args.pageCount && start >= 1) {
							if(start != args.current) {
								obj.append('<a href="javascript:;" class="pageNumber" ng-click="goTopage($event)">' + start + '</a>');
							} else {
								obj.append('<span class="current">' + start + '</span>');
							}
						}
					}
					if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
						obj.append('<span>...</span>');
					}
					if(args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
						obj.append('<a href="javascript:;" class="pageNumber" ng-click="goTopage($event)">' + args.pageCount + '</a>');
					}
					//下一页
					if(args.current < args.pageCount) {
						obj.append('<a href="javascript:;" class="nextPage" ng-click="nextPage()">下一页</a>');
					} else {
						obj.remove('.nextPage');
						obj.append('<span class="disabled">下一页</span>');
					}
				}
				greatDom(obj,args);
				// 编译创建的模板
				$compile($(element))(scope);
				// nextPage
				scope.nextPage = function(){
					var current = parseInt(obj.children("span.current").text());
					greatDom(obj, {
						"current": current + 1,
						"pageCount": args.pageCount
					});
					$compile($(element))(scope);
					if(typeof(args.callBack)=="function"){
						args.callBack(current+1);
					}
 				}
				//prevPage
				scope.prevPage = function(){
					var current = parseInt(obj.children("span.current").text());
					greatDom(obj, {
						"current": current - 1,
						"pageCount": args.pageCount
					});
					$compile($(element))(scope);
					if(typeof(args.callBack)=="function"){
						args.callBack(current-1);
					}
 				}
				//goTopage
				scope.goTopage = function($event){
					var current = parseInt(angular.element($event.target).text());
					console.log(current)
					greatDom(obj, {
						"current": current,
						"pageCount": args.pageCount
					});
					$compile($(element))(scope);
					if(typeof(args.callBack)=="function"){
						args.callBack(current);
					}
				}
			}
		}
	}])
 