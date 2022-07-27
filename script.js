let userScore = 0;


let audio = new Audio("./sound/bgm.mp3");
document.body.addEventListener("click", playMenuMusic);

function playMenuMusic() {
    audio.play();
}

audio.loop = true;
audio.volume = 0.05;


document.getElementsByClassName('btn-start')[0].addEventListener('click', function () {
    document.getElementsByClassName('div-start')[0].style.display = 'none';
    document.getElementsByClassName('div-game')[0].style.display = 'flex';
    loadQuestion(questionArr[0]);
    audio.pause();
    audio = new Audio("./sound/bgm.mp3");
    document.body.removeEventListener("click", playMenuMusic);
    audio.play();
    audio.loop = true;
    audio.volume = 0.1;
    setTimeout(function () {
        startTimer();
    }, 1000);
})



function checkAnswer(questionId, answer) {
    if (answer.true == true) {
        if (questionArr.length > questionId) {
            loadQuestion(questionArr[questionId]);
        } else {
            stopTimer();
            userScore += parseInt(document.getElementsByClassName('span-score-current')[0].textContent);

            let finalDiv = document.createElement('div');
            finalDiv.className = 'final-text-div';
            document.getElementsByClassName('div-game')[0].style.display = 'none';
            document.getElementsByClassName('div-finish')[0].style.display = 'flex';
            let scoreText = document.createElement('h2');
            let finalScore = document.createElement('span');
            let ponchiki = document.createElement('span');
            let congratulations = document.createElement('h2');
            ponchiki.textContent = " Coins";
            finalScore.className = 'final-score';
            finalScore.textContent = userScore.toString();
            congratulations.textContent = "Congratulations!";
            scoreText.textContent = "You finished the game with: ";
            scoreText.appendChild(finalScore);
            scoreText.appendChild(ponchiki);
            finalDiv.appendChild(congratulations);
            finalDiv.appendChild(scoreText);
            let timerText = document.createElement('h2');
            timerText.textContent = "" + document.getElementById('stopwatch').textContent;
            finalDiv.appendChild(timerText);
            let restartButton2 = document.createElement('button');
            restartButton2.className = 'btn-restart';
            restartButton2.textContent = 'Play Again!';
            restartButton2.addEventListener('click', function () {
                location.reload();
            })
            restartButton2.style.filter = "grayscale(100%)";
            finalDiv.appendChild(restartButton2);
            document.getElementsByClassName('div-finish-right')[0].appendChild(finalDiv);

            audio.pause();
            audio = new Audio("./sound/applause.mp3");
            audio.play();
            audio.loop = false;
            audio.volume = 0.2;
        }
    } else {
        userScore = 0;
        document.getElementsByClassName('span-score')[0].textContent = userScore;
        document.getElementsByClassName('question-div')[0].textContent = 'Wrong Answer!';
        document.getElementsByClassName('question-div')[0].style.color = 'red';
        document.getElementsByClassName('question-div')[0].style.fontSize = '2vw';
        document.getElementsByClassName('question-div')[0].style.width = '100%';
        document.getElementsByClassName('question-div')[0].style.textAlign = 'center';
        document.getElementsByClassName('question-div')[0].style.marginTop = '2vw';
        document.getElementsByClassName('answer-div')[0].textContent = '';
        let restartButton = document.createElement('button');
        restartButton.className = 'btn-restart';
        restartButton.textContent = 'Try Again!';
        restartButton.addEventListener('click', function () {
            location.reload();
        })
        document.getElementsByClassName('question-div')[0].appendChild(restartButton);

        audio.pause();
        audio = new Audio("./sound/fail.mp3");
        audio.play();
        audio.loop = false;
        audio.volume = 0.2;

    }
}

function loadQuestion(questionObject) {
    userScore += parseInt(document.getElementsByClassName('span-score-current')[0].textContent);

    document.getElementsByClassName('question-div')[0].textContent = '';
    document.getElementsByClassName('answer-div')[0].textContent = '';

    document.getElementsByClassName('span-question')[0].textContent = questionObject.id + "/" + questionArr.length;
    document.getElementsByClassName('span-score-current')[0].textContent = questionObject.point;
    document.getElementsByClassName('span-score')[0].textContent = userScore;

    let img = "./imgs/" + questionObject.id + ".jpg";
    document.getElementsByClassName('question-image')[0].src = img;

    let answer1Element = document.createElement('button');
    let answer2Element = document.createElement('button');
    let answer3Element = document.createElement('button');
    let answer4Element = document.createElement('button');
    answer1Element.className = 'btn-answer';
    answer2Element.className = 'btn-answer';
    answer3Element.className = 'btn-answer';
    answer4Element.className = 'btn-answer';
    answer1Element.textContent = questionObject.answer1.text;
    answer2Element.textContent = questionObject.answer2.text;
    answer3Element.textContent = questionObject.answer3.text;
    answer4Element.textContent = questionObject.answer4.text;


    let question = document.createElement('h2');
    question.className = 'question';
    question.textContent = questionObject.question;

    document.getElementsByClassName('question-div')[0].appendChild(question);

    answer1Element.addEventListener('click', function () {
        checkAnswer(questionObject.id, questionObject.answer1);
    });
    answer2Element.addEventListener('click', function () {
        checkAnswer(questionObject.id, questionObject.answer2);
    });
    answer3Element.addEventListener('click', function () {
        checkAnswer(questionObject.id, questionObject.answer3);
    });
    answer4Element.addEventListener('click', function () {
        checkAnswer(questionObject.id, questionObject.answer4);
    });

    document.getElementsByClassName('answer-div')[0].appendChild(answer1Element);
    document.getElementsByClassName('answer-div')[0].appendChild(answer2Element);
    document.getElementsByClassName('answer-div')[0].appendChild(answer3Element);
    document.getElementsByClassName('answer-div')[0].appendChild(answer4Element);

}