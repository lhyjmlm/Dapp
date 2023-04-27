const defaultState = {
    title: [],
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'enroll_title':
            newState.title = action.value;
            return newState;
        case 'submit_enroll':
            return defaultState;
        default:
            return state;
    }
}