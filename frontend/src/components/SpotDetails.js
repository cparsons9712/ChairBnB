import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneSpot, getSpotReviews } from "../store/spot";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpot(id));
    dispatch(getSpotReviews(id))
  }, [dispatch, id]);

  const spot = useSelector((state) => state.spots);
  const images = useSelector((state) => state.spots.SpotImages);
  const owner = useSelector((state)=> state.spots.Owner)
  const reviews = useSelector((state)=> state.spots.Reviews)
  console.log('THIS IS THE REVIEW STATE')
  console.log(reviews)

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
  if(spot.avgStarRating){return spot.avgStarRating}
  else{return 'New'}
}

const getNumRev = () =>{
  if(spot.numReviews === 0) {return ''}
  if (spot.numReviews === 1) {return `ꞏ 1 Review`} else{
    return `ꞏ ${spot.numReviews} Reviews`
  }
}

const displayReviews = () => {
  if(reviews.length > 0){

    return reviews.map((rev)=>{
      let date = rev.createdAt
      let year = rev.createdAt.slice(0,4)
      let month = rev.createdAt.slice(5,7)
      let textMonth = {'01':'January', '02': 'Febuary','03': 'March','04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'}
      return <div>
        <h4>{rev.User.firstName}</h4>
        <p>{textMonth[month]} {year}</p>
        <p>{rev.review}</p>
      </div>
    })
  } else {
    return <div>Be the first to post a review!"</div>
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
          <div id="price">${spot.price} night</div>
          <div id="reviews">★ {getAvg()} {getNumRev()} </div>
          <div id="reserve"><button onClick={reserve}>Reserve</button></div>
        </div>
        </div>

        <div id="allRev">
          <h3>★ {getAvg()}  {getNumRev()} </h3>
        </div>
        {displayReviews()}



      </div>

    );
  } else {
    return null;
  }
};

export default SpotDetails;
