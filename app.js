const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const spliceData = require('./src/spliceData.js');
const makeTextHTML = require('./src/literal.js');

const server = http.createServer(function(request, response){
    console.log("테스트 요청 방식 :",request.method);
    console.log("테스트 요청 URL :",request.url);
    // 테스트 요청 방식 : GET
    // 테스트 요청 URL : /

    if(request.method === 'GET'){
        
        if(request.url === '/' || request.url === '/index.html'){
            // 최초접속시도 확인
            console.log("최초접속시도");
            const data = fs.readFileSync("./index.html");
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}).end(data);
        }
        // * 404 페이지 테스트
        else{
            const data = fs.readFileSync("./page/404page.html");
            response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'}).end(data);
        }
    }
    
    if(request.method === 'POST'){
        if(request.url === '/yohoon'){
            // * request가 data가 들어오면 실행
            request.on('data',function(data){
                let getData = data.toString();
                
                // * decode 된 데이터 저장
                let charDecode;
                
                // * name과 value를 분리 -> 문자열 변환 후 '=' 기준으로 분리
                // * [0] = name , [1] = value
                // * callback => string 데이터를 변환(한글 가능)
                spliceData(getData, function(cutData){
                    charDecode = cutData;
                })
                
                // * 리터럴로 HTML 생성하여 값 받음
                let textHTML = makeTextHTML(charDecode)

                // * 파일 생성 : file, data, encode-type
                fs.writeFileSync('test.html',textHTML,'utf8');

                // * 파일 읽기 
                response.statusCode = 200; // OK
                response.setHeader('Content-Type', 'text/html; charset=utf-8');
                const createdData = fs.readFileSync("./test.html");
                response.write(createdData);
                response.end();
            })
        }
        
        // * 404 페이지 테스트
        else{
            const data = fs.readFileSync("./page/404page.html");
            response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'}).end(data);
        }
    }
})

server.listen(3030,function(){
    console.log("http://localhost:3030");
})