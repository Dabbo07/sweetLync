var req = require('request');

var authenticated = false;
var userObject = {};

var AuthService = function(encryptionService) {
    this.encryptionService = encryptionService;
};

AuthService.prototype.authenticateUser = function(username, passwordRaw, future) {
    console.log('Recieved: ' + username + ":" + passwordRaw);
    console.log("Service;" + JSON.stringify(encryptionService));
    var encryptedPassword = encryptionService.encryptText(passwordRaw);
    console.log('Encrypted Password: ' + encryptedPassword);
    userObject = {
        "username": username,
        "password": encryptedPassword,
        "status": 1
    };
    var postData = {
        json: userObject
    };
    req.post('http://localhost:3000/user/status', postData, function(error, response, body) {
        console.log('AuthService.authenticateUser() : Auth Response: ' + JSON.stringify(body));
        if (body.error != 'none') {
            console.log('AuthService.authenticateUser() : Not authenticated (' + body.error + ")");
            authenticated = false;
        } else {
            console.log('AuthService.authenticateUser() : Authenticated, userId(' + body._id + ')');
            userObject._id = body._id;
            authenticated = true;
        }
        future(authenticated);
    });
};

AuthService.prototype.getUsername = function() {
    if (authenticated) {
        return userObject.username;
    };
    return null;
};

AuthService.prototype.isAuthenicated = function() {
    console.log('Authentication Check Requested');
    return authenticated;
};

AuthService.prototype.getUserObject = function() {
    return userObject;
};

exports.AuthService = new AuthService(global.encryptionService);