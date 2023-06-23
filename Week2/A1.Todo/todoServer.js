const express = require('express')
const app = express()
const port = 3000
var bodyParser= require('body-parser')
app.use(bodyParser.json())

 module.exports = app;


var todoArr=[{title: "nodejs",description: "complete week 2 assignment"},
               {title: " ",description:" "} 
              ];
app.get('/', (req,res)=>{
  res.send("Todo is running!")
})
app.get('/todos', (req, res) => {
  res.status(200).send(JSON.stringify(todoArr));
})
app.get('/todos/:id', (req, res) => {
   var todoId=req.params.id;
   res.send(JSON.stringify(todoArr[id])); 
})
app.post('/todos', (req, res) => {
  todoArr.push(req.body);
  res.status(201).send(JSON.stringify(todoArr));
})
app.put('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo= req.body;
  if(todoArr[todoId]!==undefined){
    todoArr[todoId] = { ...todoArr[todoId], ...updatedTodo };
    res.status(200).json({ message: 'Todo updated successfully' });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
})
app.delete('/todos/:id', (req, res) => {
  var todoId= req.params.id;
  todoArr.splice(todoId,1);
  res.status(200).send(JSON.stringify(todoArr));
})
app.get('/:other', (req, res) => {
  res.status(404).json({ error: 'Route not found!' });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})