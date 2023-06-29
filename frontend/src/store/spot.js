// Action Variables
const LOAD = 'spot/LOAD';
const LOADONE = 'spot/LOAD/ONE'
const LOADREV = 'spot/LOAD/REVIEWS'
// ACTIONS

const loadAll = spots => ({
    type: LOAD,
    spots
})

const loadOne = spot => ({
    type: LOADONE,
    spot
})

const loadRev = revs => ({
    type: LOADREV,
    revs
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
export const getSpotReviews = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/reviews`)
    if(response.ok) {
        const reviews = await response.json()
        dispatch(loadRev(reviews))
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
        case LOADREV:
            return {...state, ...action.revs}

        default:
            return state;
    }
}

export default spotReducer
