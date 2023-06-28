// Action Variables
const LOAD = 'spot/LOAD';
// ACTIONS
const loadAll = spots => ({
    type: LOAD,
    spots

})

//THUNKS
export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots')

    if(response.ok) {
        const spots = await response.json()

        dispatch(loadAll(spots))
    }
}



// reducer
const initialState = {}
const spotReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD:

            return {...state, ...action.spots}

        default:
            return state;
    }
}

export default spotReducer
