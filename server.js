const express = require('express');
const app = express();
const port = process.env.PORT||3100;
const fs = require('fs');
const cors = require('cors');
const schema = require("./models/schema");
const mongoose = require("mongoose");
const bodyParser = require("body-parser").json();

let url = 'mongodb://localhost:27017/nbadDb';

app.use ('/', express.static('public'));
app.use(cors());


// app.get('/hello', (req, res) => {
//     res.send('Hello World!');
// });


  app.get('/personalbudget', (req, res) => {
    
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
        console.log("Connection to Database established ")
        
        schema.find({}).then((data) => {
            res.json(data)
            console.log(data);
            mongoose.connection.close()

        }).catch((connectionError) => {
            console.error(connectionError);
        })
    }).catch((connectionError) => {
        console.error(connectionError)
    })
});

app.post('/personalbudget', (req, res) => {
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
        console.log("Connection to Database establishedPost")
        const n=req.body
        console.log(n)
        schema.insertMany(n).then((data) => {
            res.status(200).json({message: 'updated', data: data});
            mongoose.connection.close()

        }).catch((connectionError) => {
            console.log(connectionError)
        })
    }).catch((connectionError) => {
        console.log(connectionError)
    })
});



app.listen(port, () => {
console.log(`Server is running on  port ${port}`)
});