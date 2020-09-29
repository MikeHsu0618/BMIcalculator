var btn = document.querySelector('.button');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('listData')) || [];


//監聽事件
btn.addEventListener('click', BMI,false);
list.addEventListener('click',toggleDone);

//初始化
updateList(data);



//定義各種函式
//定義計算BMI函式
function BMI(e) {
    
    var height = document.querySelector('#height').value;
    var weight = document.querySelector('#weight').value;
    var m = (height) / 100;
    var kg = weight;
    var BMI = (kg / (m * m)).toFixed(2);
    var status = "";
    var lightBar ="";
    //判斷是否輸入有效數值
    if (isNaN(BMI)) {
        alert('請輸入正確的數值!');
        return;
    } else if (height == '') {
        alert("您尚未輸入身高！");
        return;
    } else if (weight == '') {
        alert("您尚未輸入體重！");
        return;}

    //判斷BMI且跟改LI狀態，btn跟lightbar的顏色
    if(BMI<18.5){
        status = '過輕';
        lightBar = "#31BAF9";
        btn.setAttribute("class", "blue");
    }else if (18.5 <= BMI && BMI < 24) {
        status = '理想';
        lightBar = '#86D73F';
        btn.setAttribute("class", "green");
    } else if (24 <= BMI && BMI < 27) {
        status = '過重';
        lightBar = '#FF982D';
        btn.setAttribute("class", "orange1");
    } else if (27 <= BMI && BMI < 30) {
        status = '輕肥';
        lightBar = '#FF6C03';
        btn.setAttribute("class", "orange2");
    } else if (30 <= BMI && BMI < 35) {
        status = '中肥';
        lightBar = '#FF6C03';
        btn.setAttribute("class", "orange2");
    } else if (BMI >= 35) {
        status = '重肥';
        lightBar = '#FF1200';
        btn.setAttribute("class", "red");
        //在按鈕那改BMI狀態
    }
        // 計算日期跟時間
    var date = new Date();
    var MM = (date.getMonth() + 1);  // 從0開始 +1
    var DD = date.getDate();
    var YY = date.getFullYear();
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var time = YY + '-' + MM + '-' + DD + ' ' + hours + ':' + min + ':' + sec;

    //在按鈕那改BMI狀態
    document.querySelector('.value').textContent = BMI;
    document.querySelector('.bmi').textContent = 'BMI';

    // 組合成物件
    var bmiAll = {
        status: status,
        height: height,
        weight: weight,
        BMI: BMI,
        time: time,
        lightBar: lightBar
    }
    // 將資料物件 存入array
    data.push(bmiAll);
    // 將資料更新  
    updateList(data);
    //存到localstorage
    localStorage.setItem('listData',JSON.stringify(data));
    //算出BMI之後，把input欄位內的內容清空
    document.querySelector('#height').value = "";
    document.querySelector('#weight').value = "";
}

function updateList(item) {
    var str = "";
    var len = item.length;
    for (var i = 0; i < len; i++) {
       str +='<li><div class="lightbar" style = "background:' + item[i].lightBar + '"></div><div class="result" id="status">'+item[i].status+'</div><div class="BMIbox"><div class="subject">BMI</div><div class="result">'+item[i].BMI+'</div></div><div class="weightbox"><div class="subject">weight</div><div class="result">'+item[i].weight+'kg</div></div><div class="heightbox"><div class="subject">height</div><div class="result">'+item[i].height+'cm</div></div><div class="subject">'+item[i].time+'</div><img src="https://github.com/Jimmywei01/Pratice/blob/master/img.jpg?raw=true" alt="" data-index=' + i + '></li>';
    }
    list.innerHTML = str;
}

function toggleDone(event) {
    event.preventDefault();
    if(event.target.nodeName !== 'IMG') return;
    var index = event.target.dataset.index;
    data.splice(index, 1);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
}