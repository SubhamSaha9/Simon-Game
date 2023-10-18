let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purple"];

let level = 0;
let maxScore = 0;
let started = false;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
document.addEventListener("keypress", () => {
    if (started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }
});
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 1000);
}
function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    }, 400);
}
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length == userSeq.length) {
            setTimeout(levelUp, 1500);
        }
    } else {
        // document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "red";
        }, 100);
        setTimeout(() => {
            h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to restart the game`;
            document.querySelector("body").style.backgroundColor = "white";
            reset();
        }, 300);
        maxScore = Math.max(maxScore, level);
        h3.innerHTML = `Heighest score is <b>${maxScore}</b>`;
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}