const defaultState = {
    username: [],
    extra: []
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'username':
            newState.username = action.value;
            return newState;
        case 'extra':
            newState.extra = action.value;
            return newState;
        case 'submit_signup':
            return defaultState;
        default:
            return state;
    }
}