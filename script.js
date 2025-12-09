const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const seek = document.getElementById('seek');
const volume = document.getElementById('volume');

// Play/Pause
playPause.addEventListener('click', () => {
  if(audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  playPause.textContent = 'Pause';
});

audio.addEventListener('pause', () => {
  playPause.textContent = 'Play';
});

// Update time
audio.addEventListener('timeupdate', () => {
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

  seek.value = audio.currentTime;
});

audio.addEventListener('loadedmetadata', () => {
  const durationMinutes = Math.floor(audio.duration / 60);
  const durationSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  seek.max = audio.duration;
});

// Seek
seek.addEventListener('input', () => {
  audio.currentTime = seek.value;
});

// Volume
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Autoplay attempt
window.addEventListener('load', () => {
  audio.play().catch(() => {
    console.log("Autoplay blocked by browser.");
  });
});
