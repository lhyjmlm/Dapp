const defaultState = {
    title: [],
    detail: [],
    limitation: [],
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'newconf_title':
            newState.title = action.value;
            return newState;
        case 'detail':
            newState.detail = action.value;
            return newState;
        case 'limitation':
            newState.limitation = action.value;
            return newState;
        case 'submit_newconf':
            return defaultState;
        default:
            return state;
    }
}