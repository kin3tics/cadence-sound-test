const ui = (
    state = { 
        currentScreen: "splash"
    }, 
    action ) => {
    switch (action.type) {
        case('SET_SCREEN'): 
            return Object.assign({}, state, { 
                currentScreen: action.data
            });
        default:
            return state;
    }
}

export default ui