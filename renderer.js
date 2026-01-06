const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");

window.formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

function bindTrack(audio, playBtn, seek, time, vol, volText) {
  audio.addEventListener("loadedmetadata", () => {
    seek.max = Math.floor(audio.duration);
  });

  setInterval(() => {
    seek.value = Math.floor(audio.currentTime);
    time.textContent = window.formatTime(audio.currentTime);
  }, 300);

  playBtn.onclick = () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  };

  seek.oninput = () => {
    audio.currentTime = seek.value;
  };

  vol.oninput = () => {
    audio.volume = vol.value / 100;
    volText.textContent = vol.value;
  };
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
