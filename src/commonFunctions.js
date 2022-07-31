

var crypto =require('crypto-js');


export const encryptData = (data,key)=>
{
    let cipher=crypto.AES.encrypt(data,key).toString();
    
   return cipher;
}


export const decryptData = (data,key)=>
{
    let cipher=crypto.AES.decrypt(data,key).toString(crypto.enc.Utf8);
        
       return cipher;
}