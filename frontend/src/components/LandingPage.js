import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import { getAllSpots } from "../store/spot";
import ReactTooltip from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const spots = useSelector((state) => state.spots.Spots);

  const handleClick = (id) => {
    history.push(`spots/${id}`);
  };

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
                <p className="review"> ★ {spot.avgRating}</p>
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
