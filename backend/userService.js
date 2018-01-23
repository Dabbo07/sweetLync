var req = require('request');

var UserService = function(authService) {
    this.authService = authService;
    this.time = 1;
};

UserService.prototype.getUserList = function(future) {
    if (authService.isAuthenicated()) {
        var postData = {
            json: this.authService.getUserObject()
        };
        req.post('http://localhost:3000/user/list', postData, function(error, response, body) {
            console.log('Response for user list obtained.');
            console.log('Error?: ' + error);
            future(body);
        });
    };
};

exports.UserService = new UserService(global.authService);