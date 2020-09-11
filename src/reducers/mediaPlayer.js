
const crossfadeDuration = 2500;

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
    switch (action.type) {
        case('LOAD_SONGS'): 
            //let context = new(window.AudioContext || window.webkitAudioContext) // Create an audio context
            //let timingObject = new TimingObject(new TimingProvider('0123456789abcdefghij'))
            if(state.sounds && !isEmpty(state.sounds)) {
                for(var soundName in state.sounds) {
                    //if(state.sounds[soundName]) state.sounds[soundName].unload();
                }
            }
            let context = state.context ? state.context : new (window.AudioContext || window.webkitAudioContext);
            // let sounds = {};
            let sounds = Object.keys(action.data.sounds).map(key => createSource(context, key, action.data.sounds[key]));
            sounds.forEach(s => {
                s.gainNode.gain.value = 0;
                //s.source.stop(0);
            })
            return Object.assign({}, state, { 
                sounds: sounds,
                currentSoundZone: action.data.zone,
                currentTime: 0,
                playState: 'stop',
                context: context
                //timer: timingObject
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
            console.log(playIndex);
            s.sounds.forEach((sound, i) => {
                if(i !== playIndex) {
                    //sound.gainNode.gain.value = 0;
                    sound.gainNode.gain.linearRampToValueAtTime(0, state.context.currentTime + 1);
                    if(state.playState !== 'play' && !isResuming) { sound.source.start(0); }
                }
            });

            //s.sounds[playIndex].gainNode.gain.value = 1;
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
        default:
            return state;
    }
}

export default mediaPlayer