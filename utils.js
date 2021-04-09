const fs = require("fs")

const writeFile = (filename, data)=>{
    fs.writeFileSync(filename, JSON.stringify(data), 'utf-8', (err)=>{
        if(err){
            console.log(err);
        }
    })
}

const getPostData = (req)=>{
    return new Promise((res,rej)=>{
        let body = "";
        try {
            req.on('data', (chunk)=>{
                body += chunk.toString()
            })
            req.on('end', ()=>{
                res(body)
            })
        } catch (error) {
            rej(error)
        }
    })
}


module.exports={
    writeFile,
    getPostData
}