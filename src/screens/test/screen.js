import React from 'react';
import { Container } from '@inlet/react-pixi'
import Rectangle from '../../components/Rectangle';
import Background from '../../components/Background';

const screenHeight = 576;
const screenWidth = 1024;

const TestScreen = () => {
    return (<Container>
        <Rectangle fill={0x4fb056}
            width={screenWidth} height={screenHeight} />
        <Background />
    </Container>)
}

export default TestScreen;