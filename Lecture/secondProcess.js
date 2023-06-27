//fetching the body of localhost3000
function logResponseBody(jsonBody){
    console.log(jsonBody);
}
function callbackFn(result){
    console.log(result);
    // console.log(result.status)
    result.json().then(logResponseBody);
}
var sendObj={
    method: "GET"
};
fetch("http://localhost:3000/okok?n=11",sendObj).then(callbackFn); 
//fetch is also an library like fs(for reading files) and express(for creating http server) for fetching data from another nodejs server fn ig