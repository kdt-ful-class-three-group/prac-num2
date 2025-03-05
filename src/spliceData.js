
// * queryData 나누기
function spliceData(data ,callback){
    // * query에서 '&' 분리
    let dataTrans = data.split('&');
    let charSave = [];
    dataTrans.forEach(element => {
        // * key와 value에서 '=' 분리
        let splitData = element.split('=')
        // * 16진수 URL 디코딩 및 value 값 추출하여 배열 저장
        charSave.push(decodeURIComponent(splitData[1]));
    });
    callback(charSave);
}

module.exports = spliceData;