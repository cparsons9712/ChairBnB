import { useModal } from "../context/Modal";
import { removeReview, getSpotReviews, getOneSpot } from "../store/spot";
import { useDispatch, } from "react-redux";

const DeleteReviewModal = ({revId, spotId}) => {
    const {closeModal} = useModal()
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(removeReview(revId))
        dispatch(getOneSpot(spotId))
        dispatch(getSpotReviews(spotId))

        closeModal()


    }

    return (
        <form className="DeleteSpotCont" onSubmit={handleSubmit}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this Review?</p>
        <div className="deleteConfirmButtonsCont">
            <button id='yes' type='submit'>Yes (Delete Review)</button>
            <button id='no' onClick={closeModal}>No (Keep Review)</button>
        </div>
        </form>
    )
}

export default DeleteReviewModal;
