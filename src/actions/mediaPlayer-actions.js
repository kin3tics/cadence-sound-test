import audioData from '../data/audio';

export const PLAY_SELECTEDALBUM = 'PLAY_SELECTEDALBUM'
export const PLAY_SELECTEDPLAYLIST = 'PLAY_SELECTEDPLAYLIST'
export const LOAD_SONGS = 'LOAD_SONGS'
export const PLAY_SONG = 'PLAY_SONG'
export const PLAY_TOPSONGS = 'PLAY_TOPSONGS'
export const PAUSE_SONG = 'PAUSE_SONG'
export const SET_PLAYLIST_ACTIVEINDEX = 'SET_PLAYLIST_ACTIVEINDEX'
export const PREV_SONG = 'PREV_SONG'
export const SEEK_SONG = 'SEEK_SONG'
export const ADD_SONG = 'ADD_SONG'
export const SET_ART = 'SET_ART'

const AudioContext = new (window.AudioContext || window.webkitAudioContext);

export function loadAudio(map, cb) {
    return(dispatch) => { 
        let audioMap = audioData[map];
        let audioFiles = [];
        if(audioMap) {
            let audioBuffers = {};
            let audioFilePromises = [];
            for (var zone in audioMap) {
                let baseFile = `${map}_${zone}`;
                audioFiles.push(baseFile);
                if(audioMap[zone].options && audioMap[zone].options.length) {
                    audioMap[zone].options.forEach(o => { audioFiles.push(`${baseFile}_${o}`); });
                }
            }
            
            audioFiles.forEach(af => {
                audioFilePromises.push(new Promise((res, rej) => {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET",`/sounds/${af}.webm`);
                    xhr.responseType = 'arraybuffer';
                    xhr.onload = function(request) {
                        // Decode the audio data
                        var audioData = request.target.response;
                        if(audioData) {
                            AudioContext.decodeAudioData(audioData, function(buffer) {
                                audioBuffers[af] = buffer;
                                res(true);
                            }, function(error){ rej(error); });
                        }
                    };
                    xhr.send(null);
                }))
                    
                    //sounds[s] = new Sound(`/sounds/${s}.webm`, null, handleError); 
            });
            Promise.all(audioFilePromises).then(res => {
                dispatch({ type: LOAD_SONGS, data: { sounds: audioBuffers, zone: map } });
                if(typeof cb === 'function') cb();
            }).catch(err => {
                console.log(err);
            });

            //dispatch({ type: LOAD_SONGS, data: { sounds: audioFiles, zone: map } })
        }
    }
}

export function playSound(soundId) {
    return {
        type: PLAY_SONG,
        data: soundId
    }
}

export function pauseSong() {
    return {
        type: PAUSE_SONG
    }
}

export function playAlbum(album, startingIndex, isShuffle) {
    return {
        type: PLAY_SELECTEDALBUM,
        album,
        startingIndex,
        isShuffle
    }
}

export function playPlaylist(playlist, startingIndex, isShuffle) {
    return {
        type: PLAY_SELECTEDPLAYLIST,
        playlist,
        startingIndex,
        isShuffle
    }
}

export function playTopSongs(topSongs, startingIndex) {
    return {
        type: PLAY_TOPSONGS,
        topSongs,
        startingIndex
    }
}

export function setPlaylistActiveIndex(playlistIndex) {
    return {
        type: SET_PLAYLIST_ACTIVEINDEX,
        playlistIndex
    }
}

export function nextSong() {
    return {
        type: PREV_SONG
    }
}

export function seekSong(seek) {
    return {
        type: SEEK_SONG,
        seek
    }
}

export function addSong(songArray) {
    return {
        type: ADD_SONG,
        songArray
    }
}

export function setSongArt(coverArtUri, palette) {
    return {
        type: SET_ART,
        coverArtUri,
        palette
    }
}

