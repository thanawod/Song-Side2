const music = new Audio('Stand Here Alone - Wanita Masih Banyak _ Lirik Lagu.mp3');

//create Array

const song = [
{
    id:'19',
    songName:`Perfect <br>
    <div class="subtitle">Ed Sheeren </div>`,
    poster:"img/img 19.jpg"
},
{
    id:'4',
    songName:`Arjuna<br>
    <div class="subtitle">Dewa 19</div>`,
    poster:"img/img 4.jpg"
},
{
    id:'3',
    songName:`Introvert <br>
    <div class="subtitle">Stand Her Alone</div>`,
    poster:"img/img 3.jpg"
},
{
    id:'12',
    songName:` Aku Yang Jatuh Cinta <br>
    <div class="subtitle">Dudy Oris</div>`,
    poster:"img/img 12.jpg"
},
{
    id:'9',
    songName:` Dia Masa Lalumu Aku Masa Depan Mu <br>
    <div class="subtitle">Viona</div>`,
    poster:"img/img 9.jpg"
},
{
    id:'7',
    songName:`Angin<br>
    <div class="subtitle">Dewa 19</div>`,
    poster:"img/img 7.jpg"
},
{
    id:'16',
    songName:`Pamer Bojo <br>
    <div class="subtitle"> Didi Kempot</div>`,
    poster:"img/img 16.jpg"
},
{
    id:'15',
    songName:`Nemen <br>
    <div class="subtitle">Guyon Waton</div>`,
    poster:"img/img 15.jpg"
},
{
    id:'21',
    songName:`Love Me like Theres No Tomorrow <br>
    <div class="subtitle">Freddie Mercury</div>`,
    poster:"img/img 21.jpg"
},
{
    id:'18',
    songName:`Teteh <br>
    <div class="subtitle">Doel Sumbang</div>`,
    poster:"img/img 18.jpg"
},
{
    id:'1',
    songName:`Wanita Masih Banyak <br>
    <div class="subtitle">Stand Here Alone</div>`,
    poster:"img/img 1.jpg"
},
{
    id:'5',
    songName:`Diary Depresiku <br>
    <div class="subtitle">Last Child</div>`,
    poster:"img/img 5.jpg"
},
]
Array.from(document.getElementsByClassName('song_item')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = song[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = song[i].songName;
})

// search data start

let search_result = document.getElementsByClassName('search_result')[0];

song.forEach(element => {
    const { id, songName, poster,} = element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = "#" + id;
    card.innerHTML = `
    <img src="${poster}" alt="">
    <div class="content">
     ${songName}
    </div>
    `;
    search_result.appendChild(card);
});

let input = document.getElementsByTagName('input')[0];

input.addEventListener('keyup', ()=>{
    let input_value = input.value.toUpperCase();
    let items = search_result.getElementsByTagName('a');

    for (let index = 0; index < items.length; index++) {
       let as = items[index].getElementsByClassName('content')[0];
       let text_value = as.textContent || as.innerText;
        
       if (text_value.toUpperCase().indexOf(input_value) > -1) {
          items[index].style.display = "flex";
       } else {
        items[index].style.display = "none";

       }
        
    }
})

// search data end


let masterPlay = document.getElementById('masterPlay');
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
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
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
        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');

        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('song_item'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd= document.getElementById('currentEnd');
let seek= document.getElementById('seek');
let bar2= document.getElementById('bar2');
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
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})

let vol_icon =document.getElementById('vol_icon');
let vol =document.getElementById('vol');
let vol_dot =document.getElementById('vol_dot');
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

let back = document.getElementById('back');
let next = document.getElementById('next');

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
     makeAllPlays()
    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song_item'))[`${index-18}`].style.background = "rgb(105, 105, 170, .1)";
})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('song_item')).length) {
        index = 20;
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
     makeAllPlays()
    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song_item'))[`${index-18}`].style.background = "rgb(105, 105, 170, .1)";
})


