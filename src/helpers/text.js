export function capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getNiceZoneName(zone) {
    switch (zone) {
        case 'woods':
            return 'Lost Woods';
        case 'swamp':
            return 'Lost Swamp';
        case 'mountain': 
            return 'Death Mountain';
        case 'temple':
            return 'Temple of Storms';
        case 'valley':
            return 'Gerudo Valley';
        case 'ruins':
            return 'Gerudo Ruins';
        case 'overworld':
            return 'Overworld';
        case 'castle':
            return 'Hyrule Castle';
        case 'lake':
            return 'Frozen Grotto';
        case 'village':
            return 'Kakariko Village';
        default:
            return '';
    }
}

export function getNiceModName(mod) {
    switch (mod) {
        case 'shop':
            return 'Shopkeeper';
        default:
            return capitalize(mod);
    }
}

export function getNiceFullSongName(currentTrack) {
    if (!currentTrack) return '';
    let trackPieces = currentTrack.split('_');
    let niceName = '';
    if(trackPieces[0]) niceName += getNiceZoneName(trackPieces[0]);
    if(trackPieces[1]) niceName += ` - ${capitalize(trackPieces[1])}`;
    if(trackPieces[2]) niceName += ` (feat. ${getNiceModName})`;
    return niceName
}