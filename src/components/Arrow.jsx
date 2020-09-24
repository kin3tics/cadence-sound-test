import React from 'react';
import { Container, Sprite, Text } from '@inlet/react-pixi';

const buttonDefaultProps = {
    x: 0,
    y: 0,
    height: 50,
    width: 150
}
const textStyle = {
    fontFamily: 'PixelOperator',
    fontSize: 28,
    fill: "#ffffff"
};
const textStyleBackground = {
    fontFamily: 'PixelOperator',
    fontSize: 28,
    fill: "#222222"
};

function Arrow({ x, y, label, onPress}) {
    let buttonX = x ? x : buttonDefaultProps.x;
    let buttonY = y ? y : buttonDefaultProps.y;
    let labelText = label ? label : 'TEXT GOES HERE';
    return (
        <Container interactive={true} buttonMode={true} pointerdown={onPress}
            x={buttonX} y={buttonY}>
            <Text text={labelText} style={textStyleBackground}
                anchor={0.5} x={2} y={2} />
            <Text text={labelText} style={textStyle} anchor={0.5} />
            <Sprite anchor={0.5} y={56} source={require('../images/ui/arrowl2.png')} />
        </Container>
    )
}

export default Arrow;