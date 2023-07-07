import { useSelector } from "react-redux";
import { csrfFetch } from "./csrf";


// Action Variables
const LOAD = 'spot/LOAD';
const LOADONE = 'spot/LOAD/ONE'
const LOADREV = 'spot/LOAD/REVIEWS'
const CREATESPOT = 'spot/create'
const CREATEIMAGE = 'spot/create/image'
const SUBMITREVIEW = 'spot/create/review'

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

const createSpot= spot => ({
    type: CREATESPOT,
    spot
})

const createImage = image => ({
    type: CREATEIMAGE,
    image
})

const createReview = rev => ({
    type: SUBMITREVIEW,
    rev
})

//THUNKS
export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots')
    if(response.ok) {
        const spots = await response.json()
        dispatch(loadAll(spots.Spots))
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

export const createNewSpot = (spot) => async dispatch => {
    try{const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(spot)
    })
        const newSpot = await response.json();
        dispatch(createSpot(newSpot))

        return newSpot
    }catch(e){
        alert('Please fix errors')
        return e
    }
}

export const addImages = (id, image) => async dispatch => {
    try{
        const response = await csrfFetch(`/api/spots/${id}/images`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(image)
        })
        const newImage = await response.json();
        dispatch(createImage(newImage))

        return newImage
    }catch(e) {
        return e
    }
}

export const postReview = (id, review) => async dispatch =>{


    try{
        const response = await csrfFetch(`/api/spots/${id}/reviews`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review)
        })
        const newReview= await response.json();
        newReview.User =


        dispatch(createReview(newReview))
        return newReview
    }catch(e) {return e}
}



// reducer
const initialState = {All:{}, Current: {Reviews: []}}
const spotReducer = (state = initialState, action) => {

    const newState = {All:{...state.All}, Current:{...state.Current}}
    switch (action.type){
        case LOAD:
            action.spots.forEach((spot)=>{
                newState.All[spot.id] = spot
            })
            return newState;
        case LOADONE:
                newState.Current = action.spot
            return newState;
        case LOADREV:
            newState.Current.Reviews = [...action.revs.Reviews]
            return newState
        case CREATESPOT:
                newState.Current = action.spot;
                newState.All[action.spot.id] = action.spot
            return newState;
        case CREATEIMAGE:
            newState.Current.SpotImages = [...newState.Current.SpotImages, action.image]
            return newState;
        case SUBMITREVIEW:
            newState.Current.Reviews = [...newState.Current.Reviews, action.rev]
            return newState;


        default:
            return state;
    }
}

export default spotReducer
