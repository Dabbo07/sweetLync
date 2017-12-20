const cryptKey = "123ABC";
var CryptoJS = require("crypto-js");

var app = angular.module("app", [ ]);

app.service('encService', function() {
    
    this.encryptText = function(text) {
        var salt = CryptoJS.lib.WordArray.random(128/8);
        var iv = CryptoJS.lib.WordArray.random(128/8);
    
        var key = CryptoJS.PBKDF2(
            cryptKey,
            salt, 
            {
                keySize: 256/32, 
                iterations: 1000 
            }
        );
        
        var encrypted = CryptoJS.AES.encrypt(
            text,
            key, 
            { 
                iv: iv, 
                mode: CryptoJS.mode.CBC, 
                padding: CryptoJS.pad.Pkcs7 
            }
        );
        return (iv + "{a-" + salt + "{a-" + encrypted.ciphertext);
    };

    this.decryptText = function(text) {
        var decrypted = "";
        var data = text.split("{a-");
        if (data.length != 3) {
            console.log("ERROR: Invalid text for decryption.");
            return "";
        }
        var key = CryptoJS.PBKDF2(
            cryptKey,
            CryptoJS.enc.Hex.parse(data[1]),
            {
                keySize: 256/32, 
                iterations: 1000 
            }
        );
       
        var iv = CryptoJS.enc.Hex.parse(data[0]);
        var cipher = CryptoJS.lib.CipherParams.create({
            key : key,
            iv : iv,
            ciphertext : CryptoJS.enc.Hex.parse(data[2])
        });
                   
        decrypted += CryptoJS.AES.decrypt(
            cipher, 
            key, 
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,  
                padding: CryptoJS.pad.Pkcs7 
            }
        ).toString(CryptoJS.enc.Utf8);
       
        return decrypted;
    };     

});

app.controller('loginCtrl', function($scope, $http, encService) {

    $scope.loggedIn = false;

    $scope.loginUser = function() {
        
        var username = $scope.lusername;
        var password = encService.encryptText($scope.lpassword);

        $scope.loginObj = {
            "username": username,
            "password": password,
            "status": 1
        };
        
        $http.post('http://localhost:3000/user/status', $scope.loginObj).then(function(res) {
            if (res.data === "{true}") {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }
        });
    };
});

app.controller('userListCtrl', function($scope, $http) {

    $scope.$watch('loggedIn', function(newValue, oldValue) {
        if (newValue !== oldValue && newValue === true) {
            $http.post('http://localhost:3000/user/status', $scope.loginObj).then(function(res) {
                $scope.userList = res;
            });
        };
    });

});

