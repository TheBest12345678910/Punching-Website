let interval;

const punchVideos = [
  "./media/Punch_1.mp4",
  "./media/Punch_2.mp4",
  "./media/Punch_3.mp4",
  "./media/Punch_4.mp4",
  "./media/Punch_5.mp4"
];


function startTimer() {
  startCountdownFromSeconds(maxSecondsFromInputs());
}

function stopTimer() {
  clearInterval(interval);
  const container = document.querySelector('.timer-container');
  container.classList.remove('running');
  container.classList.add('stopped');
}




function startRandomTimer(maxSeconds) {
  // Generate a random integer between 0 and maxSeconds (inclusive)
  const randomTime = Math.floor(Math.random() * (maxSeconds + 1));
  console.log(`Random timer set for ${randomTime} seconds`);

  // Start a countdown from the random time
  startCountdownFromSeconds(randomTime);
}

function startCountdownFromSeconds(totalSeconds) {
  clearInterval(interval); // Clear any existing timer

  const container = document.querySelector('.timer-container');
  container.classList.remove('stopped', 'default', 'hidden');
  container.classList.add('running');
  container.style.removeProperty('display'); // clear any inline display style

  function updateDisplay() {
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;
    document.getElementById("display").textContent =
      String(mins).padStart(2, '0') + ":" + String(secs).padStart(2, '0');
  }

  updateDisplay(); // Initial display

  interval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(interval);
      container.classList.remove('running', 'stopped');
      container.classList.add('default', 'hidden'); // hide timer container
      // container.style.display = "none"; // no longer needed

      const video = document.createElement("video");
      video.src = punchVideos[Math.floor(Math.random() * punchVideos.length)];
      video.width = 800;
      video.height = 450;
      video.autoplay = true;
      video.muted = true;
      video.controls = true;
      video.style.display = "block";
      video.style.margin = "2rem auto";
      video.style.borderRadius = "16px";
      video.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
      
      document.body.appendChild(video);

      video.addEventListener('ended', () => {
        console.log("Video finished!");
        document.body.removeChild(video);
        startRandomTimer(maxSecondsFromInputs());
      });

    } else {
      totalSeconds--;
      updateDisplay();
    }
  }, 1000);
}



function maxSecondsFromInputs() {
  let minutes = parseInt(document.getElementById("minutes").value) || 0;
  let seconds = parseInt(document.getElementById("seconds").value) || 0;
  console.log(`Input minutes: ${minutes}, seconds: ${seconds}`);

  return minutes * 60 + seconds;
}
