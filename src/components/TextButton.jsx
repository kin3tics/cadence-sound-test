import React, { useState } from 'react';
import { Container, NineSlicePlane, Text } from '@inlet/react-pixi';
import Rectangle from './Rectangle';

const buttonSource = require('../images/ui/btn1.png');
const hoverSrc = require('../images/ui/btn-overlay.png');

const defaultColor = 0x383838;
const activeColor = 0x558be4;
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

function TextButton({ x, y, height, width, active, label, onPress}) {
    const [ hover, setHover ] = useState(false);
    let buttonHeight = height ? height : buttonDefaultProps.height;
    let buttonWidth = width ? width : buttonDefaultProps.width;
    let buttonX = x ? x : buttonDefaultProps.x;
    let buttonY = y ? y : buttonDefaultProps.y;
    let buttonFill = active ? activeColor : defaultColor
    let labelText = label ? label : 'TEXT GOES HERE';
    
    return (
        <Container interactive={true} buttonMode={true} pointerdown={onPress}
            pointerover={() => setHover(true)} pointerout={() => setHover(false)}>
            <Rectangle fill={buttonFill}
                width={buttonWidth - 4} height={buttonHeight - 4}
                x={buttonX + 2 } y={buttonY + 2} />
            <NineSlicePlane
                leftWidth={17} topHeight={17} rightWidth={17} bottomHeight={17}
                width={buttonWidth} height={buttonHeight}
                x={buttonX} y={buttonY} 
                image={buttonSource}
            />
            { hover && <NineSlicePlane
                leftWidth={19} topHeight={19} rightWidth={19} bottomHeight={19}
                width={buttonWidth + 4} height={buttonHeight + 4}
                x={buttonX - 2} y={buttonY - 2} 
                image={hoverSrc}
            /> }
            <Text text={labelText} style={textStyleBackground}
                x={buttonX + 22} y={buttonY + (buttonHeight / 4) + 2} />
            <Text text={labelText} style={textStyle}
                x={buttonX + 20} y={buttonY + (buttonHeight / 4)} />
        </Container>
    )
}

export default TextButton;