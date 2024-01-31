document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const transcriptionDiv = document.getElementById('transcription');
    let recognition;

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'ca-ES'; // Set to Catalan in Spain

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
                transcriptionDiv.textContent = '';
            }
        });
    } else {
        alert('Speech recognition is not supported in this browser.');
    }
});
