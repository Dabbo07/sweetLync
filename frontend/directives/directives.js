(function () {

    var app = angular.module("SWEETLYNC");

    app.directive('applicationTitle', function () {
        return {
            restrict: "E",
            templateUrl: "view/application-title.html"
        };
    });

    app.directive('errorPanel', function () {
        return {
            restrict: "E",
            templateUrl: "view/error-panel.html"
        };
    });

    app.directive('navigationPanel', function () {
        return {
            restrict: "E",
            templateUrl: "view/navigation-panel.html"
        };
    });

})();