//stopwatch

const timer = document.getElementById("stopwatch");

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}

function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }

        if (sec < 10 || sec == 0) {
            sec = "0" + sec;
        }
        if (min < 10 || min == 0) {
            min = "0" + min;
        }

        timer.textContent = min + ":" + sec;

        setTimeout("timerCycle()", 1000);
    }
}

function resetTimer() {
    timer.textContent = "00:00";
    sec = 0;
    min = 0;
}