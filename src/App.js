import React, { useState, useEffect } from 'react';
import { View } from 'react-native'
import * as PIXI from 'pixi.js'
import { Stage } from '@inlet/react-pixi'
import { Provider } from 'react-redux'
import { store } from './configureStore'

import { MainScreen } from './screens/main';

const App = () => {
  let [isLoaded, setLoaded] = useState(false);
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
    // let options = { crossOrigin: true };
    // let loader = PIXI.Loader.shared
    //   .add('fnt', './assets/PixelOperatorBold.fnt', options)
    //   .add('png', './assets/PixelOperatorBold.png', options)
    //   .load((loader, resources) => { 
    //     console.log(resources);
    //     setLoaded(true); 
    //   })
  }, []);
  
  return (
    <View style={{backgroundColor: '#222222', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width:'1024px', height: '576px'}}>
        {isLoaded && <Stage width={1024} height={576} options={{ backgroundColor: 0xeef1f5, resolution: window.devicePixelRatio, }}>
          <Provider store={store}>
              <MainScreen/>
          </Provider>
        </Stage>}
      </View>
    </View>
  );
}


export default App;