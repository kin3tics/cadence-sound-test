export const SET_SCREEN = 'SET_SCREEN';

export function setScreen(screen) {
    return {
        type: SET_SCREEN,
        data: screen
    }
};