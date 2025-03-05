// * 리터럴로 HTML 표현
function makeTextHTML(data){
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>${data[0]}</h1>
                <h1>${data[1]}</h1>
            </body>
            </html>`;

}
    
module.exports = makeTextHTML;