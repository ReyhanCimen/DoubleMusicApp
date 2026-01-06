const { ipcRenderer } = require('electron');
const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");

window.formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Update slider background based on progress
window.updateSliderBackground = (slider) => {
  const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, #E095C9 0%, #E095C9 ${value}%, transparent ${value}%, transparent 100%)`;
};

// Window controls
document.getElementById('minimize-btn').addEventListener('click', () => {
  ipcRenderer.send('minimize-window');
});

document.getElementById('close-btn').addEventListener('click', () => {
  ipcRenderer.send('close-window');
});

function bindTrack(audio, playBtn, seek, time, vol, volText) {
  audio.addEventListener("loadedmetadata", () => {
    seek.max = Math.floor(audio.duration);
    window.updateSliderBackground(seek);
  });

  setInterval(() => {
    seek.value = Math.floor(audio.currentTime);
    time.textContent = window.formatTime(audio.currentTime);
    window.updateSliderBackground(seek);
  }, 300);

  playBtn.onclick = () => {
    if (audio.paused) {
      audio.play();
      playBtn.src = "assets/durdur.png";
    } else {
      audio.pause();
      playBtn.src = "assets/baslat.png";
    }
  };

  seek.oninput = () => {
    audio.currentTime = seek.value;
    window.updateSliderBackground(seek);
  };

  vol.oninput = () => {
    audio.volume = vol.value / 100;
    volText.textContent = vol.value;
    window.updateSliderBackground(vol);
  };

  // Initialize volume slider background
  window.updateSliderBackground(vol);
}

bindTrack(
  a1,
  document.getElementById("play1"),
  document.getElementById("seek1"),
  document.getElementById("time1"),
  document.getElementById("vol1"),
  document.getElementById("v1val")
);

bindTrack(
  a2,
  document.getElementById("play2"),
  document.getElementById("seek2"),
  document.getElementById("time2"),
  document.getElementById("vol2"),
  document.getElementById("v2val")
);
