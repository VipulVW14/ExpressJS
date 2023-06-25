const express = require('express')
const app = express()
const port = 3000
const { v4: uuidv4 } = require('uuid');
const bodyParser= require('body-parser')
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Authentication Server Running!')
})

let users=[];

app.post('/signup', (req,res)=>{
  const { username, password, firstname, lastname } =req.body;

  const existingUser= users.find((user)=> user.username === username && user.password === password);
  if(existingUser) res.status(400).json({message: 'User already exists! Please Login'});
  else{
  const uniqueId= uuidv4();
  const newUser={ id: uniqueId,username,password,firstname,lastname};
  users.push(newUser);
  res.status(201).json({users});
  }
})

app.post('/login', (req,res)=>{
  const {username,password}= req.body;
  const user= users.find((user)=>user.username === username && user.password === password);
  if(!user) res.status(401).json("User doesn't exist! Please Sign Up Dawg.");
  res.status(200).json(user);
})

app.get('/data', (req,res)=>{
  const userDetails= users.map((user)=>{
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname
    };
  });
  res.json({users: userDetails})
});

app.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;