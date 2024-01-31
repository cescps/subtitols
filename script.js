document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const transcriptionDiv = document.getElementById('transcription');
    let recognition;

    // Check if the browser supports the Web Speech API
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = function (event) {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('\n');

            transcriptionDiv.textContent = transcript;
        };

        recognition.onend = function () {
            startButton.disabled = false;
            startButton.textContent = 'Start Transcription';
        };

        startButton.addEventListener('click', function () {
            if (recognition && recognition.active) {
                recognition.stop();
                startButton.textContent = 'Start Transcription';
            } else {
                recognition.start();
                startButton.textContent = 'Stop Transcription';
                startButton.disabled = true;
                transcriptionDiv.textContent = ''; // Clear previous transcriptions
            }
        });
    } else {
        alert('Speech recognition is not supported in this browser.');
    }
});
