import React, { useState } from 'react';
import { Container, NineSlicePlane, Sprite } from '@inlet/react-pixi';
import Rectangle from './Rectangle';

const defaultColor = 0x383838;
const activeColor = 0xd9544c;
const buttonDefaultProps = {
    x: 0,
    y: 0,
    height: 50,
    width: 150
}

function SpriteButton({ x, y, height, width, active, source, onPress}) {
    const [ hover, setHover ] = useState(false); 
    let buttonHeight = height ? height : buttonDefaultProps.height;
    let buttonWidth = width ? width : buttonDefaultProps.width;
    let buttonX = x ? x : buttonDefaultProps.x;
    let buttonY = y ? y : buttonDefaultProps.y;
    let buttonFill = active ? activeColor : defaultColor;
    return (
        <Container interactive={true} buttonMode={true} pointerdown={onPress}
            x={buttonX} y={buttonY}
            pointerover={() => setHover(true)} pointerout={() => setHover(false)}>
            <Rectangle fill={buttonFill}
                width={buttonWidth - 4} height={buttonHeight - 4}
                x={2} y={2} />
            <NineSlicePlane
                leftWidth={17} topHeight={17} rightWidth={17} bottomHeight={17}
                width={buttonWidth} height={buttonHeight}
                image={require('../images/ui/btn1.png')}
            />
            { hover && <NineSlicePlane
                leftWidth={19} topHeight={19} rightWidth={19} bottomHeight={19}
                width={buttonWidth + 4} height={buttonHeight + 4}
                x={-2} y={-2} 
                image={require('../images/ui/btn-overlay.png')}
            /> }
            <Sprite image={source}
                anchor={0.5}
                x={(buttonWidth / 2)} y={(buttonHeight / 2)} />
        </Container>
    )
}

export default SpriteButton;