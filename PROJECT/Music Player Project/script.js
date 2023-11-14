'use strict';
const playlistButton = document.getElementById('playlist');
const playlistSongs = document.getElementById('playlist-songs');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const repeatButton = document.getElementById('repeat');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const shuffleButton = document.getElementById('shuffle');
const audio = document.getElementById('audio');
const songImage = document.getElementById('song-image');
const songName = document.getElementById('song-name');
const songArtist = document.getElementById('song-artist');
const currentTime = document.getElementById('current-time');
const maxDuration = document.getElementById('max-duration');
const progressBar = document.getElementById('progress-bar');
const playlistContainer = document.getElementById('playlist-container');
const closeButton = document.getElementById('close-button');

const currentProgress = document.getElementById('current-progress');

// Set up for songs
let start;

//Initialize loop = true

let loop = true;

const songsList = [
  {
    name: "Can't Let You Go",
    link: 'Ali Gatie - Can t Let You Go (Official).mp3',
    artist: 'Ali Gatie',
    image: `Images/${'Ali Gatie.jpeg'}`,
  },
  {
    name: 'On & On',
    link: 'Cartoon-On-On-feat.-Daniel-Levi.mp3',
    artist: 'Cartoon ft Daniel Levi',
    image: `Images/${'cartoon.jpg'}`,
  },
  {
    name: 'Lead the Way',
    link: 'Leeland - Lead the Way.mp3',
    artist: 'Leeland',
    image: `Images/${'Leedway.jpg'}`,
  },
  {
    name: 'Older',
    link: 'Sasha-Sloan-Older-Now-Whats-Next.mp3',
    artist: 'Sasha Sloan',
    image: `Images/${'Older.jpg'}`,
  },
  {
    name: 'Way Maker',
    link: 'Leeland - Way Maker.mp3',
    artist: 'Leeland',
    image: `Images/${'Way_Maker.jpg'}`,
  },
];

// Events Object
let events = {
  mouse: {
    click: 'click',
  },
  touch: {
    click: 'touchstart',
  },
};

let deviceType = '';
const isTouchDevice = () => {
  try {
    document.createEvent('TouchEvent');
    deviceType = 'touch';
    return true;
  } catch (e) {
    deviceType = 'mouse';
    return false;
  }
};

// Format time (convert ms to seconds, minutes and add 0)

const timeFormatter = timeInput => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? '0' + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? '0' + second : second;
  return `${minute}:${second}`;
};

//  Set Song

const setSong = arrayIndex => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = `Audio/${link}`;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  // songImage.src = `Images/${image}`;
  songImage.src = image;

  //display duration when metadata loads
  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
};
// play song

const playAudio = () => {
  audio.play();
  pauseButton.classList.remove('hide');
  playButton.classList.add('hide');
};

// repear button
repeatButton.addEventListener('click', () => {
  if (repeatButton.classList.contains('active')) {
    repeatButton.classList.remove('active');
    audio.loop = false;
    // console.log('repeat off');
  } else {
    repeatButton.classList.add('active');
    audio.loop = true;
    // console.log('repeat on');
  }
});

// Next song
const nextSong = () => {
  if (loop) {
    if (start == songsList.length - 1) {
      start = 0;
    } else {
      start += 1;
    }
    setSong(start);
    playAudio();
  } else {
    let startIndex = Math.floor(Math.random() * songsList.length);
    // console.log(startIndex);
    setSong(startIndex);
    playAudio();
  }
};

// Pause Song

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add('hide');
  playButton.classList.remove('hide');
};

//  Previous button
const previousSong = () => {
  if (start > 0) {
    pauseAudio();
    start -= 1;
  } else {
    start = songsList.length - 1;
  }
  setSong(start);
  playAudio();
};

//Next song when the current one end

audio.onended = () => {
  nextSong();
};

//Shuffle Song
shuffleButton.addEventListener('click', () => {
  if (shuffleButton.classList.contains('active')) {
    shuffleButton.classList.remove('active');
    loop = true;
    // console.log('shuffle Off');
  } else {
    shuffleButton.classList.add('active');
    loop = false;
    // console.log('shuffle On');
  }
});

// play button
playButton.addEventListener('click', playAudio);

//next button
nextButton.addEventListener('click', nextSong);

// Previous Button
prevButton.addEventListener('click', previousSong);

// Pause Button
pauseButton.addEventListener('click', pauseAudio);

//If user click on progress bar

isTouchDevice();
progressBar.addEventListener(events[deviceType].click, e => {
  // Start of progressBar
  let coordStart = progressBar.getBoundingClientRect().left;
  //mouse click position
  let coorEnd = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  let progress = (coorEnd - coordStart) / progressBar.offsetWidth;

  //Set width to progress
  currentProgress.style.width = progress * 100 + '%';

  //set time
  audio.currentTime = progress * audio.duration;

  //play
  audio.play();
  pauseButton.classList.remove('hide');
  playButton.classList.add('hide');
});

// update progressBar

setInterval(() => {
  currentTime.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + '%';
});

// Update time
audio.addEventListener('timeupdate', () => {
  currentTime.innerHTML = timeFormatter(audio.currentTime);
});

//Create playlist

const initializePlaylist = () => {
  for (let i in songsList) {
    playlistSongs.innerHTML += `<li class ='playlistSong' onclick='setSong(${i})'>
    <div class = 'playlist-image-container'> 
    <img src = '${songsList[i].image}'/>
    </div>
    <div class = 'playlist-song-details'> 
    <span id = 'playlist-song-name'>
    ${songsList[i].name}
    </span>
    <span id = 'playlist-song-artist-album'>
    ${songsList[i].artist}
    </span>
    </div>
    </li> `;
  }
  playAudio();
};

//display playlist

playlistButton.addEventListener('click', () => {
  playlistContainer.classList.remove('hide');
});

closeButton.addEventListener('click', () => {
  playlistContainer.classList.add('hide');
});

playlistSongs.addEventListener('click', initializePlaylist);

window.onload = () => {
  start = 0;
  setSong(start);
  initializePlaylist();
};
