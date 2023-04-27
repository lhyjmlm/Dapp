const defaultState = {
    address: [],
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'address':
            newState.address = action.value;
            return newState;
        case 'submit_delegate':
            return defaultState;
        default:
            return state;
    }
}