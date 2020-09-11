import React, { useState, useEffect } from 'react';
import { Container, Text, NineSlicePlane, Sprite } from '@inlet/react-pixi'
import { connect } from 'react-redux';
import { playSound, pauseSong } from '../actions/mediaPlayer-actions';
import Rectangle from './Rectangle';
import TextButton from './TextButton';
import SpriteButton from './SpriteButton';
import NowPlaying from './NowPlaying';

import audioData from '../data/audio';

import styles from '../styles/global';

const mapStateToProps = state => ({
    mediaPlayer: state.mediaPlayer
})

// const Area = connect()(({zoneTitle, areaTitle, areaData, dispatch}) => {
//     return(<View>
//         <Text>{areaTitle}</Text>
//         <View>
//             <Button title={areaTitle} onPress={() => dispatch(playSound(`${zoneTitle}_${areaTitle}`))} />
//             { areaData.options.map(ad => <Button title={`${areaTitle} ${ad}`} onPress={() => dispatch(playSound(`${zoneTitle}_${areaTitle}_${ad}`))} />)}
//         </View>
//     </View>)
// })

// const Zone = ({zoneTitle, zoneData}) => {
//     let areas = [];
//     for(var area in zoneData) {
//         areas.push(<Area zoneTitle={zoneTitle} areaTitle={area} areaData={zoneData[area]} />);
//     }
//     return (<View><Text>{zoneTitle}</Text>{areas}</View>)

// }

const trackListContainerProps = {
    height: 350,
    width: 614,
    x: 136,
    y: 100
}
const modifierContainerProps = {
    height: trackListContainerProps.height,
    width: 128,
    x: trackListContainerProps.width + trackListContainerProps.x + 10,
    y: trackListContainerProps.y
}

const currentPlayingContainerProps = {
    height: 80,
    width: trackListContainerProps.width,
    x: trackListContainerProps.x,
    y: trackListContainerProps.y + trackListContainerProps.height + 10
}

const trackProps = {
    height: 64,
    width: trackListContainerProps.width - 150
}

const modifierButtonProps = {
    height: trackProps.height,
    width: 64
}

const playButtonProps = {
    offsetX: 10,
    offsetY: 2
}
const pauseButtonProps = {
    offsetX: 10,
    offsetY: 42
}

const containerTitleTextStyle = {
    fontFamily: 'PixelOperatorMono8',
    fontSize: 14,
    fill: '#ffffff'
}
const containerTitleTextStyleBackground = {
    fontFamily: 'PixelOperatorMono8',
    fontSize: 14,
    fill: '#989187'
}

const zoneTextStyle = {
    fontFamily: 'Hylian',
    fontSize: 40,
    fill: '#ffffff',
    textSpacing: '5px'
}
const zoneTextStyleBackground = {
    fontFamily: 'Hylian',
    fontSize: 40,
    fill: '#222222',
    textSpacing: '5px'
}

const playButtonStyle = {
    fontFamily: 'PixelOperator',
    fontSize: 28,
    fill: "#ffffff"
};
const playButtonStyleBackground = {
    fontFamily: 'PixelOperator',
    fontSize: 28,
    fill: "#222222"
};

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function TracksContainer({ dispatch, trackData, trackZone, currentTrack }) {
    const [ activeModifier, setActiveModifier ] = useState(null);
    const [ activeTrack, setActiveTrack ] = useState(null);
    const [ isPlaying, setIsPlaying ] = useState(false);
    useEffect(() => {
        if(activeTrack) {
            let trackKey = activeTrack;
            if(activeModifier) trackKey += '_' + activeModifier;
            if (trackKey !== currentTrack) {
                dispatch(playSound(trackKey));
                setIsPlaying(true);
            }
        }
    }, [activeTrack, activeModifier]);

    // useEffect(() => { if(!mediaPlayer.sounds) dispatch(loadAudio('overworld'))});
    // console.log(mediaPlayer)
    let trackButtons = [];
    let modifierButtons = [];
    let modifiers = [];
    if(trackData) {
        Object.keys(trackData).forEach((data, i) => {
            if(trackData[data].options) {
                trackData[data].options.forEach(o => {
                    if(modifiers.indexOf(o) === -1) {
                        modifiers.push(o);
                    }
                })
            }
            let offsetY = trackListContainerProps.y + 50 + (i * 75)
            let trackKey = `${trackZone}_${data}`;
            trackButtons.push(<TextButton
                height={trackProps.height} width={trackProps.width} label={capitalize(data)}
                x={trackListContainerProps.x + 75  } y={offsetY}
                active={activeTrack === trackKey}
                onPress={() => { console.log(`tapped! ${trackKey}`);  setActiveTrack(trackKey); }} />);
        });
    }
    modifiers.forEach((mod, i) => {
        let offsetY = modifierContainerProps.y + 50 + (i * 75);
        let modActive = activeModifier === mod;
        modifierButtons.push(<SpriteButton
            height={modifierButtonProps.height} width={modifierButtonProps.width}
            x={modifierContainerProps.x + 32  } y={offsetY}
            active={modActive}
            source={modActive ? require('../images/mods/shop_sing.png') : require('../images/mods/shop_default.png')}
            sourceX={4} sourceY={8}
            onPress={() => { console.log(`tapped! ${mod}`); setActiveModifier(modActive ? null : mod); }} />);
    })
    return (
        <Container>
            <Text
                style={zoneTextStyleBackground}
                text={trackZone ? trackZone.toUpperCase() : ''}
                anchor={0.49, 0.49}
                y={(trackListContainerProps.y / 2) + 2}
                x={(1024/2) + 2} />
            <Text
                style={zoneTextStyle}
                text={trackZone ? trackZone.toUpperCase() : ''}
                anchor={0.5, 0.5}
                y={trackListContainerProps.y / 2}
                x={1024/2} />
            <Rectangle fill={0x222222} opacity={0.7}
                width={trackListContainerProps.width} height={trackListContainerProps.height}
                x={trackListContainerProps.x} y={trackListContainerProps.y} />
            <NineSlicePlane
                leftWidth={17} topHeight={17} rightWidth={17} bottomHeight={17}
                width={trackListContainerProps.width} height={trackListContainerProps.height}
                x={trackListContainerProps.x} y={trackListContainerProps.y}
                image={require('../images/ui/box1s2.png')}
            />
            <Rectangle fill={0x222222}
                width={86} height={16}
                x={trackListContainerProps.x + 16} y={trackListContainerProps.y} />
            <Text
                style={containerTitleTextStyleBackground} text='TRACKS'
                y={trackListContainerProps.y} x={trackListContainerProps.x + 18} />
            <Text
                style={containerTitleTextStyle} text='TRACKS'
                y={trackListContainerProps.y + 2} x={trackListContainerProps.x + 19} />
            { trackButtons }
            <Rectangle fill={0x222222} opacity={0.7}
                width={modifierContainerProps.width} height={modifierContainerProps.height}
                x={modifierContainerProps.x} y={modifierContainerProps.y} />
            <NineSlicePlane
                leftWidth={17} topHeight={17} rightWidth={17} bottomHeight={17}
                width={modifierContainerProps.width} height={modifierContainerProps.height}
                x={modifierContainerProps.x} y={modifierContainerProps.y}
                image={require('../images/ui/box1s2.png')}
            />
            <Rectangle fill={0x222222}
                width={58} height={16}
                x={modifierContainerProps.x + 16} y={modifierContainerProps.y} />
            <Text
                style={containerTitleTextStyleBackground} text='MODS'
                y={modifierContainerProps.y} x={modifierContainerProps.x + 18} />
            <Text
                style={containerTitleTextStyle} text='MODS'
                y={modifierContainerProps.y + 2} x={modifierContainerProps.x + 19} />
            { modifierButtons}
            <NowPlaying 
                width={currentPlayingContainerProps.width} height={currentPlayingContainerProps.height}
                x={currentPlayingContainerProps.x} y={currentPlayingContainerProps.y}
                isPlaying={isPlaying} currentTrack={currentTrack} />
            <Container 
                interactive={true} 
                buttonMode={true}
                pointerdown={() => { 
                    if(!isPlaying && currentTrack) {
                        dispatch(playSound(currentTrack));
                        setIsPlaying(true);
                    }
                }}>
                <Sprite image={require('../images/ui/play-btn.png')}
                    x={modifierContainerProps.x + playButtonProps.offsetX} y={currentPlayingContainerProps.y + playButtonProps.offsetY} />
                <Text
                    style={playButtonStyleBackground} text={'Play'}
                    x={modifierContainerProps.x + playButtonProps.offsetX + 38} y={currentPlayingContainerProps.y + playButtonProps.offsetY + 4} />
                <Text
                    style={playButtonStyle} text={'Play'}
                    x={modifierContainerProps.x + playButtonProps.offsetX + 36} y={currentPlayingContainerProps.y + playButtonProps.offsetY + 2} />
            </Container>
            <Container
                interactive={true}
                buttonMode={true}
                pointerdown={() => { 
                    if(isPlaying && currentTrack) {
                        setIsPlaying(false);
                        dispatch(pauseSong());
                    }
                }}>
                <Sprite image={require('../images/ui/pause-btn.png')}
                    x={modifierContainerProps.x + pauseButtonProps.offsetX} y={currentPlayingContainerProps.y + pauseButtonProps.offsetY} />
                <Text
                    style={playButtonStyleBackground} text={'Pause'}
                    x={modifierContainerProps.x + pauseButtonProps.offsetX + 38} y={currentPlayingContainerProps.y + pauseButtonProps.offsetY + 4} />
                <Text
                    style={playButtonStyle} text={'Pause'}
                    x={modifierContainerProps.x + pauseButtonProps.offsetX + 36} y={currentPlayingContainerProps.y + pauseButtonProps.offsetY + 2} />
            </Container>
        </Container>
    )
}

export default connect()(TracksContainer);