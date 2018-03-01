'use strict';

/* Directives */


angular.module('directives', []).
	directive('mainArea', function() {
    return {
        restrict: "E",
        template: "<div>"+
            "<div id='mainDiv'> </div>" +
            "<button data-ng-click='append()'>Add</button>" +
        "</div>",
        controller: function($scope, $element, $attrs) {
            $scope.append = function() {
                var p = angular.element("<p />");
                p.text("Appended");
                $element.find("div").append(p);
            }
        }
    }
});
            

