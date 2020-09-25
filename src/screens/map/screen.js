import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Sprite, NineSlicePlane, Text } from '@inlet/react-pixi'
import Rectangle from '../../components/Rectangle';
import HoverZone from '../../components/HoverZone';
import Arrow from '../../components/Arrow';

import { setScreen } from '../../actions/ui-actions';
import { getNiceZoneName } from '../../helpers/text';

import { hoverHeight, hoverWidth, hoverZones } from './hover'

const borderSource = require('../../images/ui/box1s2.png');
const border2Source = require('../../images/ui/box2s2.png');

const screenHeight = 576;
const screenWidth = 1024;

const headerTextStyle = {
    fontFamily: 'Hylian',
    fontSize: 40,
    fill: '#ffffff',
    textSpacing: '5px'
}
const headerTextStyleBackground = {
    fontFamily: 'Hylian',
    fontSize: 40,
    fill: '#222222',
    textSpacing: '5px'
}

const mapContainerProps = {
    width: 600,
    height: 376,
    x: 136,
    y: 100
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
const mapProps = {
    x: mapContainerProps.x + 20,
    y: mapContainerProps.y + 20
}

const textContainer = {
    height: 56,
    width: mapContainerProps.width,
    x: mapContainerProps.x,
    y: mapContainerProps.y + mapContainerProps.height + 10
}

const zoneTextStyle = {
    fontFamily: 'PixelOperator',
    fontSize: 20,
    fill: '#ffffff'
}

const zoneTextStyleBackground = {
    fontFamily: 'PixelOperator',
    fontSize: 20,
    fill: '#222222'
}

const mapStateToProps = state => ({
    zone: state.mediaPlayer.currentSoundZone
});

const MapScreen = ({ dispatch, zone }) => {
    const [highlightedZone, setHighlightedZone] = useState('');
    let zones = hoverZones.map((hz, i) => {
        return (<HoverZone key={`hoverZone${i}`}
            height={hz.height * hoverHeight}
            width={hz.width * hoverWidth}
            x={(hz.x * hoverWidth) + mapProps.x}
            y={(hz.y * hoverHeight) + mapProps.y}
            onHover={() => {setHighlightedZone(hz.zone)}}
            offHover={() => {setHighlightedZone('')}}
            onPress={() => { dispatch(setScreen(hz.zone))}} />)
    })

    return (<Container>
        <Sprite image={require('../../images/bg.jpg')} scale={0.8} />
        <Rectangle fill={0x222222} opacity={0.5}
            width={screenWidth} height={screenHeight}
            x={0} y={0} />
        <Text
            style={headerTextStyleBackground}
            text="MAP"
            anchor={0.49}
            y={(100 / 2) + 2}
            x={(1024/2) + 2} />
        <Text
            style={headerTextStyle}
            text="MAP"
            anchor={0.5}
            y={100 / 2}
            x={1024/2} />
        <Rectangle fill={0x222222} opacity={0.7}
                width={mapContainerProps.width} height={mapContainerProps.height}
                x={mapContainerProps.x} y={mapContainerProps.y} />
        <NineSlicePlane
            leftWidth={17} topHeight={17} rightWidth={17} bottomHeight={17}
            width={mapContainerProps.width} height={mapContainerProps.height}
            x={mapContainerProps.x} y={mapContainerProps.y}
            image={borderSource}
        />
        <Rectangle fill={0x222222}
            width={44} height={16}
            x={mapContainerProps.x + 16} y={mapContainerProps.y} />
        <Text
            style={containerTitleTextStyleBackground} text='MAP'
            y={mapContainerProps.y} x={mapContainerProps.x + 18} />
        <Text
            style={containerTitleTextStyle} text='MAP'
            y={mapContainerProps.y + 2} x={mapContainerProps.x + 19} />
        <Sprite image={require('../../images/map.png')} scale={0.7}
            x={mapProps.x} y={mapProps.y} />
        { zones }

        <Rectangle fill={0x222222} opacity={0.7}
                width={textContainer.width} height={textContainer.height}
                x={textContainer.x} y={textContainer.y} />
        <NineSlicePlane
            leftWidth={17} topHeight={17} rightWidth={17} bottomHeight={17}
            width={textContainer.width} height={textContainer.height}
            x={textContainer.x} y={textContainer.y}
            image={border2Source}
        />
        <Text
            style={zoneTextStyleBackground}
            text={getNiceZoneName(highlightedZone)}
            x={textContainer.x + 26} y={textContainer.y + 12} />
        <Text
            style={zoneTextStyle}
            text={getNiceZoneName(highlightedZone)}
            x={textContainer.x + 24} y={textContainer.y + 10} />
        {zone && <Arrow x={948} y={256} direction="right" label="Tracks" 
            onPress={() => {dispatch(setScreen(zone))}} />}
    </Container>)
}

export default connect(mapStateToProps)(MapScreen);