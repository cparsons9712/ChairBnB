import OpenModalButton from "./OpenModalButton";
import NewSpotModal from "./CreateSpotForm";
import { NavLink } from "react-router-dom";
import { getUserSpots } from "../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UpdateSpotModal from "./updateSpot"
import DeleteSpotModal from "./DeleteSpotModal"


const SpotManagement= () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUserSpots());
    }, [dispatch]);

    const spots = useSelector((state) => state.spots.Users);
    const spotArr = Object.values(spots)

    const getRev = (spot) => {
        if(spot.avgRating){
          return spot.avgRating.toFixed(1)
        } else {
          return 'New'
        }
      }

      const displayContents = () => {
        if(!spotArr.length){
          return <OpenModalButton
            buttonText='Create a New Spot'
            modalComponent={<NewSpotModal />}
            />
        }

      }




    return(
        <div id='SpotManageCont'>
            <div id='manageTitle'>
            <h2>Manage Your Spots</h2>

            {displayContents()}


            </div>
            <div className="tileCont">



            {spotArr.map((spot) => {
              return (
                <div className="Mtile">
                  <NavLink key={spot.name} className='spotLink' to={`/spots/${spot.id}`}>

                  <div className="hidden">{spot.name}</div>

                <img
                  src={spot.previewImage}
                  alt="HOUSE"
                  className="MpreviewIMG"
                ></img>
                <p className="Mloc">
                  {spot.city}, {spot.state}
                </p>
                <p className="Mreview"> ★ {getRev(spot)}</p>
                <p className="Mcost">${spot.price} night</p>
           </NavLink>

              <div className="UpdateDeleteButtons">
              <OpenModalButton
                className="UDB"
                buttonText='Update'
                modalComponent={<UpdateSpotModal spot = {spot}/>}
              />
              <OpenModalButton
                className="UDB"
                buttonText='Delete'
                modalComponent={<DeleteSpotModal id = {spot.id}/>}
              />
              </div>

              </div>






          );
        })}

            </div>

        </div>
    )

}

export default SpotManagement;
