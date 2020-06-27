const mysql = require('mysql');
const express = require('express');
var app=express();
const bodyParser=require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer();

app.use(bodyParser.json());
// Create connection
const mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'sujay_php',
    password : 'Sujay@1234',
    database : 'potatao',
    multipleStatements:true
});
mysqlConnection.connect((err) => {
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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000,()=>console.log('Express server is running at port number 3000'));

mysqlConnection.query('CREATE DATABASE IF NOT EXISTS altruism DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;',(err,rows,fields)=>{
     if(!err)
     {
        console.log("success");
     }
     else
     {
         console.log(err);
     }  
})
/*
mysqlConnection.query('SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";',(err,rows,fields)=>{
     if(!err)
     {
        console.log("success1");
     }
     else
     {
         console.log(err);
     }  
})
mysqlConnection.query('SET time_zone = "+00:00";',(err,rows,fields)=>{
     if(!err)
     {
        console.log("success2");
     }
     else
     {
         console.log(err);
     }  
})
*/
/*
mysqlConnection.query('DROP TABLE IF EXISTS `data_records`;',(err,rows,fields)=>{
     if(!err)
     {
        console.log("success3");
     }
     else
     {
         console.log(err);
     }  
})
*/
mysqlConnection.query('CREATE TABLE IF NOT EXISTS `data_records` (\
  `id` int(50) NOT NULL,\
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
        console.log("success4");
     }
     else
     {
         console.log(err);
     }  
})
mysqlConnection.query('DROP TABLE IF EXISTS `device_list`;',(err,rows,fields)=>{
     if(!err)
     {
        console.log("success5");
     }
     else
     {
         console.log(err);
     }  
})

mysqlConnection.query('CREATE TABLE `device_list` (\
  `id` int(50) NOT NULL,\
  `device_name` varchar(50) NOT NULL,\
  `device_id` varchar(50) NOT NULL,\
  `country` varchar(50) NOT NULL,\
  `latitude` varchar(50) NOT NULL,\
  `longitude` varchar(50) NOT NULL,\
  `location_name` varchar(50) NOT NULL,\
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=latin1;',(err,rows,fields)=>{
     if(!err)
     {
        console.log("success6");
     }
     else
     {
         console.log(err);
     }  
})
app.post('/datarecords',(req,res)=>{
console.log(req.body.startid,req.body.endid);
   let queryString ='Select * from data_records where id between ? and ?';
     let filter = [req.body.startid,req.body.endid];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/solar',(req,res)=>{
    //console.log(req.body.todaydate);
     let queryString ='select solar from data_records where date(timing)=?;';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/winddirection',(req,res)=>{
   let queryString ='Select wind_direction from data_records where date(timing)=?;';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/windspeed',(req,res)=>{
   let queryString ='Select wind_speed from data_records where date(timing)=?;';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/date',(req,res)=>{
     let queryString ='select timing from data_records where date(timing)=?';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/vapour',(req,res)=>{
     let queryString ='select vapour_pressure from data_records where date(timing)=?';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

app.post('/air',(req,res)=>{
     let queryString ='select atm_pressure from data_records where date(timing)=?';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

app.post('/temperature',(req,res)=>{
     let queryString ='select air_temperature from data_records where date(timing)=?';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

app.post('/humidity',(req,res)=>{
     let queryString ='select relative_humidity from data_records where date(timing)=?';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

app.post('/rainfall',(req,res)=>{
     let queryString ='select rainfall from data_records where date(timing)=?';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/tbrainfall',(req,res)=>{
     let queryString ='select tb_rainfall from data_records where date(timing)=?';
     let filter = [req.body.todaydate];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

app.post('/datarecords2',(req,res)=>{
console.log(req.body.startdates,req.body.enddates);
   let queryString ='Select * from data_records where date(timing) between ? and ?';
     let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/solar2',(req,res)=>{
    //console.log(req.body.todaydate);
     let queryString ='select solar from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/winddirection2',(req,res)=>{
   let queryString ='Select wind_direction from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/windspeed2',(req,res)=>{
   let queryString ='Select wind_speed from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/date2',(req,res)=>{
     let queryString ='select timing from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/vapour2',(req,res)=>{
     let queryString ='select vapour_pressure from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

app.post('/air2',(req,res)=>{
     let queryString ='select atm_pressure from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

app.post('/temperature2',(req,res)=>{
     let queryString ='select air_temperature from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

app.post('/humidity2',(req,res)=>{
     let queryString ='select relative_humidity from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

app.post('/rainfall2',(req,res)=>{
     let queryString ='select rainfall from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});
app.post('/tbrainfall2',(req,res)=>{
     let queryString ='select tb_rainfall from data_records where date(timing) between ? and ?';
    let filter = [req.body.startdates,req.body.enddates];
     mysqlConnection.query(queryString,filter,(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}
)
});

/*
app.get('/signups',(req,res)=>{
mysqlConnection.query('Select * from signup',(err,rows,fields)=>{
     if(!err)
     {
        res.send(rows);
        // console.log(rows[0].name);
     }
     else
     {
         console.log(err);
     }  
}) 
});

app.post('/signin',function(req,res){
//console.log(req);
    console.log(req.body.name,req.body.password);
     let queryString ='Select * from signup where name=? and password=?';
     let filter = [req.body.name,req.body.password];
     mysqlConnection.query(queryString,filter,function(err,results,fields,body){
     if(!err)
{
console.log("done success");
console.log(results);
if(results=="")
{
console.log("done success 2");
res.send(false);
}
else
{
res.send(true);
}
}     
else
{
console.log("not succes");
}
    })
    });

app.delete('/signup/:name',(req,res)=>{
        mysqlConnection.query('delete from signup where name=?',[req.params.name],(err,rows,fields)=>{
             if(!err)
             {
                res.send('delete successfully');
                // console.log(rows[0].name);
             }
             else
             {
                 console.log(err);
             }  
        })
        });
app.post('/signup',(req,res)=>{
    let cust=req.body;
    var sql="SET @name =?;SET @email =?;SET @password =?;SET @phone_number =?; \
    call customerdetails(@name,@email,@phone_number,@password)";
            mysqlConnection.query(sql,[cust.name,cust.email,cust.password,cust.phone_number],(err,rows,fields)=>{
                 if(!err)
                 {
                    res.send(rows);
                    // console.log(rows[0].name);
                 }
                 else
                 {
                     console.log(err);
                 }  
            })
            });

            /*
            var cors = require ('cors');
            app.use(cors({
                origin:['http://localhost:4200','http://127.0.0.1:4200'],
                credentials:true
            }));
            
            app.use(function (req, res, next) {
            
              res.header('Access-Control-Allow-Origin', "http://localhost:4200");
              res.header('Access-Control-Allow-Headers', true);
              res.header('Access-Control-Allow-Credentials', 'Content-Type');
              res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
              next();
            });
            */




////device add route
app.post("/api/device", (req, res)=>{

	

});
