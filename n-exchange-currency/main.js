//1. 박스 2개 만들기
//2. 드랍다운 리스트 만들기

//3. 환율정보 들고오기
let currencyRatio = {
  USD: {
    KRW: 1302.29,
    USD: 1,
    VND: 23725.0,
    unit: "달러",
  },
  KRW: {
    KRW: 1,
    USD: 0.00077,
    VND: 18.22,
    unit: "원",
  },
  VND: {
    VND: 1,
    KRW: 0.055,
    USD: 0.000042,
    unit: "동",
  },
};

var unitWords = ["","만","억","조","경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");

// 1. console.log(currencyRatio.USD.unit);
//console.log(currencyRatio['VND']["unit"]);

//4. 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
//클릭이벤트를 준다

let fromCurrency = "USD";
let toCurrency = "USD";

//from-currency-list 에 있는 a태그에 이벤트주기 //javascript : 그 HTML요소를 가져다가 동작하게 만들어줌 //document라는 객체는 우리가 HTML 파일에 태그들을 들고올수 있는 유용한 기능들을 제공
document.querySelectorAll("#from-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    // 각각에 이벤트 주기
    // menu를 불러와서 하나하나에 이벤트를 더해줘

    //1. 버튼을 가져온다. //2. 버튼의 값을 바꾼다.
    document.getElementById("from-button").textContent = this.textContent;

    //3. 선택된 currency값을 변수에 저장해준다.
    fromCurrency = this.textContent;
    console.log("fromCurrency는", fromCurrency);
    convert('from');
  })
);

// 2번째 박스
document.querySelectorAll("#to-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    document.getElementById("to-button").textContent = this.textContent;
    toCurrency = this.textContent;
    console.log("toCurrency는", toCurrency);
    convert('from');
  })
);
/* document.querySelectorAll("#to-currency-list li").forEach(function (item){
    item.addEventListener("click",function(){
      toCurrency = this.id;
      toButton.innerHTML = '<img class="flag-img" src="${currencyRatio[toCurrency].img}"/>${toCurrency}';
      convert("from");
    })
})
*/
//5. 금액입력하면 실시간으로 얼만지 보여주기
//6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 됨
//7. 숫자를 한국어로 읽는 법
//8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다.



//////////5~6번 //////////////
// 1. 드랍다운 리스트에 값이 바뀔때마다
// 2. 환전을 다시한다.

//1. 키를 입력하는 순간
//2. 환전이되서
//3. 환전된값이 보인다.

function convert(type){
  
   //1. 환전
   // 얼마를 환전? 가지고 있는 돈이 뭔지, 바꾸고자하는 돈이 뭔지
   // 돈 * 환율 = 환전금액

   let amount = 0;
  if(type=="from"){
   amount = document.getElementById("from-input").value ;// 입력된값 가져오기
   let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency] // 환전한 값
   document.getElementById('to-input').value = convertedAmount; // 환전한값 보여주기
   renderKoreanNumber(amount, convertedAmount); // 환전한값 한국어로 읽기
} else{ //to-input에서 값을 변경했을때
  amount = document.getElementById("to-input").value;
  let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency]
  document.getElementById("from-input").value = convertedAmount;
  renderKoreanNumber(convertedAmount, amount);
}
}

function renderKoreanNumber(from, to){
  document.getElementById("fromNumToKorea").textContent = readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent = readNum(to) + currencyRatio[toCurrency].unit;
}

function readNum(num){
  let resultString = "";
  let resultArray = [];
    for (let i=0; i < unitWords.length; i++){
      let unitResult =
         (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
         unitResult = Math.floor(unitResult);
           if(unitResult > 0 ){
             resultArray[i] = unitResult;
           }
        }
        for(let i=0; i < resultArray.length; i++){
          if(!resultArray[i]) continue;
          resultString = String(resultArray[i]) + unitWords[i] + resultString;
        }
        return resultString;
}

function meetAt(year,month,date){
  if(date){
    return `${year}/${month}/${date}`
  }else if(month){
    return `${year}년 ${month}월`
  }else if(year){
    return `${year}년`
  }
}

console.log(meetAt(2023,04,15))


function findSmallestElement(arr){

   console.log(arr)
   if(arr == 0){
    return 0;
   }

   let result = arr[0];
   for(let i=1; i<arr.length; i++){
     if(result > arr[i]){
        result = arr[i]
     }
   }
   return result;

}

console.log(findSmallestElement([289,65,823,41,25,39]))


let unit = [50000,10000,5000,1000,500,100];

function change(money){
  for(let i=0; i<unit.length; i++){
    let num = Math.floor( money / unit[i]);
    console.log(`${unit[i]} X ${num} = ${unit[i]*num}`)
    money = money - (unit[i]*num);
  }
}

change(62800);