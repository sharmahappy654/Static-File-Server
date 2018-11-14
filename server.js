var app = require('express')();
    fs =  require('fs');
    path = require('path');
    mime  = require('mime');
    base_path = '/home';         //path of directory to be listed
    file_path = "";
app.use('/',(req,res)=>{
	
   if(req.url === '/')
   	 file_path = base_path;
   else
     file_path = req.url;	
	

	fs.stat(file_path,(err,status)=>{            
    console.log("URL = "+file_path);
   
    if(err){
    	res.send("BAD REQUEST 404\n");
    	console.log("Error : "+err);
    }
    else if(status.isFile()){
       res.setHeader('Content-Type', mime.getType(file_path));
       var file = fs.createReadStream(file_path);
       file.on("open",()=>{
       	file.pipe(res);
       })
       file.on("error",(err)=>{
       	res.send(err);
       });
    }
    else{
	fs.readdir(file_path,(err,files)=>{                    
		if(!err){
			fi = "<html><head><title>Files</title></head><body>\n";
            
			files.forEach((file)=>{
                 file_type = "";            
				if(mime.getType(file) === null)
				 file_type =  'Directory';
				 else
				 	file_type = mime.getType(file); 
				h = '<h3><a href="' + file_path + '/' + file + '" style="text-decoration:none">'+file+'</a><span> '+file_type+'</span></h3>\n';
                fi = fi+h;
			})	
			fi = fi + "</body></html>"
			res.write(fi);
			res.end();
		}
	})
   }
 })	
})

app.listen(8000,()=>{
	console.log("server is running at localhost:8000");
})