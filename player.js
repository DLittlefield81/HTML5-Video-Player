window.addEventListener('load', function () {
    //video container
    video = document.getElementById('video');

    // Progress Bar Container
    pbarContainer = document.getElementById('pbar-container');
    pbar = document.getElementById('pbar');

    // Buttons Container
    playButton = document.getElementById('play-button');
    timeField = document.getElementById('time-field');

    video.load();
    video.addEventListener('canplay', function () {

        playButton.addEventListener('click', playOrPause, false);
        pbarContainer.addEventListener('click', skip, false);
        updatePlayer();
        
    }, false);

}, false);

function playOrPause() {
    if (video.paused) {
        video.play();
        playButton.src = './images/pause.svg'
        update = setInterval(updatePlayer, 30);
    } else {
        video.pause();
        playButton.src = './images/play.svg'
        window.clearInterval(update);
    }
}

function updatePlayer() {
    var percentage = (video.currentTime / video.duration) * 100;
    pbar.style.width = percentage + '%';
    timeField.innerHTML = getFormattedTime()
    if (video.ended) {
        window.clearInterval(update);
        playButton.src = './images/replay.svg'
    }
}
function skip(ev) {
    var mouseX = ev.pageX - pbarContainer.Offset.Left;
    var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
    width = parseFloat(width.substr(0, width.length - 2));
    video.currentTime = (mouseX / width) * video.duration;
    updatePlayer();

}
function getFormattedTime() {
    var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds / 60);
    if (minutes > 0) seconds -= minutes * 60;
    if (seconds.toString().length === 1) seconds = '0' + seconds;

    var totalSeconds = Math.round(video.duration);
    var totalMinutes = Math.floor(totalSeconds / 60);
    if (totalMinutes > 0) totalSeconds -= totalMinutes * 60;
    if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

    return minutes + ":" + seconds + ' / ' + totalMinutes +':'+ totalSeconds;
}