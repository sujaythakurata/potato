const mysql = require('mysql');
const express = require('express');
var app=express();
const bodyParser=require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer();


// Create connection
const conn =  mysql.createConnection({
    host     : 'localhost',
    user     : 'sujay_php',
    password : 'Sujay@1234',
    database : 'potato',
    multipleStatements:true
});
conn.connect((err) => {
    if(!err){
        console.log('MySql Connected...');
        pushdata()
    }
    else{
    console.log('MySql failed...');
    }
});




// app.listen(4300,()=>console.log('Express server is running at port number 4300'));


function pushdata() {
    
    let query = `insert into data_records( device_id , tz , solar , rainfall , wind_speed , wind_direction , air_temperature , vapour_pressure , atm_pressure , relative_humidity , tb_count , tb_rainfall)

        values(1, 'n', ${(Math.random(0, 50)*50).toFixed(2)}, ${(Math.random(0, 50)*50).toFixed(2)}, ${(Math.random(0, 50)*50).toFixed(2)}, ${(Math.random(0, 50)*50).toFixed(2)}, ${(Math.random(0, 50)*50).toFixed(2)}, ${(Math.random(0, 50)*50).toFixed(2)}, ${(Math.random(0, 50)*50).toFixed(2)}, ${(Math.random(0, 50)*50).toFixed(2)}, ${(Math.random(0, 50)*50).toFixed(2)}, ${(Math.random(0,5)*50).toFixed(2)})

      `;
      conn.query(query, (err, rows)=>{
          if(!err){
            setTimeout(()=>{pushdata()}, 100);

          }else{
              console.log(err);
          }
      })




}

