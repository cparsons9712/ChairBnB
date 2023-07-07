import OpenModalButton from "./OpenModalButton";
import NewSpotModal from "./CreateSpotForm";
import { NavLink } from "react-router-dom";

const SpotManagement= () => {

    const getRev = (spot) => {
        if(spot.avgRating){
          return spot.avgRating
        } else {
          return 'New'
        }
      }

    return(
        <div id='SpotManageCont'>
            <h2>Manage Your Spots</h2>

            <OpenModalButton
            buttonText='Create a New Spot'
            modalComponent={<NewSpotModal />}
            />

            <div className="landingCont">
            {Object.values(spots)
        .map((spot) => {
          return (

            <NavLink key={spot.name} to={`/spots/${spot.id}`}>

              <div className="tile">
              <div className="hidden">{spot.name}</div>

                <img
                  src={spot.previewImage}
                  alt="HOUSE"
                  className="previewIMG"
                ></img>
                <p className="loc">
                  {spot.city}, {spot.state}
                </p>
                <p className="review"> ★ {getRev(spot)}</p>
                <p className="cost">${spot.price} night</p>
              </div>
            </NavLink>
          );
        })}

            </div>

        </div>
    )

}

export default SpotManagement;
