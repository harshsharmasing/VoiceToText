document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("start-btn");
    const copyBtn = document.getElementById("copy-btn");
    const result = document.getElementById("result");
    const historyList = document.getElementById("history-list");
    const darkModeSwitch = document.getElementById("dark-mode-switch");
    const languageSelect = document.getElementById("language");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    languageSelect.addEventListener("change", () => {
        recognition.lang = languageSelect.value;
    });

    startBtn.addEventListener("click", () => {
        recognition.start();
        result.textContent = "Listening...";
    });

    recognition.addEventListener("result", (event) => {
        const speechResult = event.results[0][0].transcript;
        result.textContent = speechResult;
        copyBtn.style.display = 'inline-block';

        // Add the result to the history list
        const listItem = document.createElement("li");
        listItem.textContent = speechResult;
        historyList.appendChild(listItem);
    });

    recognition.addEventListener("speechend", () => {
        recognition.stop();
    });

    recognition.addEventListener("error", (event) => {
        result.textContent = 'Error occurred in recognition: ' + event.error;
    });

    copyBtn.addEventListener("click", () => {
        const textToCopy = result.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Text copied to clipboard');
        }).catch(err => {
            console.error('Error in copying text: ', err);
        });
    });

    darkModeSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        document.querySelector("header").classList.toggle("dark-mode");
        document.querySelector(".navbar").classList.toggle("dark-mode");
        document.querySelector(".notice").classList.toggle("dark-mode");
        document.querySelector(".container").classList.toggle("dark-mode");

        document.querySelectorAll(".history li").forEach((item) => {
            item.classList.toggle("dark-mode");
        });
    });
});
