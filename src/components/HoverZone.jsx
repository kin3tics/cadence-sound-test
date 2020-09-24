import React, { useState } from 'react';
import { Container, NineSlicePlane } from '@inlet/react-pixi';
import Rectangle from './Rectangle';

const hoverSrc = require('../images/ui/btn-overlay.png');

const defaultColor = 0x383838;
const buttonDefaultProps = {
    x: 0,
    y: 0,
    height: 50,
    width: 150
}

function HoverZone({ x, y, height, width, onHover, offHover, onPress}) {
    const [ hover, setHover ] = useState(false);
    let zoneHeight = height ? height : buttonDefaultProps.height;
    let zoneWidth = width ? width : buttonDefaultProps.width;
    let zoneX = x ? x : buttonDefaultProps.x;
    let zoneY = y ? y : buttonDefaultProps.y;
    let buttonFill = defaultColor;
    return (
        <Container interactive={true} buttonMode={true} pointerdown={onPress}
            pointerover={() => {setHover(true); if(typeof onHover === "function") { onHover(); }}} 
            pointerout={() => {setHover(false); if(typeof offHover === "function") { offHover(); }}}>
            <Rectangle fill={buttonFill} opacity={0.0001}
                width={zoneWidth - 4} height={zoneHeight - 4}
                x={zoneX + 2 } y={zoneY + 2} />
            { hover && <NineSlicePlane
                leftWidth={19} topHeight={19} rightWidth={19} bottomHeight={19}
                width={zoneWidth + 16} height={zoneHeight + 16}
                x={zoneX - 8} y={zoneY - 8} 
                image={hoverSrc}
            /> }
        </Container>
    )
}

export default HoverZone;