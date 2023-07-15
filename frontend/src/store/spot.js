import { csrfFetch } from "./csrf";


// Action Variables
const LOAD = 'spot/LOAD';
const LOADONE = 'spot/LOAD/ONE'
const LOADREV = 'spot/LOAD/REVIEWS'
const CREATESPOT = 'spot/create'
const CREATEIMAGE = 'spot/create/image'
const SUBMITREVIEW = 'spot/create/review'
const LOADUSERSPOTS = 'spot/LOAD/USERS'
const DELETESPOT = 'spot/DELETE'
const DELETEREVIEW = 'spot/delete/review'

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

const loadUserSpots = spots => ({
    type: LOADUSERSPOTS,
    spots
})

const deleteSpot = id => ({
    type:DELETESPOT,
    id
})

const deleteReview = id => ({
    type: DELETEREVIEW,
    id
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
        dispatch(createReview(newReview))
        return newReview
    }catch(e) {
        console.log("THUNK FOR POST REVIEW WENT TO ERROR RESPONSE" + e)
        return e}
}

export const getUserSpots = () => async dispatch => {
    const response = await fetch('/api/session/spots')
    if(response.ok) {
        const spots = await response.json()
        dispatch(loadUserSpots(spots.Spots))
    }
}

export const editSpot = (id, spot) => async dispatch => {

    try{const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
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

export const removeSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`,{
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(deleteSpot(id))
    }
    else{
        alert('Spot not deleted')
        console.log(response)
    }
}

export const removeReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`,{
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(deleteReview(id))
    }
    else{
        alert('Review not deleted')
        console.log(response)
        return await response.json()
    }
}



// reducer
const initialState = {All:{}, Current: {}, Reviews: {},Users: {}}
const spotReducer = (state = initialState, action) => {

    const newState = {All:{...state.All}, Current:{...state.Current}, Users:{}, Reviews: {...state.Reviews}}

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
            newState.Reviews = {};
            let reviews = action.revs.Reviews || [];
            reviews.forEach((review)=>{
                newState.Reviews[review.id] = review
            })
            return newState
        case CREATESPOT:
                newState.Current = action.spot;
                newState.All[action.spot.id] = action.spot
            return newState;
        case CREATEIMAGE:
            newState.Current.SpotImages = [action.image]
            return newState;
        case SUBMITREVIEW:
                newState.Reviews[action.rev.id] = action.rev
            return newState;
        case LOADUSERSPOTS:
            action.spots.forEach((spot)=>{
                newState.Users[spot.id] = spot
            })
            return newState;
        case DELETESPOT:
            delete newState.All[action.id];
            return newState;
        case DELETEREVIEW:
            delete newState.Reviews[action.id];
            return newState;
        default:
            return state;

    }
}

export default spotReducer
