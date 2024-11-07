

const music = new Audio('Stand Here Alone - Wanita Masih Banyak _ Lirik Lagu.mp3');

//create Array

const song = [
{
    id:'1',
    songName:`Wanita Masih Banyak <br>
    <div class="subtitle">Stand Here Alone</div>`,
    poster:"img/img 1.jpg"
},
{
    id:'2',
    songName:`Bulan & Ksatria <br>
    <div class="subtitle">Superman is Dead</div>`,
    poster:"img/img 2.jpg"
},
{
    id:'3',
    songName:`Introvert <br>
    <div class="subtitle">Stand Her Alone</div>`,
    poster:"img/img 3.jpg"
},
{
    id:'4',
    songName:` Arjuna <br>
    <div class="subtitle">Dewa 19</div>`,
    poster:"img/img 4.jpg"
},
{
    id:'5',
    songName:` Diary Depresiku <br>
    <div class="subtitle">Last Child</div>`,
    poster:"img/img 5.jpg"
},
{
    id:'6',
    songName:` Aku Yang Tersakit<br>
    <div class="subtitle">Judika</div>`,
    poster:"img/img 6.jpg"
},
{
    id:'7',
    songName:`Angin <br>
    <div class="subtitle">Dewa 19</div>`,
    poster:"img/img 7.jpg"
},
{
    id:'8',
    songName:`Dendalions <br>
    <div class="subtitle">Ruth B</div>`,
    poster:"img/img 8.jpg"
},
{
    id:'9',
    songName:`  Dia Masa Lalu mu , Aku masa depan mu <br>
    <div class="subtitle">Vionita</div>`,
    poster:"img/img 9.jpg"
},
{
    id:'10',
    songName:`Janji Setia <br>
    <div class="subtitle">Tiara Andini</div>`,
    poster:"img/img 10.jpg"
},
{
    id:'11',
    songName:` Bawa Dia Kembali <br>
    <div class="subtitle">Mahalini</div>`,
    poster:"img/img 11.jpg"
},
{
    id:'12',
    songName:`Aku Yang Jatuh Cinta <br>
    <div class="subtitle">>Dudy Oris</div>`,
    poster:"img/img 12.jpg"
},
]
Array.from(document.getElementsByClassName('song_item')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = song[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = song[i].songName;
})

let masterPlay = document.getElementByid('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
   if (music.paused || music.currentTime <=0) {
      music.play();
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');
      wave.classList.add('active2');
   } else {
      music.pause();
      masterPlay.classList.add('bi-play-fill');
      masterPlay.classList.remove('bi-pause-fill');
      wave.classList.remove('active2');
   }
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
           element.classList.add('bi-play-circle-fill');
           element.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('song_item')).forEach((element)=>{
           element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let poster_master_play = document.getElementByid('poster_master_play');
let title = document.getElementByid('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src =`audio/audio ${index}.mp3`;
        poster_master_play.src =`img/img ${index}.jpg`;
        music.play();
        let song_title =song.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
       /*  music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');

        })*/
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('song_item'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})

let currentStart = document.getElementByid('currentStart');
let currentEnd= document.getElementByid('currentEnd');
let seek= document.getElementByid('seek');
let bar2= document.getElementByid('bar2');
let dot= document.getElementsByClassName('dot')[0];



music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
 
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
 
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar =parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})
music.addEventListener('ended',()=>{
   
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
    index ++;
    music.src =`audio/audio ${index}.mp3`;
    poster_master_play.src =`img/img ${index}.jpg`;
    music.play();
    let song_title =song.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song_item'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    makeAllPlays();
    document.getElementsByClassName('playListPlay')[index ].classList.remove('bi-play-circle-fill');
    document.getElementsByClassName('playListPlay')[index ].classList.add('bi-pause-circle-fill');
})

let vol_icon =document.getElementByid('vol_icon');
let vol =document.getElementByid('vol');
let vol_dot =document.getElementByid('vol_dot');
let vol_bar= document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change',()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down');
        vol_icon.classList.add('bi-volume-mute');
        vol_icon.classList.remove('bi-volume-up');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down');
        vol_icon.classList.remove('bi-volume-mute');
        vol_icon.classList.remove('bi-volume-up');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down');
        vol_icon.classList.remove('bi-volume-mute');
        vol_icon.classList.add('bi-volume-up');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;

}) 

let back = document.getElementByid('back');
let next = document.getElementByid('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
      index = Array.from(document.getElementsByClassName('song_item')).length;      
    }
    music.src =`audio/audio ${index}.mp3`;
    poster_master_play.src =`img/img ${index}.jpg`;
    music.play();
    let song_title =song.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
     makeAllPlays();
    document.getElementsByClassName('playListPlay')[index].classList.remove('bi-play-circle-fill');
    document.getElementsByClassName('playListPlay')[index].classList.add('bi-pause-circle-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song_item'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('song_item')).length) {
        index = 1;
        }
    music.src =`audio/audio ${index}.mp3`;
    poster_master_play.src =`img/img ${index}.jpg`;
    music.play();
    let song_title =song.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
     makeAllPlays();
     document.getElementsByClassName('playListPlay')[index ].classList.remove('bi-play-circle-fill');
     document.getElementsByClassName('playListPlay')[index ].classList.add('bi-pause-circle-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song_item'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})


