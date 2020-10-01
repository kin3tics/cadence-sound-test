import React from 'react';
import { Container, Sprite } from '@inlet/react-pixi';
import Rectangle from './Rectangle';
import { evaluateTile } from '../helpers/bg-generator';

import mapData from '../data/map';

const base_ground = require('../images/backgrounds/base_ground.png');
const top_left = require('../images/backgrounds/elevation_tl.png');
const top_middle = require('../images/backgrounds/elevation_tm.png');
const top_right = require('../images/backgrounds/elevation_tr.png');
const bottom_left = require('../images/backgrounds/elevation_bl0.png');
const bottom_middle = require('../images/backgrounds/elevation_bm0.png');
const bottom_right = require('../images/backgrounds/elevation_br0.png');
const bottom_left1 = require('../images/backgrounds/elevation_bl1.png');
const bottom_middle1 = require('../images/backgrounds/elevation_bm1.png');
const bottom_right1 = require('../images/backgrounds/elevation_br1.png');
const bottom_left2 = require('../images/backgrounds/elevation_bl2.png');
const bottom_middle2 = require('../images/backgrounds/elevation_bm2.png');
const bottom_right2 = require('../images/backgrounds/elevation_br2.png');
const ele_left = require('../images/backgrounds/elevation_l.png');
const ele_right = require('../images/backgrounds/elevation_r.png');
const ele_innerleft = require('../images/backgrounds/elevation_il.png');
const ele_innerright = require('../images/backgrounds/elevation_ir.png');
const ele_innerleft1 = require('../images/backgrounds/elevation_itl.png');
const ele_innerright1 = require('../images/backgrounds/elevation_itr.png');

const base_water = require('../images/backgrounds/base_water.png');

const base_dirt = require('../images/backgrounds/base_dirt.png');

const ground_overlay_n = require('../images/backgrounds/ground_overlay_n.png');
const ground_overlay_ne = require('../images/backgrounds/ground_overlay_ne.png');
const ground_overlay_nws = require('../images/backgrounds/ground_overlay_nws.png');
const ground_overlay_nes = require('../images/backgrounds/ground_overlay_nes.png');
const ground_overlay_e = require('../images/backgrounds/ground_overlay_e.png');
const ground_overlay_esw = require('../images/backgrounds/ground_overlay_esw.png');
const ground_overlay_se = require('../images/backgrounds/ground_overlay_se.png');
const ground_overlay_s = require('../images/backgrounds/ground_overlay_s.png');
const ground_overlay_sw = require('../images/backgrounds/ground_overlay_sw.png');
const ground_overlay_w = require('../images/backgrounds/ground_overlay_w.png');
const ground_overlay_nw = require('../images/backgrounds/ground_overlay_nw.png');
const ground_overlay_ns = require('../images/backgrounds/ground_overlay_ns.png');

const ground_overlay_diag_nw = require('../images/backgrounds/ground_overlay_diag_nw.png');
const ground_overlay_diag_ne = require('../images/backgrounds/ground_overlay_diag_ne.png');
const ground_overlay_diag_sw = require('../images/backgrounds/ground_overlay_diag_sw.png');
const ground_overlay_diag_se = require('../images/backgrounds/ground_overlay_diag_se.png');

const ground_overlay_corner_nw = require('../images/backgrounds/ground_overlay_corner_nw.png');
const ground_overlay_corner_ne = require('../images/backgrounds/ground_overlay_corner_ne.png');
const ground_overlay_corner_sw = require('../images/backgrounds/ground_overlay_corner_sw.png');
const ground_overlay_corner_se = require('../images/backgrounds/ground_overlay_corner_se.png');

const object_tree_big = require('../images/backgrounds/grasslands_tree_big.png');
const object_tree_small = require('../images/backgrounds/grasslands_tree_small.png');
const object_tree_stump = require('../images/backgrounds/grasslands_tree_stump.png');
const object_bush = require('../images/backgrounds/global_bush.png');
const object_rock = require('../images/backgrounds/global_rock.png');
const object_banner = require('../images/backgrounds/bannerGoron.png');
const object_stairs = require('../images/backgrounds/stairs.png');

const screenHeight = 576;
const screenWidth = 1024;

const textureHeight = 32;
const halfTexture = 16;
const quarterTexture = 8;

function getElevatedY(y, elevation) {
    return elevation === '2' 
        ? y - halfTexture
        : elevation === '3' 
            ? y - textureHeight - quarterTexture
            : y;
}

function getBordersOf(tile, types) {
    if (types.indexOf(tile.current) > -1) return null;
    let borders = {
        n: types.indexOf(tile.top) > -1,
        ne: types.indexOf(tile.topRight) > -1,
        e: types.indexOf(tile.right) > -1,
        se: types.indexOf(tile.bottomRight) > -1,
        s: types.indexOf(tile.bottom) > -1,
        sw: types.indexOf(tile.bottomLeft) > -1,
        w: types.indexOf(tile.left) > -1,
        nw: types.indexOf(tile.topLeft) > -1
    };
    if (!borders.n && !borders.ne && !borders.e && !borders.se && !borders.s
        && !borders.sw && !borders.w && !borders.nw) return null;

    return borders;
}

function evaluateObjectTile(tile, spriteArrays) {
    const bigTree = 'T';
    const smallTree = 't';
    const stump = '+';
    const boulder = 'o';
    const bush = 'n';
    const banner = 'B';
    const stairs = '^';
    let spriteArrayIndex = parseInt(tile.elevation.current) - 1;
    let y = getElevatedY(tile.y, tile.elevation.current);
    let id = `object_${tile.row}_${tile.col}`;
    switch (tile.object.current) {
        case bigTree:
            spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={tile.x} y={y - textureHeight - halfTexture} source={object_tree_big} />);
            break;
        case smallTree:
            spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={tile.x} y={y - halfTexture} source={object_tree_small} />);
            break;
        case stump:
            spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={tile.x} y={y} source={object_tree_stump} />);
            break;
        case boulder:
            spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={tile.x} y={y} source={object_rock} />);
            break;
        case bush:
            spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={tile.x} y={y} source={object_bush} />);
            break;
        case banner:
            spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={tile.x} y={y - textureHeight} source={object_banner} />);
            break;
        case stairs:
            spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={tile.x} y={y + textureHeight} source={object_stairs} />);
            break;
        default:
            break;
    }
}

function evaluateGroundTile(data, spriteArray) {
    let tile = data.ground;
    const water = 'wW';
    const dirt = ',\\/';
    const grass = '.';
    let grassBorders = getBordersOf(tile, grass);

    let id = `base_${data.row}_${data.col}_0`;

    if (water.indexOf(tile.current) > -1) {
        spriteArray.push(<Sprite key={`${id}0`} x={data.x} y={data.y} source={base_water} />);
    } else if (dirt.indexOf(tile.current) > -1) {
        spriteArray.push(<Sprite key={`${id}0`} x={data.x} y={data.y} source={base_dirt} />);
    } else {
        spriteArray.push(<Sprite key={`${id}0`} x={data.x} y={data.y} source={base_ground} />);
    }

    if(grassBorders) {
        if(tile.current === '\\') {
            if (grassBorders.e) {
                spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_diag_ne} />)
            } else if (grassBorders.w) {
                spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_diag_sw} />)
            }
        } else if(tile.current === '/') {
            if (grassBorders.e) {
                spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_diag_se} />)
            } else if (grassBorders.w) {
                spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_diag_nw} />)
            }
        } else if (grassBorders.n && grassBorders.w && grassBorders.s) {
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_nws} />)
        } else if (grassBorders.e && grassBorders.w && grassBorders.s) {
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_esw} />)
        } else if (grassBorders.n && grassBorders.e && grassBorders.s) {
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_nes} />)
        } else if (grassBorders.n && grassBorders.e) {
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_ne} />)
        } else if (grassBorders.n && grassBorders.w) { 
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_nw} />)
        } else if (grassBorders.s && grassBorders.e) { 
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_se} />)
        } else if (grassBorders.s && grassBorders.w) { 
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_sw} />)
        } else if (grassBorders.n && grassBorders.s) { 
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_ns} />)
        } else if (grassBorders.n) { 
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_n} />)
        } else if (grassBorders.e) {
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_e} />)
        } else if (grassBorders.s) {
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_s} />)
        } else if (grassBorders.w) {
            spriteArray.push(<Sprite key={id} x={data.x} y={data.y} source={ground_overlay_w} />)
        }
        if(!grassBorders.n && !grassBorders.e && grassBorders.ne) {
            spriteArray.push(<Sprite key={`${id}1`} x={data.x} y={data.y} source={ground_overlay_corner_ne} />)
        }
        if(!grassBorders.s && !grassBorders.e && grassBorders.se) {
            spriteArray.push(<Sprite key={`${id}2`} x={data.x} y={data.y} source={ground_overlay_corner_se} />)
        }
        if(!grassBorders.s && !grassBorders.w && grassBorders.sw) {
            spriteArray.push(<Sprite key={`${id}3`} x={data.x} y={data.y} source={ground_overlay_corner_sw} />)
        }
        if(!grassBorders.n && !grassBorders.w && grassBorders.nw) {
            spriteArray.push(<Sprite key={`${id}4`} x={data.x} y={data.y} source={ground_overlay_corner_nw} />)
        }
    }
}

function evaluateElevationTile(data, spriteArrays) {
    let tile = data.elevation;
    if(tile.current === '1') return;

    let id = `ele_${data.row}_${data.col}_${tile.current}`;
    let lowerTop = tile.top && parseInt(tile.current) - parseInt(tile.top) > 0;
    let lowerLeft = tile.left && parseInt(tile.current) - parseInt(tile.left) > 0;
    let lowerRight = tile.right && parseInt(tile.current) - parseInt(tile.right) > 0;
    let lowerBottom = tile.bottom && parseInt(tile.current) - parseInt(tile.bottom) > 0;
    let lowerTopLeft = tile.topLeft && parseInt(tile.current) - parseInt(tile.topLeft) > 0;
    let lowerTopRight = tile.topRight && parseInt(tile.current) - parseInt(tile.topRight) > 0;
    let spriteArrayIndex = parseInt(tile.current) - 1;
    let y = getElevatedY(data.y, tile.current);

    if (lowerTop && lowerLeft) {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={top_left} />);
    } else if (lowerTop && lowerRight) {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={top_right} />);
    } else if (lowerTop) {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={top_middle} />);
    } else if (lowerLeft && !lowerTopLeft) {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={ele_innerleft} />)
    } else if (lowerLeft) {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={ele_left} />)
    } else if (lowerRight && !lowerTopRight) {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={ele_innerright} />)
    } else if (lowerRight) {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={ele_right} />)
    } else if (lowerTopLeft) {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={ele_innerleft1} />)
    } else if (lowerTopRight) {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={ele_innerright1} />)
    } else {
        spriteArrays[spriteArrayIndex].push(<Sprite key={id} x={data.x} y={y} source={base_ground} />);
    }

    if (lowerBottom) {
        y = y + textureHeight;
        let isThirdLevel = tile.current === '3';
        if(lowerLeft && isThirdLevel) {
            spriteArrays[spriteArrayIndex - 2].push(<Sprite key={`${id}1`} x={data.x} y={y + halfTexture + quarterTexture -1} source={bottom_left1} />);
            spriteArrays[spriteArrayIndex - 1].push(<Sprite key={`${id}0`} x={data.x} y={y} source={bottom_left2} />);
        } else if (lowerLeft) {
            spriteArrays[spriteArrayIndex - 1].push(<Sprite key={`${id}0`} x={data.x} y={y} source={bottom_left} />)
        } else if (lowerRight && isThirdLevel) {
            spriteArrays[spriteArrayIndex - 2].push(<Sprite key={`${id}1`} x={data.x} y={y + halfTexture + quarterTexture -1} source={bottom_right1} />);
            spriteArrays[spriteArrayIndex - 1].push(<Sprite key={`${id}0`} x={data.x} y={y} source={bottom_right2} />);
        } else if (lowerRight) {
            spriteArrays[spriteArrayIndex - 1].push(<Sprite key={`${id}0`} x={data.x} y={y} source={bottom_right} />)
        } else if(isThirdLevel) {
            spriteArrays[spriteArrayIndex - 2].push(<Sprite key={`${id}1`} x={data.x} y={y + halfTexture + quarterTexture -1} source={bottom_middle1} />);
            spriteArrays[spriteArrayIndex - 1].push(<Sprite key={`${id}0`} x={data.x} y={y} source={bottom_middle2} />);
        } else {
            spriteArrays[spriteArrayIndex - 1].push(<Sprite key={`${id}0`} x={data.x} y={y} source={bottom_middle} />)
        }
    }
}

function buildSpriteMaps(data) {
    let elevationSpriteArray = [[],[],[]];
    let objectTileArray = [[],[],[]];
    let groundSpriteArray = [];

    for (let index = 0; index < 220; index ++) {
        evaluateTile(data, index, (tile) => { 
            evaluateGroundTile(tile, groundSpriteArray);
            evaluateElevationTile(tile, elevationSpriteArray); 
            evaluateObjectTile(tile, objectTileArray);
        });
    }
    return {
        ground: groundSpriteArray, 
        elevation: elevationSpriteArray,
        objects: objectTileArray
    };
}

function Background({ trackZone }) {
    const mapMetaData = mapData[0]; //TODO: Get index where zone === trackZone
    let sprites = buildSpriteMaps(mapMetaData);
    return (
        <Container>
            <Rectangle fill={0x4fb056}
                width={screenWidth} height={screenHeight} />
            <Container scale={1.6} y={10}>
                {sprites.ground}
                {sprites.elevation[0]}
                {sprites.objects[0]}
                {sprites.elevation[1]}
                {sprites.objects[1]}
                {sprites.elevation[2]}
                {sprites.objects[2]}
            </Container>
        </Container>
    )
}

export default Background;