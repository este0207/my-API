import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req,res)=>{
    // ex : public/index.html
    // ex : public/admin/dashboard.html
    const pathFile = "../front"+ (req.url == "/"? "/index.html" : req.url);
    console.log(pathFile);
    fs.readFile(pathFile).then(body=>{
        
        res.write(body);
    }).catch(error=>{
        console.log(error);

        res.statusCode = 404;

        res.write("Erreur : Fichier inconnu\n");
    }).finally(()=>{
        res.end();
    })

});

server.addListener("connection",(socket)=>{
    
    console.log(`Connection detecté ! `,socket.remoteAddress);
})

server.listen(3000,()=>{
    console.log("Server listen on http://0.0.0.0:3000");
});