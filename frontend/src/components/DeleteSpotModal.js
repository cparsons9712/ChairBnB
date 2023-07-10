import { useModal } from "../context/Modal";

const DeleteSpotModal = ({id}) => {
    const {closeModal} = useModal()

    const onDelete = (id) => {
        alert('Spot will be DESTROYED. SEND IN THE NUKES')
    }

    return (
        <div className="DeleteSpotCont">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this spot?</p>
        <div className="deleteConfirmButtonsCont">
            <button id='yes' onClick={onDelete}>Yes (Delete Spot)</button>
            <button id='no' onClick={closeModal}>No (Keep Spot)</button>
        </div>
        </div>
    )
}

export default DeleteSpotModal;
