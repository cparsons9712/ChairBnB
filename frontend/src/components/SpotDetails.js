import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneSpot, getSpotReviews } from "../store/spot";

import SpotReviews from "./SpotReviews";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpot(id));
    dispatch(getSpotReviews(id))
  }, [dispatch, id]);

  const spot = useSelector((state) => state.spots.Current);
  const images = useSelector((state) => state.spots.Current.SpotImages);
  const owner = useSelector((state)=> state.spots.Current.Owner)
  const user = useSelector((state)=> state.session.user)


  const getimages = () => {
    if(Array.isArray(images)){
      const idArr = ['a','b','c','d','e']
      const imageLinks = []
      for(let i = 0; i < images.length; i++){
        let id = idArr[i]

        imageLinks.push(<img key={images[i].id} src={images[i].url} alt="Spot" className="spotImage" id={id}/>)
      }

      return imageLinks
  }
}
const getOwner = () => {
  if(owner){
    return <h4>Hosted by {owner.firstName} {owner.lastName}</h4>
  }
}

const getAvg = () => {
  if(spot.avgStarRating){return spot.avgStarRating.toFixed(1)}
  else{return 'New'}
}

const getNumRev = () =>{
  if(spot.numReviews === 0) {return ''}
  if (spot.numReviews === 1) {return `ꞏ 1 Review`} else{
    return `ꞏ ${spot.numReviews} Reviews`
  }
}


const reserve = () => {
  alert("Feature Coming Soon")
}


  if (spot) {
    return (
      <div className="spotDetails">
        <h3>{spot.name}</h3>
        <h4>
          {spot.city}, {spot.state}, {spot.country}
        </h4>
        <div className="spotImages">
          {getimages()}
        </div>
        <div className="bottomSpot">
        {getOwner()}

        <p id='desc'>{spot.description}</p>

        <div id='reserveBox'>
          <div id="prc">${spot.price} night</div>
          <div id="rws">★ {getAvg()} {getNumRev()} </div>
          <div id="reserve"><button onClick={reserve}>Reserve</button></div>
        </div>
        </div>

        <div id="allRev">
          <h3>★ {getAvg()}  {getNumRev()} </h3>
        </div>

        <SpotReviews id={id} user={user} />
      </div>

    );
  } else {
    return <h4>Loading Spot Details ...</h4>;
  }
};

export default SpotDetails;
