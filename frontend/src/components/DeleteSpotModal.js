import { useModal } from "../context/Modal";
import { removeSpot , getUserSpots} from "../store/spot";
import { useDispatch, } from "react-redux";

const DeleteSpotModal = ({id}) => {
    const {closeModal} = useModal()
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(removeSpot(id))
        await dispatch(getUserSpots())
        closeModal()
    }

    return (
        <form className="DeleteSpotCont" onSubmit={handleSubmit}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this spot?</p>
        <div className="deleteConfirmButtonsCont">
            <button id='yes' type='submit'>Yes (Delete Spot)</button>
            <button id='no' onClick={closeModal}>No (Keep Spot)</button>
        </div>
        </form>
    )
}

export default DeleteSpotModal;
