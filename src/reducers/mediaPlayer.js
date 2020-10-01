function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

function createSource(context, name, buffer) {
    var source = context.createBufferSource();
    var gainNode = context.createGain ? context.createGain() :  context.createGainNode();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gainNode);
    gainNode.connect(context.destination);
    return {
        name: name,
        source: source,
        gainNode: gainNode
    }
}

const mediaPlayer = (
    state = { 
        playState: 'stop',
        currentTime: 0,
        sounds: null,
        currentSound: null,
        currentSoundZone: null,
        timer: null,
        context: null
    }, 
    action ) => {
    let s = null;
    let currentSoundIndex = state.sounds ? state.sounds.findIndex(s => s.name === state.currentSound) : -1;
    switch (action.type) {
        case('LOAD_SONGS'): 
            if(state.currentSoundZone === action.data.zone) return state;
            let context = state.context ? state.context : new (window.AudioContext || window.webkitAudioContext);
            if(state.sounds && !isEmpty(state.sounds)) {
                setTimeout(() => { state.context.close(); }, 2000);
                context = new (window.AudioContext || window.webkitAudioContext);
            }
            
            let sounds = Object.keys(action.data.sounds).map(key => createSource(context, key, action.data.sounds[key]));
            sounds.forEach(s => {
                s.gainNode.gain.value = 0;
            })
            return Object.assign({}, state, { 
                sounds: sounds,
                currentSoundZone: action.data.zone,
                currentSound: null,
                currentTime: 0,
                playState: 'stop',
                context: context
            });
        case('PLAY_SONG'):
            //If trying to 'play' current sound don't do anything
            let isResuming = state.context.state === 'suspended';
            if (isResuming) {
                state.context.resume();
                state.playState = 'play';
            }
            if (action.data === state.currentSound) { return state; }
            s = Object.assign({}, state, { 
                currentSound: action.data,
                playState: 'play'
            });
            let playIndex = s.sounds.findIndex(s => s.name === action.data);
            s.sounds.forEach((sound, i) => {
                if(i !== playIndex) {
                    //sound.gainNode.gain.value = 0;
                    sound.gainNode.gain.linearRampToValueAtTime(0, state.context.currentTime + 1);
                    if(state.playState !== 'play' && !isResuming) { sound.source.start(0); }
                }
            });

            //s.sounds[playIndex].gainNode.gain.value = 1;
            s.sounds[playIndex].gainNode.gain.value = 0.5;
            s.sounds[playIndex].gainNode.gain.linearRampToValueAtTime(1, state.context.currentTime + 1);
            if(state.playState !== 'play' && !isResuming) { s.sounds[playIndex].source.start(0); }
            return s;
        case('PAUSE_SONG'):
            if(!state.sounds) return state;
            state.context.suspend();

            return Object.assign({}, state, { 
                playState: 'stop'
            });
        case('SEEK_SONG'):
            return state;
        case('SET_SCREEN'): 
            if(!state.sounds || state.playState !== 'play') return state;

            //let currentSoundIndex = state.sounds.findIndex(s => s.name === state.currentSound);
            if(action.data === 'map') {
                state.sounds[currentSoundIndex].gainNode.gain.linearRampToValueAtTime(0.5, state.context.currentTime + 1);
            } else {
                if (state.currentSoundZone !== action.data) {
                    state.sounds[currentSoundIndex].gainNode.gain.linearRampToValueAtTime(0, state.context.currentTime + 1);
                } else {
                    state.sounds[currentSoundIndex].gainNode.gain.linearRampToValueAtTime(1, state.context.currentTime + 1);
                }
            }
            return state;
        default:
            return state;
    }
}

export default mediaPlayer