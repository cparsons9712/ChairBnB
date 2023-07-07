import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../context/Modal";
import { postReview } from "../store/spot";
import { getSpotReviews } from "../store/spot";


function PostReviewModal({id}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState({})
    const [disable, setDisable] = useState(true)
    const {closeModal} = useModal()


    const handleSubmit = async (e) => {
        
        const payload = {review, stars}
        setErrors({})
        const newRev = await dispatch(postReview(id, payload))
       if(newRev.ok){
        dispatch(getSpotReviews(id))
        closeModal()
        history.push(`spots/${id}`)
       }else{
        console.log(newRev)
        //const res = await newRev.json()
        //setErrors(res.errors)
       }
    }

    useEffect(()=>{
        if(stars !== '' && review.length > 9){
            setDisable(false)
        }else{
            setDisable(true)
        }
    },[stars, review])


    return (
        <form id='reviewform' onSubmit={handleSubmit}>

            <div id='reviewTitle'>
                <button className = 'close' onClick={closeModal}>X</button>

                <h2>How was your stay?</h2>

                <div className="errors">{errors?.stars}</div>
                <div className="errors">{errors?.review}</div>
            </div>

            <textarea value={review} placeholder="Leave your review here ..." id='reviewText'onChange={(e) => setReview(e.target.value)} />

            <label className='reviewStars'>
                <input
                    type="number"
                    value={stars}
                    onChange={(e) => setStars(parseInt(e.target.value))}
                />
                Stars

            </label>

            <button type="submit" disabled={disable}  id='submitNewReview'>Submit Your Review</button>

        </form>
    )
}

export default PostReviewModal;
