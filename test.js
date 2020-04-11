var spawn = require("child_process").spawn;
test = spawn('python', ['createAccount.py', "michael", "180025"]);

var username = "Michael";
var password = "180025";

var dataString;

test.stdout.on('data', (data)=>{
    console.log(data.toString());
});
test.stdout.on('end', ()=>{
    console.log("tester");
});

test.on('close', ()=>{
    console.log("done");
})

