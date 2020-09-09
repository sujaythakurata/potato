const mysql = require('mysql');
const express = require('express');
var app=express();
const bodyParser=require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const btoken = require('express-bearer-token');
require('dotenv').config()


app.use(bodyParser.json());
app.use(btoken());
// Create connection
const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'sujay_php',
    password : 'Sujay@1234',
    database : 'potato',
    multipleStatements:true
});
conn.connect((err) => {
    if(!err){
        console.log('MySql Connected...');
    }
    else{
    console.log('MySql failed...');
    }
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.listen(4300,()=>console.log('Express server is running at port number 4300'));



function auth(req, res, next){
    if(!req.token){
        res.status(403).json({"status":0, "msg":"no token found login again"});
    }else{
        jwt.verify(req.token, process.env.key, (err, data)=>{
            if(err){
                res.status(500).json({"status":0, "msg":"Login again"});
            }else{
                req.userid = data['id'];
                next();
            }
        })
    }
}




conn.query('CREATE DATABASE IF NOT EXISTS potato DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;',(err,rows,fields)=>{
     if(!err)
     {
        console.log("success");
     }
     else
     {
         console.log(err);
     }  
})

conn.query("SET @@SQL_MODE=''");



conn.query('CREATE TABLE IF NOT EXISTS `data_records` (\
  `id` int(50) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
  `tz` varchar(50) NOT NULL,\
  `solar` varchar(50) NOT NULL,\
  `rainfall` varchar(50) NOT NULL,\
  `wind_speed` varchar(50) NOT NULL,\
  `wind_direction` varchar(50) NOT NULL,\
  `air_temperature` varchar(50) NOT NULL,\
  `vapour_pressure` varchar(50) NOT NULL,\
  `atm_pressure` varchar(50) NOT NULL,\
  `relative_humidity` varchar(50) NOT NULL,\
  `tb_count` varchar(50) NOT NULL,\
  `tb_rainfall` varchar(50) NOT NULL,\
  `timing` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE          CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=latin1;',(err,rows,fields)=>{
     if(!err)
     {
        console.log("data_records table created");
     }
     else
     {
         console.log(err);
     }  
})
// conn.query('DROP TABLE IF EXISTS `device_list`;',(err,rows,fields)=>{
//      if(!err)
//      {
//         console.log("success5");
//      }
//      else
//      {
//          console.log(err);
//      }  
// })

conn.query('CREATE TABLE IF NOT EXISTS `device_list` (\
  `id` int(50) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
  `user_id` int NOT NULL,\
  `device_name` varchar(50) NOT NULL,\
  `device_id` varchar(50) NOT NULL,\
  `country` varchar(50) NOT NULL,\
  `latitude` varchar(50) NOT NULL,\
  `longitude` varchar(50) NOT NULL,\
  `location_name` varchar(50) NOT NULL,\
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=latin1;',(err,rows,fields)=>{
     if(!err)
     {
        console.log("device_list table created");
     }
     else
     {
         console.log(err);
     }  
})


conn.query("CREATE TABLE IF NOT EXISTS user(id INT AUTO_INCREMENT PRIMARY KEY, user_name varchar(50), email varchar(70), password varchar(200), role int)");

///###########update##########

app.get("/live/data/:id",auth, (req, res)=>{
    let id = req.params['id'];
    let query = `SELECT id, device_id, tz, solar, rainfall, wind_speed, wind_direction, air_temperature, vapour_pressure, atm_pressure, relative_humidity, tb_count, tb_rainfall, timing    
        FROM data_records WHERE device_id = ${id} ORDER BY timing DESC LIMIT 1
    `;

    conn.query(query, (err, data)=>{
        if(!err){
            res.json(data)
        }else{

            res.json(err);
        }
    })
});


app.get("/live/fulldata/:id",auth, (req, res)=>{
    let id = req.params['id'];
    let query = `SELECT * FROM(SELECT id, device_id, tz, solar, rainfall, wind_speed, wind_direction, air_temperature, vapour_pressure, atm_pressure, relative_humidity, tb_count, tb_rainfall, timing    
        FROM data_records WHERE device_id = ${id}  ORDER BY timing DESC LIMIT 20) sub ORDER BY timing ASC
    `;

    conn.query(query, (err, data)=>{
        if(!err){
            res.json(data)
        }else{

            res.json(err);
        }
    })
});

app.get("/history/data", auth,(req, res)=>{
    let id = req.query["id"];
    let start = req.query["start"];
    let end = req.query["end"];
    let query = `SELECT id, device_id, tz, round(avg(solar), 2) as solar, round(avg(rainfall), 2) as rainfall, round(avg(wind_speed), 2) as wind_speed, round(avg(wind_direction), 2) as wind_direction, round(avg(air_temperature), 2) as air_temperature, round(avg(vapour_pressure), 2) as vapour_pressure, round(avg(atm_pressure), 2) as atm_pressure, round(avg(relative_humidity), 2) as relative_humidity, round(avg(tb_count), 2) as tb_count, round(avg(tb_rainfall), 2) as tb_rainfall, timing
        FROM data_records WHERE timing>'${start}' AND timing <='${end}' AND device_id = ${id} GROUP BY UNIX_TIMESTAMP(TIMING) DIV 600 ORDER BY timing DESC;
     `;
    conn.query(query, (err, data)=>{
        if(!err)
            res.json(data);
        else
            res.json(err);
    })
})
app.get("/history/table", auth,(req, res)=>{
    let id = req.query["id"];
    let start = req.query["start"];
    let end = req.query["end"];
    let query = `SELECT id, device_id, tz, solar , rainfall , wind_speed , wind_direction , air_temperature , vapour_pressure , atm_pressure , relative_humidity , tb_count , tb_rainfall, timing
        FROM data_records WHERE timing>'${start}' AND timing <='${end}' AND device_id = ${id} ORDER BY timing DESC;
     `;
    conn.query(query, (err, data)=>{
        if(!err)
            res.json(data);
        else
            res.json(err);
    })
})

app.post("/api/adduser",auth, (req,res)=>{

    const role = req.body.role;
    const name = req.body.username;
    const email = req.body.email;
    const pass = req.body.password;
    var query = `SELECT COUNT(email) as email FROM user WHERE email='${email}'`;
    conn.query(query, (err, data)=>{
        if(!err){
            if(data[0]['email']==0){
                //hash the password.
                bcrypt.hash(pass, 10, (err, hash)=>{
                    if(!err){
                        query = `INSERT INTO user(user_name, email, role, password)
                        values('${name}', '${email}', ${role}, '${hash}')
                        `;
                        conn.query(query, (err, data)=>{
                            if(!err)
                                res.status(200).json({"status":1});
                            else
                                console.log(err);
                        })
                    }
                })
            }
            else{
                res.status(200).json({"status": 0, "msg":"Same Email Exists"});
            }
        }
    })

})

//login

app.post("/api/login", (req, res)=>{
    const email = req.body.email;
    const pass = req.body.password;
    var query = `SELECT id, user_name, email, password, role from user WHERE email = '${email}'`;

    conn.query(query, (err, data)=>{
        if(!err){

            if(data.length>0){    
                bcrypt.compare(pass, data[0]['password'], (err, result)=>{
                    if(!err){
                        if(result){
                           //make a jwt token

                           let token = jwt.sign({"id":data[0]["id"]},process.env.key,{ expiresIn: "10h"})
                           res.status(200).json({
                               "auth":true,
                               "user_name":data[0]["user_name"],
                               "user_id":data[0]["id"],
                               "role":data[0]['role'],
                               "token":token,
                               "exp":10,
                               "status":1
                           });

                        }else{
                            res.json({"status": 0})
                        }
                    }else{
                      res.json({"status": 0})
                    }
                })
            }else{
              res.json({"status": 0})
            }
        }else{
            console.log(err)
        }
    })

})


app.get("/api/userlist", auth, (req, res)=>{
    let query = "SELECT id, user_name, email, role FROM user";
    conn.query(query, (err, data)=>{
        if(!err)
            res.json(data);
    })
})

////device add route
app.post("/api/device",auth, (req, res)=>{

	const name = req.body.name;
	const id = req.body.id;
	const country = req.body.country;
	const lat = req.body.lat;
	const long = req.body.long;
	const loc = req.body.loc;
  let query = `SELECT count(id) AS id FROM device_list WHERE device_id=${id}`;
  conn.query(query, (err, result)=>{
    if(!err){
      if(result[0]['id']==0){
        query = `INSERT INTO device_list(device_name, user_id, device_id, country, latitude, longitude, location_name)\
        VALUES( '${name}', ${req.userid}, ${id}, '${country}', '${lat}', '${long}', '${loc}' )`;
        conn.query(query, (err, rows)=>{
          if(!err){
            res.json({'status': 0});
          }else{
            console.log(err);
            res.json({'status': 1});
          }
        });
      }else{
        res.status(200).json({'status':409, "msg":'Same Device Id Exists'});
      }
    }
  });

});


app.get("/api/devicelist",auth, (req, res)=>{
	const query = `SELECT * FROM device_list`;
	conn.query(query, (err, rows)=>{
		if(!err){
			res.json(rows);
		}else{
			console.log(err);
			res.json({'status': 1});
		}
	});
})

app.post("/api/deviceupdate",auth, (req, res)=>{

    const device_id = req.body.device_id;
    const name = req.body.name;
    const id = req.body.id;
    const country = req.body.country;
    const lat = req.body.lat;
    const long = req.body.long;
    const loc = req.body.loc;
    const query = `UPDATE device_list SET device_name='${name}', device_id = '${id}', country = '${country}', latitude = '${lat}', longitude = '${long}', location_name = "${loc}" WHERE device_id = ${device_id} `;
    conn.query(query, (err, rows)=>{
        if(!err){
            res.json({'status': 0});
        }else{
            console.log(err);
            res.json({'status': 1});
        }
    });


});

app.post("/api/delete",auth, (req, res)=>{
    let id = req.body.id;
    const query = `DELETE FROM device_list WHERE device_id=${id}`;
    conn.query(query, (err, rows)=>{
        if(!err){
            res.json({'status': 0});
        }else{
            console.log(err);
            res.json({'status': 1});
        }
    });
})


//delete usr

app.post("/api/deleteuser", auth, (req, res)=>{

    let query = `delete from user where id = ${req.body.user_id}`;
    conn.query(query, (err, resut)=>{
        if(!err){
            res.json({"status":1})
        }else{
            console.log(err);
            res.json({"status":0})
        }
    })

})
app.post("/api/edituser", auth, (req, res)=>{

    let query = `update table user set user_name = '${req.body.name}', role=${req.body.role} where id = ${req.body.user_id}`;
    conn.query(query, (err, resut)=>{
        if(!err){
            res.json({"status":1})
        }else{
            console.log(err);
            res.json({"status":0})
        }
    })

})
