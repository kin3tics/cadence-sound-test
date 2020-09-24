import React from 'react';
import { connect } from 'react-redux';
import { Container, Sprite, NineSlicePlane, Text } from '@inlet/react-pixi'
import Rectangle from '../../components/Rectangle';
import TextButton from '../../components/TextButton';

import { setScreen } from '../../actions/ui-actions';

const screenHeight = 576;
const screenWidth = 1024;

const splashScreenProps = {
    width: 614,
    height: 132,
    x: (screenWidth - 614) / 2,
    y: 400
}
const splashScreenButtonProps = {
    width: splashScreenProps.width - 150,
    height: 64,
    x: splashScreenProps.x + 75,
    y: splashScreenProps.y + 32
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

const SplashScreen = ({ dispatch }) => {
    return (<Container>
        <Rectangle fill={0x65b8f6}
            width={screenWidth} height={screenHeight}
            x={0} y={0} />
        <Sprite image={require('../../images/splash_01.png')} />
        <Sprite image={require('../../images/splash_01.png')} x={640}/>
        <Sprite image={require('../../images/splash_02.png')} x={50} y={70}/>
        <Sprite image={require('../../images/splash_02.png')} x={670} y={30}/>
        <Sprite image={require('../../images/splash_03.png')} x={0} y={70}/>
        <Sprite image={require('../../images/splash_03.png')} x={640} y={70}/>
        <Sprite image={require('../../images/splash_04.png')} x={20} y={150}/>
        <Sprite image={require('../../images/splash_05.png')} x={0} y={316}/>
        <Sprite image={require('../../images/splash_05.png')} x={640} y={316}/>
        <Sprite image={require('../../images/splash_06.png')} x={830} y={290}/>
        <Sprite image={require('../../images/splash_07.png')} x={-610} y={330}/>
        <Sprite image={require('../../images/splash_07.png')} x={30} y={330}/>
        <Sprite image={require('../../images/splash_07.png')} x={670} y={330}/>
        <Sprite image={require('../../images/splash_08.png')} x={0} y={407} scale={1.6}/>
        <Sprite image={require('../../images/logo.png')} x={(1024 / 2) - (276 * 1.5 / 2)} y={72} scale={1.5} />
        <Rectangle fill={0x222222} opacity={0.7}
                width={splashScreenProps.width} height={splashScreenProps.height}
                x={splashScreenProps.x} y={splashScreenProps.y} />
        <NineSlicePlane
            leftWidth={17} topHeight={17} rightWidth={17} bottomHeight={17}
            width={splashScreenProps.width} height={splashScreenProps.height}
            x={splashScreenProps.x} y={splashScreenProps.y}
            image={require('../../images/ui/box1s2.png')}
        />
        <Rectangle fill={0x222222}
            width={58} height={16}
            x={splashScreenProps.x + 16} y={splashScreenProps.y} />
        <Text
            style={containerTitleTextStyleBackground} text='MENU'
            y={splashScreenProps.y} x={splashScreenProps.x + 18} />
        <Text
            style={containerTitleTextStyle} text='MENU'
            y={splashScreenProps.y + 2} x={splashScreenProps.x + 19} />
        <TextButton
            height={splashScreenButtonProps.height} width={splashScreenButtonProps.width} 
            label="Start your quest!"
            x={splashScreenButtonProps.x} y={splashScreenButtonProps.y}
            onPress={() => { dispatch(setScreen('map')); }} />
    </Container>)
}

export default connect()(SplashScreen);