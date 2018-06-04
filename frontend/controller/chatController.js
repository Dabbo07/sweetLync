(function () {

    var app = angular.module("SWEETLYNC");
    
    var chatController = function($scope, $timeout) {
        $scope.selectedChat = {};
        $scope.selectedChat.alias = null;
        $scope.selectedChat.messages = [];

        var conversationService = require('electron').remote.getGlobal('conversationService');

        var conversationListClick = function(conversationObj) {
            $scope.selectedChat.alias = conversationObj.conversation_alias;
            conversationService.getConversation(conversationObj, conversationRetrieveFuture);
        };
        $scope.conversationListClick = conversationListClick;

        var conversationRetrieveFuture = function(entries) {
            console.log("Entries: " + JSON.stringify(entries));
            if (entries) {
                $scope.selectedChat.messages = entries;
                console.log("Success");
            } else {
                $scope.selectedChat.alias = null;
                console.log("Failed");
            };
            $scope.$apply();
        };
    };

    app.directive('chatPanel', function () {
        return {
            restrict: "E",
            templateUrl: "view/chat-panel.html",
            controller: chatController
        };
    });


})();