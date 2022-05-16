
var qI = 0;
var clockId;
var time = 60;
var clock = document.getElementById('time');
var prompt = document.querySelector('#quiz');
var highScoreList = [];
var hsIndex = 0;
document.getElementById('start').addEventListener('click', handleClick);

var questions = [
    {
        Q: "Commonly used data types DO NOT include:",
        A: [ "strings", "booleans", "alerts", "numbers" ],
        C: "alerts"
    },
    {
        Q: "The condition in an if / else statement is enclosed within _____.",
        A: [ "quotes", "curly brackets", "parentheses", "square brackets" ],
        C: "parentheses"
    },
    {
        Q: "Arrays in JavaScript can be used to store _____.",
        A: [ "numbers and strings", "other arrays", "booleans", "all of the above" ],
        C: "all of the above"
    },
    {
        Q: "String values must be enclosed within _____ when being assigned to variables.",
        A: [ "commas", "curly brackets", "quotes", "parentheses" ],
        C: "quotes"
    },
    {
        Q: "A very useful tool used during development and debugging for printing content to the debugger is:",
        A: [ "JavaScript", "terminal/bash", "for loops", "console.log" ],
        C: "console.log"
    },
];

function handleClick() {
    handleQuestion();
    clockId = setInterval(countDown,1000);
};

function subtractTime(){
    time-=10;
}

function handleIncorrect(){
    subtractTime();
    handleQuestion();
}

function handleIncorrectLastQuestion(){
    subtractTime();
    endGame();
}

function handleQuestion() {

    let { Q,A,C } = questions[qI++];
    prompt.innerHTML = `<h1> ${Q} </h1>`;

    var answerList= document.createElement("div");
    answerList.setAttribute("class", "answerList");
    prompt.appendChild(answerList);
    
    var buttons = [];

    for(i=0; i<A.length; i++){

    var answerButton1= document.createElement("button");
    answerButton1.setAttribute("class", "answerButton");
    buttons[i]=answerButton1; 
    answerButton1.textContent=A[i];
    
    if (answerButton1.textContent === C) {
        if(qI == 5){
            answerButton1.addEventListener('click', endGame);
        }
        else{
        answerButton1.addEventListener('click', handleQuestion);
        }
        }
        else{
        if(qI == 5){
            answerButton1.addEventListener('click', handleIncorrectLastQuestion);
        }
        else{
        answerButton1.addEventListener('click', handleIncorrect);
        }
    }
    
    answerList.appendChild(answerButton1);
    }
    
}

function wrongAnswer() {
    let { Q,A,C } = questions[1];
    
    prompt.innerHTML = `<h1> ${Q} </h1>`;
    var answerList= document.createElement("div");
    answerList.setAttribute("class", "answerList");
    prompt.appendChild(answerList);
}

function countDown() {
    time--;
    clock.innerHTML = time;
    
    if(time <1 ) endGame();
};

function endGame() {
    highScoreList[hsIndex++] = time;
    highScoreList.sort();
    highScoreList.reverse();
    createScorelist();
    clearInterval(clockId);
    time = 0;
    clock.innerHTML = time;
}

function createScorelist() {
    prompt.innerHTML = `<h1>High Score</h1>`;
    var orderedList = document.createElement("OL");
    orderedList.setAttribute("id", "myOl");
    document.body.appendChild(orderedList);
    for(i = 0; i < highScoreList.length;i++){
    var li = document.createElement("LI");
    var t = document.createTextNode(highScoreList[i].toString());
    li.appendChild(t);
    document.getElementById("myOl").appendChild(li);
    }
}