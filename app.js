const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const { Buffer } = require('node:buffer');


const server = http.createServer(function(request, response){
    console.log("테스트 요청 방식 :",request.method);
    console.log("테스트 요청 URL :",request.url);
    // 테스트 요청 방식 : GET
    // 테스트 요청 URL : /

    if(request.method === 'GET'){
        if(request.url === '/'){
            // 최초접속시도 확인
            console.log("최초접속시도");

            response.statusCode = 200; // OK
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            const data = fs.readFileSync("./index.html");
            response.write(data);
            response.end();
        }
    }
    if(request.method === 'POST'){
        if(request.url === '/yohoon'){
            // * request가 data가 들어오면 실행
            request.on('data',function(data){

                // console.log(data.toString('utf8',0,20));
                // const buf1 = Buffer.from(data.toString(),'utf8');
                // console.log(buf1.toString());
                // console.log(data.toString());   
                // const dataGet = data.toString('utf8');
                // * name과 value를 분리 -> 문자열 변환 후 '=' 기준으로 분리
                // let dataTrans = data.toString().split('=');
                // console.log(dataTrans[1].toString());
                
                let decoder = new TextDecoder();
                let str = decoder.decode(data,'utf8');
                console.log(str);

                // let textHTML = `<!DOCTYPE html>
                // <html lang="en">
                // <head>
                //     <meta charset="UTF-8">
                //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
                //     <title>Document</title>
                // </head>
                // <body>
                //     <h1>${dataTrans[1].toString()}</h1>
                // </body>
                // </html>`;

                // fs.writeFileSync(`test.html`,textHTML,'utf8');
            })
        }
    }
})

server.listen(3030,function(){
    console.log("http://localhost:3030");
})