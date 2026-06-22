// Global state
let musicData = [];
let currentSongIndex = 0;
let audio = null;

// Initialize - load data only
async function initializeMusicPlayer() {
    try {
        const response = await fetch('assets/scripts/musics.json');
        musicData = await response.json();
        console.log('Music data loaded:', musicData);
        // Re-render initial view
        renderMusicDisc();
    } catch (err) {
        console.error('Failed to load musics.json:', err);
    }
}

document.addEventListener('click', (e) => {
    const musicPlayer = e.target.closest('.music-player');
    if (!musicPlayer) return;

    const diskBtn = e.target.closest('.music-icons.disk');
    const playlistBtn = e.target.closest('.music-icons.playlists');
    const playBtn = e.target.closest('.music-icons.play');
    const stopBtn = e.target.closest('.music-icons.stop');
    const forwardBtn = e.target.closest('.music-icons.forward');
    const rewindBtn = e.target.closest('.music-icons.rewind');
    const chooseSongBtn = e.target.closest('.song-play-btn');
    const progressBar = e.target.closest('.progress-bar');
    const loopBtn = e.target.closest('.music-icons.loop');
    const songTitle = document.querySelector('.song-title');

    if (diskBtn && !diskBtn.classList.contains('select-state-active')) {
        musicPlayer.querySelector('.music-icons.playlists')?.classList.remove('select-state-active');
        diskBtn.classList.add('select-state-active');
        renderMusicDisc();
    } else if (playlistBtn && !playlistBtn.classList.contains('select-state-active')) {
        musicPlayer.querySelector('.music-icons.disk')?.classList.remove('select-state-active');
        playlistBtn.classList.add('select-state-active');
        renderMusicPlaylist();
    } else if (playBtn) {
        togglePlay();
    } else if (stopBtn) {
        toggleStop();
    } else if (forwardBtn) {
        toggleNextSong();
    } else if (rewindBtn) {
        toggleRewindSong();
    } else if (chooseSongBtn) {
        const index = chooseSongBtn.closest('.pick-music')?.dataset.songIndex;
        toggleChooseSong(parseInt(index));
    } else if (loopBtn) {
        toggleLoop();
    } else if (progressBar && audio) {
        const rect = progressBar.getBoundingClientRect();
        const clickPercent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = clickPercent * (audio.duration || 0);
    }
});

function setupAudioEvents() {
    if (audio) {
        audio.addEventListener('timeupdate', updateProgressBar);
        audio.addEventListener('loadedmetadata', () => {
            console.log('Metadata loaded, duration:', audio.duration);
            updateProgressBar();
        });
        audio.addEventListener('ended', () => {
            toggleNextSong();
        });
    }
}

function updateSongTitle() {
    const songTitle = document.querySelector('.song-title');
    if (songTitle) {
        songTitle.textContent = musicData[currentSongIndex]?.name || 'Unknown Song';
    }
}

function togglePlay() {
    if (!audio) {
        const currentSong = musicData[currentSongIndex];
        if (currentSong) {
            audio = new Audio(currentSong.fileLocation);
            setupAudioEvents();
            audio.play().catch(err => console.error('Play failed:', err));
            updatePlayIcon(true);
            updateDisk(); // Call to refresh display
            updateSongTitle();
        }
    } else if (audio.paused) {
        audio.play().catch(err => console.error('Play failed:', err));
        updatePlayIcon(true);
    } else {
        audio.pause();
        updatePlayIcon(false);
    }
}

function toggleStop() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        updatePlayIcon(false);
        updateProgressBar();
    }
}

function updatePlayIcon(isPlaying) {
    const playImg = document.querySelector('.music-icons.play img');
    if (playImg) {
        playImg.src = isPlaying ? 'assets/img/act2/icons/pause-circle-fill.svg' : 'assets/img/act2/icons/play-circle-fill.svg';
    }
}

function toggleNextSong() {
    toggleStop();
    currentSongIndex = (currentSongIndex + 1) % musicData.length;
    playCurrentSong();
}

function toggleRewindSong() {
    toggleStop();
    currentSongIndex = (currentSongIndex - 1 + musicData.length) % musicData.length;
    playCurrentSong();
}

function toggleChooseSong(index) {
    if (!isNaN(index) && index >= 0 && index < musicData.length) {
        currentSongIndex = index;
    }
    playCurrentSong();
    updatePlayIcon(true);
}

function toggleLoop() {
    if (audio) {
        audio.loop = !audio.loop;
        const loopImg = document.querySelector('.music-icons.loop img');
        if (loopImg) {
            loopImg.classList.toggle('active-loop', audio.loop);
        }
    }
}

function playCurrentSong() {
    const currentSong = musicData[currentSongIndex];
    if (currentSong) {
        audio = new Audio(currentSong.fileLocation);
        setupAudioEvents();
        audio.play().catch(err => console.error('Play failed:', err));   
        updateDisk();
        updatePlayIcon(true);
        updateSongTitle();
    }
    
}

function updateDisk() {
    renderMusicDisc();
}

function updateProgressBar() {
    if (audio && !isNaN(audio.duration) && audio.duration > 0) {
        const progressBars = document.querySelectorAll('.progress-bar');
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBars.forEach(bar => {
            bar.value = progressPercent;
            bar.style.backgroundColor = `linear-gradient(to right, #ffbf00 ${progressPercent}%, transparent ${progressPercent}%)`;
        });
    }
}

function renderMusicDisc() {
    const musicPlayer = document.querySelector('.music-player');
    const currentSong = musicData[currentSongIndex] || {name: 'Unknown', author: 'Unknown'};
    if (musicPlayer) {
        musicPlayer.innerHTML = `
            <div class="change-music">
                <button class="music-icons disk select-state-active"><img src="assets/img/act2/icons/disc-fill.svg" alt="Disc"></button> 
                <button class="music-icons playlists"><img src="assets/img/act2/icons/play-list-fill.svg" alt="Playlist"></button>
            </div>
            <hr>
            <div class="vinyl-record">
                <img src="${currentSong.imageLocation || 'assets/img/act1/vinyl.png'}" alt="Vinyl">
            </div>
            <div class="about-record">
                <h4><span>${currentSong.name}</span></h4>
                <p>${currentSong.author}</p>
                <input type="range" class="progress-bar" min="0" max="100" value="0">
            </div>
            <div class="button-record">
                <button class="music-icons stop"><img src="assets/img/act2/icons/stop-fill.svg" alt="Stop"></button>
                <button class="music-icons rewind"><img src="assets/img/act2/icons/rewind-fill.svg" alt="Rewind"></button>
                <button class="music-icons play" id="play"><img src="assets/img/act2/icons/play-circle-fill.svg" alt="Play"></button>
                <button class="music-icons forward"><img src="assets/img/act2/icons/speed-fill.svg" alt="Forward"></button>
                <button class="music-icons loop"><img src="assets/img/act2/icons/repeat-line.svg" alt="Loop"></button>
            </div>
        `;
    }
}

function renderMusicPlaylist() {
    const musicPlayer = document.querySelector('.music-player');
    if (musicPlayer) {
        musicPlayer.innerHTML = `
            <div class="change-music">
                <button class="music-icons disk"><img src="assets/img/act2/icons/disc-fill.svg" alt="Disc"></button> 
                <button class="music-icons playlists select-state-active"><img src="assets/img/act2/icons/play-list-fill.svg" alt="Playlist"></button>
            </div>
            <hr>
            <div class="choose-music">
                <div class="music-selection">
                    <div class="pick-music-description">
                        <h2>The Velvet Mix</h2>
                        ${musicData.map((song, index) => `
                            <div class="pick-music" data-song-index="${index}">
                                <div>
                                    <p> ${String(index + 1).padStart(2, '0')} </p>
                                    <div>
                                        <h4>${song.name}</h4>
                                        <p>${song.author}</p>
                                    </div>
                                </div>
                                <button class="song-play-btn"><img src="assets/img/act2/icons/play-circle-fill.svg" alt="Play song"></button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

