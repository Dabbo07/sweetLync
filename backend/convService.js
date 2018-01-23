var req = require('request');

var ConversationService = function(authService) {
    this.authService = authService;
};

ConversationService.prototype.conversationList = [];

ConversationService.prototype.getConversationList = function() {
    return this.conversationList;
};

ConversationService.prototype.getConversationGroupsForUser = function(future) {
    if (authService.isAuthenicated()) {
        var postData = {
            json: this.authService.getUserObject()
        };
        req.post('http://localhost:3000/conversations/user', postData, function(error, response, body) {
            console.log('Response for conversation list obtained.');
            console.log('Error?: ' + error);
            future(body);
        });
    };    
};

ConversationService.prototype.getConversation = function(conversationObj, future) {
    if (authService.isAuthenicated()) {
        var postData = {
            json: {
                user: this.authService.getUserObject(),
                conversation: conversationObj
            }
        };
        req.post('http://localhost:3000/conversation/select', postData, function(error, response, body) {
            console.log('Response for conversation item obtained.');
            console.log('Error?: ' + error);
            future(body);
        });
    };
};

exports.ConversationService = new ConversationService(global.authService);