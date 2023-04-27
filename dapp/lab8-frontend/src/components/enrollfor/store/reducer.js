const defaultState = {
    title: [],
    username: []
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'enrollfor_username':
            newState.username = action.value;
            return newState;
        case 'enrollfor_title':
            newState.title = action.value;
            return newState;
        case 'submit_enrollfor':
            return defaultState;
        default:
            return state;
    }
}