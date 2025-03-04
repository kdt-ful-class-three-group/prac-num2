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

                // * name과 value를 분리 -> 문자열 변환 후 '=' 기준으로 분리
                // * [0] = name , [1] = value
                let dataTrans = data.toString().split('=');
                // * 한글 사용시 16진수 표현
                console.log(dataTrans[1].toString());
                // * URL 인코딩 -> 16진수 변환
                const charDecode = decodeURIComponent(dataTrans[1]);
                console.log(charDecode);

                // * 리터럴로 HTML 표현
                let textHTML = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h1>${charDecode}</h1>
                </body>
                </html>`;

                // * 파일 생성 : file, data, encode-type
                fs.writeFileSync(`test.html`,textHTML,'utf8');

                // * 파일 읽기 
                response.statusCode = 200; // OK
                response.setHeader('Content-Type', 'text/html; charset=utf-8');
                const createdData = fs.readFileSync("./test.html");
                response.write(createdData);
                response.end();
            })
        }
    }
})

server.listen(3030,function(){
    console.log("http://localhost:3030");
})