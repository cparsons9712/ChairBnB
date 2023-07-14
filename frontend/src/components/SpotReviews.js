import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../store/spot";
import OpenModalButton from "./OpenModalButton";
import PostReviewModal from "./PostReview";
import DeleteReviewModal from "./DeleteReview";

function SpotReviews({ id , user}) {
  const dispatch = useDispatch();
  const [isOwner, setIsOwner] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const[hasReview, setHasReview] = useState(false)


  useEffect(() => {
    dispatch(getSpotReviews(id));
  }, [dispatch, id]);


  const owner = useSelector((state) => state.spots.Current.Owner);
  let reviews = useSelector((state) => state.spots.Reviews);
  reviews = Object.values(reviews);

  useEffect(() => {
    if (user && owner && owner.id === user.id) {
      setIsOwner(true);
    }else{
      setIsOwner(false)
    }
  }, [user, owner]);

  useEffect(() => {
    if (reviews) {
      setReviewsLoaded(true);
    }
  }, [reviews]);

  const getDeleteButton = (posterID, revID) => {
    // Render a delete button if the current user is the author of the review
    if (user && user.id === posterID) {
      return (
        <div id="deleteReviewButton">
        <OpenModalButton
          buttonText="Delete"
          modalComponent={<DeleteReviewModal revId={revID} spotId={id} />}
        />
        </div>
      );
    } else {
      return null;
    }
  };

  useEffect(()=>{
    if(user){
    const users = reviews.map((review) => review.User?.id);
        if (!users.includes(user.id)) {
          setHasReview(false)
        }else{
          setHasReview(true)
        }
    }
  },[reviews, user, id])

  const displayPostReviewButton = () => {
    if (reviewsLoaded && user) {
      if(isOwner || hasReview){
        return null
      }else{
        return (
          <div id="postReviewButton">
            <OpenModalButton
              buttonText="Post Your Review"
              modalComponent={<PostReviewModal id={id} />}
            />
          </div>
      )}
    }
  };

  const displayReviews = () => {
    if (reviewsLoaded) {
      if (reviews && reviews.length > 0) {
        // Reverse the order of reviews
        reviews = reviews.reverse();
        return reviews.map((rev) => {
          // Format the review creation date
          let year = rev.createdAt.slice(0, 4);
          let month = rev.createdAt.slice(5, 7);
          let textMonth = {
            '01': 'January',
            '02': 'February',
            '03': 'March',
            '04': 'April',
            '05': 'May',
            '06': 'June',
            '07': 'July',
            '08': 'August',
            '09': 'September',
            '10': 'October',
            '11': 'November',
            '12': 'December',
          };
          return (
            <div key={rev.id}>
              <h4>{rev.User?.firstName}</h4>
              <p>
                {textMonth[month]} {year}
              </p>
              <p>{rev.review}</p>
              {getDeleteButton(rev.userId, rev.id)}
            </div>
          );
        });
      } else {
        if (!isOwner) {
          // Display a message if there are no reviews and the user is not the owner
          return <h4>Be the first to post a Review!</h4>;
        }
      }
    } else {
      // Display a loading message while reviews are being loaded
      return <h4>Loading Reviews ....</h4>;
    }
  };

  if (!reviewsLoaded) {
    // Return null if reviews, owner, or user information is not available
    return null;
  }

  // Render the component with post review button and reviews
  return (
    <div>
      {displayPostReviewButton()}
      {displayReviews()}
    </div>
  );
}

export default SpotReviews;
