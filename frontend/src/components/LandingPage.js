import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpots } from "../store/spot";




function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const spots = useSelector((state) => state.spots.All);




  const getRev = (spot) => {
    if(spot.avgRating){
      return spot.avgRating.toFixed(1)
    } else {
      return 'New'
    }
  }

  return (

  Object.values(spots).length ?



      <div id="landingCont">

        {Object.values(spots)
        .map((spot) => {
          return (

            <NavLink key={spot.name} className='homeSpotLink' to={`/spots/${spot.id}`}>

              <div className="tile" title={spot.name}>
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

  :<div id='loading'>LOADING ...... </div>);
}


export default LandingPage;
