import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import { getAllSpots } from "../store/spot";
import ReactTooltip from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const spots = useSelector((state) => state.spots.Spots);


  const getRev = (spot) => {
    if(spot.avgRating){
      return spot.avgRating
    } else {
      return 'New'
    }
  }

  if (spots) {
    return (
      <div id="landingCont">

        {spots.map((spot) => {
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
    );
  } else return null;
}
export default LandingPage;
