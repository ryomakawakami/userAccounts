let parse = (userInfo)=>{
    var username;
    var password;
    let i = 1;
    for(character of userInfo){
        if(character == " "){
            username = userInfo.substring(0, i);
            break;
        }
        i += 1;       
    }
    i+=1;
    password = userInfo.substring(i, userInfo.length);
    let info = [username, password];
    return info;
};


module.exports.parse = parse;