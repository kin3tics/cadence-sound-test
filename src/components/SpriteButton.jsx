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

function SpriteButton({ x, y, height, width, active, label, source, sourceX, sourceY, onPress}) {
    const [ hover, setHover ] = useState(false); 
    let buttonHeight = height ? height : buttonDefaultProps.height;
    let buttonWidth = width ? width : buttonDefaultProps.width;
    let buttonX = x ? x : buttonDefaultProps.x;
    let buttonY = y ? y : buttonDefaultProps.y;
    let buttonFill = active ? activeColor : defaultColor;
    let sourceOffsetX = sourceX ? sourceX : 0;
    let sourceOffsetY = sourceY ? sourceY : 0;
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
                image={require('../images/ui/btn1.png')}
            />
            { hover && <NineSlicePlane
                leftWidth={19} topHeight={19} rightWidth={19} bottomHeight={19}
                width={buttonWidth + 4} height={buttonHeight + 4}
                x={buttonX - 2} y={buttonY - 2} 
                image={require('../images/ui/btn-overlay.png')}
            /> }
            <Sprite image={source}
                x={buttonX + sourceOffsetX} y={buttonY + sourceOffsetY} />
        </Container>
    )
}

export default SpriteButton;