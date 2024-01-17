const music = document.querySelector("audio");
const play = document.getElementById("play");
const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let duration_time = document.getElementById("duration");
let current = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

const songs = [
    {
        name: "1",
        title: "BESABRIYAAN",
        artist: "Armaan Malik",
    },
    {
        name: "2",
        title: "Kaise Hua",
        artist: "Vishal Mishra",
    },
    {
        name: "3",
        title: "Tera Zikr",
        artist: "Darshan Raval",
    },
    {
        name: "4",
        title: "Chaleya",
        artist: "Arijit Singh,Shilpa Rao",
    },
    {
        name: "5",
        title: "Heeriye",
        artist: "Jasleen Royal,Arijit Singh",
    },
    {
        name: "6",
        title: "Phir Kabhi",
        artist: "Arijit Singh",
    },
    {
        name: "7",
        title: "Maan Meri Jaan",
        artist: "King",
    },
    {
        name: "8",
        title: "Judaiyaan",
        artist: "Tanveer Evan",
    },
    {
        name: "9",
        title: "Janiye",
        artist: "Vishal Mishra",
    },
    {
        name: "10",
        title: "Apna Bana Le",
        artist: "Arijit Singh,Sachin–Jigar",
    }, 
   {
        name: "11",
        title: "Bekhayali",
        artist: "Sachet Tandon",
    },
    {
        name: "12",
        title: "Ilahi",
        artist: "Pritam, Arijit Singh",
    },
    {
        name: "13",
        title: "Choo Lo",
        artist: "The Local Train",
    },
    {
        name: "14",
        title: "Ae Dil Hai Mushkil",
        artist: "Pritam, Arijit Singh",
    },            
];

let isPlaying = false;

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};

play.addEventListener('click', () => {
    /* if (isPlaying) {
         pauseMusic();
     } else {
         playMusic();
     } */

    isPlaying ? pauseMusic() : playMusic();
});

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "songs/"+songs.name + ".mp3";
    img.src = "covers/"+songs.name + ".jpg";
};

songIndex = 0;

//  loadSong(songs);

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

music.addEventListener("timeupdate", (events) => {
    const { currentTime, duration } = events.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    //duration update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    if (sec_duration < 10) {
        sec_duration = `0${sec_duration}`;
    }

    let total_duration = `${min_duration}:${sec_duration}`;

    if (duration) {
        duration_time.textContent = `${total_duration}`;
    }

    //current time update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }

    let total_currentTime = `${min_currentTime}:${sec_currentTime}`;

    current.textContent = `${total_currentTime}`;

});

progress_div.addEventListener("click", (events) => {
    const { duration } = music;

    let move_progress = (events.offsetX / events.srcElement.clientWidth) * duration;

    music.currentTime = move_progress;
});

music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);