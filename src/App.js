import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native'
import * as PIXI from 'pixi.js'
import { Stage } from '@inlet/react-pixi'
import { Provider, connect } from 'react-redux'
import { store } from './configureStore'

import { SplashScreen } from './screens/splash';
import { MainScreen } from './screens/main';
import { MapScreen } from './screens/map';
import { TestScreen } from './screens/test';

function roundToHalf(value) {
  var converted = parseFloat(value); // Make sure we have a number
  var decimal = (converted - parseInt(converted, 10));
  decimal = Math.round(decimal * 10);
  if (decimal === 5) { return (parseInt(converted, 10)+0.5); }
  if ( (decimal < 5) ) {
     return Math.round(converted);
  } else {
     return (parseInt(converted, 10)+0.5);
  }
}

const baseX = 1024;
const baseY = 576;

const window = Dimensions.get("window");

const mapStateToProps = state => ({
  ui: state.ui
})

const Router = connect(mapStateToProps)(({ ui }) => {
  switch (ui.currentScreen) {
    case 'test':
      return <TestScreen />
    case 'map':
      return <MapScreen />
    case 'splash':
      return <SplashScreen />
    default:
      return <MainScreen zone={ui.currentScreen} />
      
  }
});

const App = () => {
  let [isLoaded, setLoaded] = useState(false);
  let [dimensions, setDimensions] = useState(window);
  const onWindowChange = ({window}) => { setDimensions(window); };
  useEffect(() => {
    PIXI.settings.ROUND_PIXELS = true;
    const pixelFont = new FontFace('PixelOperator', 'url(/assets/PixelOperator-Bold.ttf)');
    const pixelFont2 = new FontFace('PixelOperatorMono8', 'url(/assets/PixelOperatorMono8.ttf)');
    const hylianFont = new FontFace('Hylian', 'url(/assets/HyliaSerifBeta-Regular.otf)');

    Promise.all([pixelFont.load(), pixelFont2.load(), hylianFont.load()])
      .then((fonts) => {
        document.fonts.add(fonts[0]);
        document.fonts.add(fonts[1]);
        document.fonts.add(fonts[2]);
        setLoaded(true);
        console.log('Fonts loaded');
      });
  }, []);

  useEffect(() => { 
    Dimensions.addEventListener("change", onWindowChange);
    return () => { Dimensions.removeEventListener("change", onWindowChange); }
  })

  let scaleX = roundToHalf(dimensions.width / baseX)
  let scaleY = roundToHalf(dimensions.height / baseY)
  let scale = scaleX < scaleY ? scaleX : scaleY;
  if(scale < 0.5) scale = 0.5;

  return (
    <View style={{backgroundColor: '#222222', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width:`${ scale * baseX }px`, height: `${scale * baseY}px` }}>
        {isLoaded && <Stage scale={scale} width={1024} height={576} options={{ backgroundColor: 0xeef1f5, resolution: window.devicePixelRatio, }}>
          <Provider store={store}>
            <Router />
          </Provider>
        </Stage>}
      </View>
    </View>
  );
}


export default App;