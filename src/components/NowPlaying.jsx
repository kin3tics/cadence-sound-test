import React from 'react';
import { Container, Text, NineSlicePlane } from '@inlet/react-pixi'
import { connect } from 'react-redux';
import Rectangle from './Rectangle';

import { getNiceFullSongName } from '../helpers/text'

const nowPlayingDefaultProps = {
    height: 50,
    width: 614,
    x: 150,
    y: 100
}

const statusTextStyle = {
    fontFamily: 'PixelOperator',
    fontSize: 20,
    fill: '#e6d853'
}
const trackTextStyle = {
    fontFamily: 'PixelOperator',
    fontSize: 20,
    fill: '#ffffff'
}

const textStyleBackground = {
    fontFamily: 'PixelOperator',
    fontSize: 20,
    fill: '#222222'
}

function NowPlaying({ currentTrack, isPlaying, width, height, x, y }) {
    let containerWidth = width ? width : nowPlayingDefaultProps.width;
    let containerHeight = height ? height : nowPlayingDefaultProps.height;
    let containerX = x ? x : nowPlayingDefaultProps.x;
    let containerY = y ? y : nowPlayingDefaultProps.y;

    let trackTitle = getNiceFullSongName(currentTrack);

    let textNodes = [];
    if(!trackTitle) {
        textNodes.push(<Text
            style={textStyleBackground}
            text={"Select a track above to begin."}
            x={containerX + 26} y={containerY + 12} />)
        textNodes.push(<Text
            style={trackTextStyle}
            text={"Select a track above to begin."}
            x={containerX + 24} y={containerY + 10} />);
    } else {
        textNodes.push(<Text
            style={textStyleBackground}
            text={`Status: ${isPlaying ? 'Playing' : 'Paused'}`}
            x={containerX + 26} y={containerY + 12} />);
        textNodes.push(<Text
            style={statusTextStyle}
            text={`Status: ${isPlaying ? 'Playing' : 'Paused'}`}
            x={containerX + 24} y={containerY + 10} />);
        textNodes.push(<Text
            style={textStyleBackground}
            text={`Track: ${trackTitle}`}
            x={containerX + 26} y={containerY + 34} />);
        textNodes.push(<Text
            style={trackTextStyle}
            text={`Track: ${trackTitle}`}
            x={containerX + 24} y={containerY + 32} />);
    }

    return (
        <Container>
            <Rectangle fill={0x222222} opacity={0.7}
                width={containerWidth} height={containerHeight}
                x={containerX} y={containerY} />
            <NineSlicePlane
                leftWidth={17} topHeight={17} rightWidth={17} bottomHeight={17}
                width={containerWidth} height={containerHeight}
                x={containerX} y={containerY}
                image={require('../images/ui/box2s2.png')}
            />
            {textNodes}
        </Container>
    )
}

export default connect()(NowPlaying);