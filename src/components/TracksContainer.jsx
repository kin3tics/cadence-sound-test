import React, { useState, useEffect } from 'react';
import { Container, Text, NineSlicePlane, Sprite } from '@inlet/react-pixi'
import { connect } from 'react-redux';
import { playSound, pauseSong } from '../actions/mediaPlayer-actions';
import Rectangle from './Rectangle';
import TextButton from './TextButton';
import SpriteButton from './SpriteButton';
import NowPlaying from './NowPlaying';

import { getNiceZoneName } from '../helpers/text';

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

function getModifierFromCurrentTrack(currentTrack) {
    if(!currentTrack) return null;
    let trackPieces = currentTrack.split('_');
    if(trackPieces[2]) return trackPieces[2];
    return null;
}

function getBaseTrackFromCurrentTrack(currentTrack) {
    if(!currentTrack) return null;
    let trackPieces = currentTrack.split('_');
    if(trackPieces[0] && trackPieces[1]) return `${trackPieces[0]}_${trackPieces[1]}`;
    return null;
}

function TracksContainer({ dispatch, trackData, trackZone, currentTrack }) {
    const [ activeModifier, setActiveModifier ] = useState(getModifierFromCurrentTrack(currentTrack));
    const [ activeTrack, setActiveTrack ] = useState(getBaseTrackFromCurrentTrack(currentTrack));
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
    }, [activeTrack, currentTrack, activeModifier, dispatch]);

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
            let trackActive = activeTrack && activeTrack.indexOf(trackKey) > -1;
            trackButtons.push(<TextButton key={`track-${i}`}
                height={trackProps.height} width={trackProps.width} label={capitalize(data)}
                x={trackListContainerProps.x + 75  } y={offsetY}
                active={trackActive}
                onPress={() => { setActiveTrack(trackKey); }} />);
        });
    }
    modifiers.forEach((mod, i) => {
        let offsetY = modifierContainerProps.y + 50 + (i * 75);
        let modActive = activeModifier === mod;
        let modSprite = null;
        if(mod === 'shop') {
            modSprite = modActive ? require('../images/mods/shop_sing.png') : require('../images/mods/shop_default.png');
        } else if (mod === 'glockenspiel') {
            modSprite = require('../images/mods/glockenspiel_default.png');
        } else if (mod === 'bass') {
            modSprite = require('../images/mods/bass_default.png');
        } else if (mod === 'maracas') {
            modSprite = require('../images/mods/maracas_default.png');
        } else if (mod === 'oboe') {
            modSprite = require('../images/mods/oboe_default.png');
        }
        modifierButtons.push(<SpriteButton key={`mod-${i}`}
            height={modifierButtonProps.height} width={modifierButtonProps.width}
            x={modifierContainerProps.x + 32  } y={offsetY}
            active={modActive}
            source={modSprite}
            onPress={() => { setActiveModifier(modActive ? null : mod); }} />);
    })
    return (
        <Container>
            <Text
                style={zoneTextStyleBackground}
                text={getNiceZoneName(trackZone)}
                anchor={0.49}
                y={(trackListContainerProps.y / 2) + 2}
                x={(1024/2) + 2} />
            <Text
                style={zoneTextStyle}
                text={getNiceZoneName(trackZone)}
                anchor={0.5}
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