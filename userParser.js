const fs = require('fs');
const readline = require('readline');

let parse = (userInfo)=>{
    var username;
    var password;
    let i = 1;
    for(character of userInfo){
        if(character == ' '){
            username = userInfo.substring(0, i);
            break;
        }
        i += 1;       
    }
    password = userInfo.substring(i, userInfo.length);
    let info = [username, password];
    return info;
};

let validateInfo = (username, password)=>{

    let isValid = true;
    readInterface = readline.createInterface({
        input : fs.createReadStream('./plaintext/accounts'),
        output: process.stdout
    });

    readInterface.on('line', (line)=>{
        if(line == 'null'){
            readInterface.close();
        }else{
            let info = parse(line);
            if(username == info[0] || password == info[1]){

                isValid = false;
                readInterface.close();
                
            }
        }
    });
    readInterface.on('close', ()=>{
        console.log('reader closed');
        console.log(isValid);
        return isValid;
    });

}

module.exports.parse = parse;
module.exports.validateInfo = validateInfo;