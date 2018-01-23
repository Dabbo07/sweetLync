var $ = require('jQuery');
var clientApp = {};
var errorTimer = null;

var displayError = function(errorMessage) {
    clearTimeout(errorTimer);
    $('#errorMessage').html(errorMessage);
    $('#errorBanner').show(50);
    errorTimer = setTimeout(function() { $('#errorBanner').hide(50); }, 5500);
};
clientApp.displayError = displayError;

var app = angular.module("SWEETLYNC", []);

// $(document).ready(function() {
//     //clientApp.logonController.show();
// });


