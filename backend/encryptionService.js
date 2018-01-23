const cryptKey = "123ABC";

var CryptoJS = require("crypto-js");

var EncryptionService = function() {
    this.time = 2;
};

EncryptionService.prototype.encryptText = function(text) {
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
    key = "a516868828e321ba11088213b9da87a0a159746490adaf58ce902ae5faadf4ba";
	return (iv + "{a-" + salt + "{a-" + encrypted.ciphertext);
};

EncryptionService.prototype.decryptText = function(text) {
    var decrypted = "";
    if (text === undefined || text === null) {
        console.log("ERROR: Invalid text for decryption.");
        return "";
    };
    var data = text.split("{a-");
    if (data.length != 3) {
        console.log("ERROR: Invalid text for decryption.");
        return "";
    };
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

EncryptionService.prototype.log = function() {
    console.log('Encryption service available.');
};

exports.EncryptionService = new EncryptionService();

