import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { postReview } from "../store/spot";
import { getSpotReviews, getOneSpot } from "../store/spot";
import StarRating from "./starRating";
import { FaStar } from 'react-icons/fa'


function PostReviewModal({id}) {
    const dispatch = useDispatch()
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null)

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState({})
    const [disable, setDisable] = useState(true)
    const {closeModal} = useModal()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {review, stars}
        setErrors({})
        const newRev = await dispatch(postReview(id, payload))

       if(newRev.id){
        dispatch(getOneSpot(id))
        dispatch(getSpotReviews(id))
        closeModal()


       }else{

        const res = await newRev.json()
        setErrors(res.errors)
       }
    }

    useEffect(()=>{
        if(stars && review.length > 9){
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
                {Object.values(errors)?.map((error)=>{
                    return <div>{error}</div>
                })}


            </div>

            <textarea value={review} placeholder="Leave your review here ..." id='reviewText'onChange={(e) => setReview(e.target.value)} />

            <div id='stars'>
                {[...Array(5)].map((star, i)=>{
                    const ratingValue = i + 1;

                    return <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setStars(ratingValue)}
                        />

                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || stars) ? "#ffc107 " : "#e4e5e9"}
                            onMouseEnter={()=>setHover(ratingValue)}
                            onMouseLeave={()=> setHover(null)}
                        />
                    </label>
                })}
                <p id='starLabel'> Stars </p>

            </div>



            <button type="submit" disabled={disable}  id='submitNewReview'>Submit Your Review</button>

        </form>
    )
}

export default PostReviewModal;
