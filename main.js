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


let randomNum ;
let userNum = document.getElementById('user-num');
let playButton = document.getElementById("play-button");
let answerArea = document.getElementById("answer-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.querySelector(".chance-area");
let chance = 5;
let gameOver = false;
let history =[];

playButton.addEventListener("click",Go);
resetButton.addEventListener("click",reset);
userNum.addEventListener("focus",function(){
    userNum.value="";
})

function random(){
    randomNum = Math.floor(Math.random()*100)+1;
    console.log(randomNum);
}


function Go(){
  
    let userValue = userNum.value;

    if(userValue < 1 || userValue >100){
        answerArea.textContent = "1~100 사이의 숫자를 입력하세요!"
        return;
    }

    if(history.includes(userValue)){
        answerArea.textContent="이미 입력한 숫자입니다. 다시 입력하세요!"
        return;
    }
    
    chance --;
    chanceArea.textContent=`남은 기회 : ${chance}번`

   if(randomNum == userValue){
     answerArea.textContent = "딩동댕!"
     gameOver= true;
   }else if(randomNum < userValue){
     answerArea.textContent = "Down!!!"
   }else if(randomNum > userValue){
     answerArea.textContent="Up!!!"
   }

   history.push(userValue);
   

   if(chance == 0){
     gameOver = true;
   }

   if(gameOver == true){
    playButton.disabled = true;
   }
}

function reset(){
    userNum.value="";
    random();
}



random();