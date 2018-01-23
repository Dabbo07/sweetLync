(function() {

    var app = angular.module("SWEETLYNC");
    var loginController = function($scope, $timeout) {

        $scope.loginPanelShow = true;
        $scope.userList = [];
        $scope.conversationList = [];
        $scope.loggedInUsername = "Unknown";
        $scope.applicationError = "";
        $scope.futureCallCompleted = true;

        var authService = require('electron').remote.getGlobal('authService');
        var userService = require('electron').remote.getGlobal('userService');
        var conversationService = require('electron').remote.getGlobal('conversationService');

        var performLogonClick = function() {
            $scope.applicationError = "";
            $scope.authRequestComplete = false;
            $scope.loginPanelShow = false;
            var username = $('#lun').val();
            var passwordRaw = $('#lpw').val();
            authService.authenticateUser(username, passwordRaw, loginAttemptedFuture, $scope);
            $timeout(futureCallCompletedCheck, 1000);
        };
        $scope.performLogonClick = performLogonClick;

        var futureCallCompletedCheck = function() {
            // AngularJS Binding failed, so need to manually check when authentication has finished before refreshing scope.
            if ($scope.futureCallCompleted) {
                $scope.$apply();
            } else {
                $timeout(futureCallCompletedCheck, 1000);
            };
        };

        var loginAttemptedFuture = function(status) {
            if (status) {
                $scope.loggedInUsername = authService.getUsername();
                updateUserList();
                updateConversationList();
            } else {
                $scope.applicationError = 'Login failed, username/password was not correct.';
                $scope.loginPanelShow = true;
            }
        };

        var updateUserList = function() {
            userService.getUserList(obtainedUserListFuture);
        };
        var updateConversationList = function() {
            conversationService.getConversationGroupsForUser(conversationListFuture); 
        };

        var obtainedUserListFuture = function(data) {
            $scope.userList = data;
        };
        var conversationListFuture = function(data) {
            $scope.conversationList = data;
            $scope.futureCallCompleted = true;
        };

        var getUserList = function() {
            return userList;
        };
    };

    app.directive('loginPanel', function () {
        return {
            restrict: "E",
            templateUrl: "view/login-panel.html",
            controller: loginController
        };
    });

})();