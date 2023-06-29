import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneSpot } from "../store/spot";

const SpotDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [dispatch, id]);

  const spot = useSelector((state) => state.spots);
  const images = useSelector((state) => state.spots.SpotImages);

const getimages = () => {
    if(Array.isArray(images)){
      const idArr = ['a','b','c','d','e']
      const imageLinks = []
      for(let i = 0; i < images.length; i++){
        let id = idArr[i]
        console.log(idArr[i])
        imageLinks.push(<img key={images[i].id} src={images[i].url} alt="Spot" className="spotImage" id={id}/>)
      }

      return imageLinks
  }
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
      </div>
    );
  } else {
    return null;
  }
};

export default SpotDetails;
