let msg = document.getElementById("msg");
let typeWords = document.getElementById("mywords");
let btn = document.getElementById("btn");
let modeSelect = document.getElementById("modeSelect");
let timerInput = document.getElementById("timerInput");
let timerValue = document.getElementById("timerValue");
let startTime, endTime;
let response;
let timerInterval; // Variable to hold the timer interval
let totalTime; // Total time in seconds

modeSelect.addEventListener("change", function () {
    // Clear the message when a new mode is selected
    msg.innerText = ""; // Clear any existing message

    // Enable timer input when a mode is selected
    if (this.value) {
        timerInput.disabled = false;
        timerInput.focus();
    } else {
        timerInput.disabled = true;
        btn.disabled = true;
    }
});

timerInput.addEventListener("input", function () {
    // Enable the start button when there's valid input
    if (this.value && modeSelect.value) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
});

let playGame = () => {
    let date = new Date();
    startTime = date.getTime();
    btn.innerText = "Done";
    typeWords.disabled = false; // Enable the input field
    typeWords.focus();
    msg.innerText = ""; // Clear the message

    // Set totalTime based on the selected mode and user input
    totalTime = parseInt(timerInput.value) * 60; // Convert minutes to seconds

    // Start the timer countdown
    startTimer();
};

let startTimer = () => {
    let timeLeft = totalTime; // Initialize timeLeft

    // Adjust timer speed based on mode
    let timerSpeed; // Variable to hold the speed of the timer

    if (modeSelect.value === "easy") {
        timerSpeed = 1000; // 1 second for easy mode
    } else if (modeSelect.value === "medium") {
        timerSpeed = 500; // 0.5 seconds for medium mode
    } else if (modeSelect.value === "hard") {
        timerSpeed = 250; // 0.25 seconds for hard mode
    }

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endPlay(); // Automatically end the game when time runs out
        }
    }, timerSpeed); // Set interval based on the selected mode
};

let updateTimerDisplay = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerValue.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format timer display
};

let wordCounter = (str) => {
    response = str.split(" ").length;
    return response;
};

let endPlay = () => {
    clearInterval(timerInterval); // Clear the timer interval
    let date = new Date();
    endTime = date.getTime();
    let totalTimeSpent = (endTime - startTime) / 1000; // Calculate total time spent in seconds
    let totalStr = typeWords.value; // Get the typed text
    let wordCount = wordCounter(totalStr); // Count the words typed
    let speed = Math.round((wordCount / totalTimeSpent) * 60); // Calculate typing speed in words per minute

    // Create a message based on the selected mode
    let modeMessage;
    if (modeSelect.value === "easy") {
        modeMessage = "You chose Easy mode. ";
    } else if (modeSelect.value === "medium") {
        modeMessage = "You chose Medium mode. ";
    } else if (modeSelect.value === "hard") {
        modeMessage = "You chose Hard mode. ";
    }

    // Final message displaying word count and typing speed
    let finalMsg = `${modeMessage}Total words typed: ${wordCount}. Your typing speed is ${speed} words per minute.`;
    msg.innerText = finalMsg; // Show the final message

    // Clear input field and reset the button
    typeWords.value = "";
    typeWords.disabled = true;
    btn.innerText = "Start";
    btn.disabled = true; // Disable the button again
    timerInput.value = ""; // Clear the timer input
    timerInput.disabled = true; // Disable timer input
    modeSelect.selectedIndex = 0; // Reset mode selection
    updateTimerDisplay(0); // Reset timer display
};

btn.addEventListener("click", function () {
    if (this.innerText === "Start") {
        playGame();
    } else if (this.innerText === "Done") {
        endPlay();
    }
});
