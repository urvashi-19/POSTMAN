const express = require('express');
const fs = require('fs')
const users = require('./MOCK_DATA.json');
const app = express()

// middleware - Pluggin

app.use(express.urlencoded({extended:false}))
// creating a middleware
app.use((req , res , next)=>{
    
    console.log("hello from urvashi....");
    next();

})

app.use((req , res , next)=>{
    fs.appendFile('log.txt' , `${Date.now()} : ${req.method} : ${req.path}\n` , (err , data)=>{
        next();
    })
})

// GET 


app.get('/' , (req , res)=>{
    const h = `
    <h   style= "color: red  ; font-size: 80px;">Hello welcome to my page </h>` ;
    res.send(h);

})


app.get('/api/users', (req , res)=>{

    //setting headers 
    res.setHeader("Myname"  ,  "Piyush Garg");  
    console.log(req.headers);
    res.json(users) ;
})

app.get('/users' , (req , res)=>{
    const html = `
    <ul>

     ${users.map((data)=>
        `<li>${data.first_name}</li>`
    ).join("")}
    </ul>`

    res.send(html);
});


//dynamic path users

app.get('/api/users/:userId' , (req , res)=>{
    
    const id = Number(req.params.userId);
    const user = users.find((user)=> user.id==id);
    res.send(user);

})


/// Browser basically uses 'GET' 

//routing of post , patch , put and delete req

app.post('/api/users' ,(req , res)=>{

    
    const body = req.body;
    // setting the status code
    if(!body || !body.first_name || !body.gender){
        return res.status(400).json({msg:"somethings is pending"})
    }
    // console.log("body: " , body);
    // appending data to json file
    users.push({id:users.length+1 , ...body});
   fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users) , (err , data)=>{
    return res.status(201).json({status:"success" , id: users.length});
   })
    
})



app.patch('/api/users/:id' , (req , res)=>{
    //for  edit(patch) we need id
    return res.json({status:"pending"});
})

app.delete('/api/users/:id' , (req , res)=>{
    //for  edit(delete) we need id
    return res.json({status:"pending"});
})







PORT = 8000;
app.listen(PORT , ()=>{
    console.log("server is running at " , PORT);
})