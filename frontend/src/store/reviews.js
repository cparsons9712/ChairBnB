import { csrfFetch } from "./csrf";

const LOADREV = 'spot/LOAD/REVIEWS'
const CURRENTREVUSERS = 'spot/Reviews/users'

const loadRev = (revs, id) => ({
    type: LOADREV,
    revs
})

const getReviewsUsers = users => ({
    type: CURRENTREVUSERS,
    users
})

export const getSpotReviews = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/reviews`)
    if(response.ok) {
        const reviews = await response.json()
        console.log('!!!!!!! REVIEWS !!!!!!')
        console.log(reviews)
        dispatch(loadRev(reviews, id))
    }
}

export const getSpotReviewsUsers = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/reviews`)
    if(response.ok) {
        const reviews = await response.json()
        console.log('!!!!!!! REVIEWS !!!!!!')
        console.log(reviews)
        dispatch(loadRev(reviews))
    }
}

const initialState = {}
const reviewReducer = (state = initialState, action) => {

    let newState = {...state}
    switch (action.type){

        case LOADREV:
            newState = {[action.id]: action.revs}
            return newState

        default:
            return newState;
    }
}

export default reviewReducer
