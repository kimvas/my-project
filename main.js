// 1.랜덤 번호 지정
// 2.유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
// 3.만약 유저가 랜던번호를 맞추면, 맞췄습니다!
// 4.랜덤번호가 < 유저번호 Down!!!
//           >          Up!!!
// 5.Reset 버튼을 누르면 게임이 리셋된다
// 6.5번의 기회를 다 쓰면 게임이 끝난다 ( 더이상 추측 불가, 버튼이 disable)
// 7.유저가 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 8.유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.
// 9. 숫자입력한 곳에 다시 입력할때, 입력한 값 지워주기
// 10. 기회 5만 안에 정답을 맞췄을 때도, Go버튼을 disable 해주기


// 1.
let computerNum = 0;

function pickRandomNum(){
    computerNum = Math.floor(Math.random() *100)+1;// 랜덤한 숫자를 뽑는다. 0~1 사이의 랜덤 수
    // 100을 곱해준다.
    // +1 > 내가 원하는 범위는 1~100 인데, 컴퓨터는 0~99로 나오기 때문에 1을 더해준다
    console.log("정답"+computerNum)
}

pickRandomNum();

//2~4.
let playButton = document.getElementById('play-button');
let userInput= document.getElementById('user-input');
let resultArea = document.getElementById("result-area");

//6.

let chance = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");

playButton.addEventListener("click",play)

//9.
userInput.addEventListener("focus",function(){ //익명의 함수. 이곳에서만 사용될 함수 일때만 가능
    userInput.value = "";
})

let history = [];

function play(){
   let userValue = userInput.value; 

   if(userValue <1 && userValue > 100){
     resultArea.textContent ="1과 100사이의 숫자를 입력해 주세요."
     return; // return을 하지 않으면, 밑으로 내려가서 chance가 깍인다.
   }

   //8.
   if(history.includes(userValue)){
     resultArea.textContent ="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요"
     return;
   }
    
     chance --;
     chanceArea.textContent= `남은 기회 : ${chance}번`;

    if(userValue < computerNum){
        resultArea.textContent = "Up!!!"
        
    }else if(userValue > computerNum){
        resultArea.textContent = "Down!!!"
        
    }else{
        resultArea.textContent = "맞췄습니다!!!"
       //10.
        gameOver = true;
    }

    //8.
      history.push(userValue);

    if(chance < 1){
        resultArea.textContent="실패!!"
       gameOver = true;
    }

    if(gameOver == true){
        playButton.disabled = true;
    }
}

// 5.

let resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click",reset)

function reset(){
    // user input 창 깨끗하게 정리
    userInput.value = "";
    // 새로운 번호 생성
    pickRandomNum();

    resultArea.textContent = "결과값이 여기 나옵니다!"
}

