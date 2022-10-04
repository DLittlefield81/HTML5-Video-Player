window.addEventListener('load', function () {
    
    video = document.getElementById('video');
    playButton = document.getElementById('play-button');
    video.load();
    video.addEventListener('canplay', function () {
        playButton.addEventListener('click', playOrPause, false);
    }, false);
}, false);

function playOrPause() {
    if (video.paused) {
        video.play();
        playButton.src = './images/pause.svg'
    } else {
        video.pause();
        playButton.src = './images/play.svg'
    }
}