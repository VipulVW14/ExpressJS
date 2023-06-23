//// Creating http server using Node.js using fs library for fetching data of a file//
// const fs= require("fs");
// function callbackFn(err, data){
//     console.log(data);
// }
// fs.readFile("a.txt","utf-8",callbackFn)
 
// Creating http server using ExpressJS//
const express = require('express')
const app = express()
const port = 3000
var bodyParser= require('body-parser')
app.use(bodyParser.json()) //middleware that extracts the post body and puts it in req.body ang goes to app.get()

////Custom middleware//
// var numberOfRequests=0;
// function middleware1(req,res,next){
//     numberOfRequests = numberOfRequests +1;
//     console.log("Number of Requests:"+numberOfRequests);
//     // console.log("from inside middleware: "+req.headers.n);
//     // res.send("Error from inside middleware");
//     next();
// }
// app.use(middleware1);

function calculateSum(n){
    var sum=0;
    for(var i=1; i<=n; i++) sum+=i;
    return sum;
}
function calculateMul(n){
    var mul=1;
    for(var i=1; i<=n; i++) mul*=i;
    return mul;
}
function handleFirstRequest(req,res){
    ////HTTP requests for sending request(data ig) to the server 
    // // 1.Query params 
    // var n=req.query.n;
    // console.log(req.query)
    // console.log("n2:"+req.query.n2);
    // console.log("n3:"+req.query.n3);

    //2.Headers
    // var n=req.headers.n;
    // console.log(req.headers);
    // console.log(req.params.username);

    //3.Body
    console.log(req.body);
    var n= req.body.n;
    
    if(n<100000){
        var CalculatedSum= calculateSum(n);
        //1.Text response
        // var stringAnswer= "Sum is: "+ CalculatedSum + "and Multiplication is: "+ CalculatedMul;
        var CalculatedMul= calculateMul(n);
        //2.JSON response
        var answerObject ={
            sum: CalculatedSum,
            mul: CalculatedMul
        }
        res.send(answerObject);
    }else{
        res.status(411).send("You have sent a very big number!");
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/htmlresponse', (req,res)=> {
    //3.Html response
    res.send(`<head><title>HTML Page</title></head><body><i>Hey there!</i></body>`)
})
app.post('/:username', handleFirstRequest) //any /username
app.post('/createuser', (req,res)=>{ res.send("hello world!") })
app.put('/putuser', (req,res)=>{ res.send("Sendign put request!") })
app.delete('/deleteuser',(req,res)=>{ res.send("Sending delete request!") })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})