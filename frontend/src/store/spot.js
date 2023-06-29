// Action Variables
const LOAD = 'spot/LOAD';
const LOADONE = 'spot/LOAD/ONE'
// ACTIONS

const loadAll = spots => ({
    type: LOAD,
    spots
})

const loadOne = spot => ({
    type: LOADONE,
    spot
})

//THUNKS
export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots')
    if(response.ok) {
        const spots = await response.json()
        dispatch(loadAll(spots))
    }
}

export const getOneSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`)
    if(response.ok) {
        const spot = await response.json()
        dispatch(loadOne(spot))
    }
}



// reducer
const initialState = {}
const spotReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD:
            return {...state, ...action.spots}
        case LOADONE:
            return {...state, ...action.spot}

        default:
            return state;
    }
}

export default spotReducer
