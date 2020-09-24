import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Sprite, Text } from '@inlet/react-pixi'
import { loadAudio } from '../../actions/mediaPlayer-actions';
import { setScreen } from '../../actions/ui-actions';
import Rectangle from '../../components/Rectangle';
import Arrow from '../../components/Arrow';

import TracksContainer from '../../components/TracksContainer.jsx';

import audioData from '../../data/audio';

const screenHeight = 576;
const screenWidth = 1024;

const loadingTextStyle = {
    fontFamily: 'Hylian',
    fontSize: 40,
    fill: '#ffffff',
    textSpacing: '5px'
}
const loadingTextStyleBackground = {
    fontFamily: 'Hylian',
    fontSize: 40,
    fill: '#222222',
    textSpacing: '5px'
}

const mapStateToProps = state => ({
    mediaPlayer: state.mediaPlayer
})

const MainScreen = ({ mediaPlayer, dispatch, zone }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(!mediaPlayer.sounds || zone !== mediaPlayer.currentSoundZone) {
            dispatch(loadAudio(zone, () => {setLoading(false);}));
        } else {
            setLoading(false);
        }
    });
    
    return (<Container>
        <Sprite image={require('../../images/bg.jpg')} scale={0.8} />
        <Rectangle fill={0x222222} opacity={0.5}
            width={screenWidth} height={screenHeight}
            x={0} y={0} />
        { loading ? (<Container>
            <Text
                style={loadingTextStyleBackground}
                text={'Loading...'}
                anchor={0.49, 0.49}
                y={(screenHeight / 2) + 2}
                x={(screenWidth/2) + 2} />
            <Text
                style={loadingTextStyle}
                text={'Loading...'}
                anchor={0.5, 0.5}
                y={(screenHeight / 2)}
                x={(screenWidth/2)} />
        </Container>)
            : (<Container><TracksContainer 
            trackZone={mediaPlayer.currentSoundZone} 
            tracks={mediaPlayer.sounds ? mediaPlayer.sounds : []} 
            trackData={ audioData[mediaPlayer.currentSoundZone] } 
            currentTrack={mediaPlayer.currentSound} />
            <Arrow x={76} y={256} direction="left" label="Map"
                onPress={() => {dispatch(setScreen("map"))}} />
            </Container>) }
    </Container>)
}

export default connect(mapStateToProps)(MainScreen);