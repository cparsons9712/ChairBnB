import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../store/spot";
import OpenModalButton from "./OpenModalButton";
import PostReviewModal from "./PostReview";

function SpotReviews({ id }) {
  const dispatch = useDispatch();

  const [isOwner, setIsOwner] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSpotReviews(id));
  }, [dispatch, id]);

  const user = useSelector((state) => state.session.user);
  const owner = useSelector((state) => state.spots.Current.Owner);
  let reviews = useSelector((state) => state.spots.Current.Reviews);

  useEffect(() => {
    if (owner && owner.id === user.id) {
      setIsOwner(true);
    }
  }, [user, owner]);

  useEffect(() => {
    if (reviews) {
      setReviewsLoaded(true);
    }
  }, [reviews]);



  const displayPostReviewButton = () => {
    if (reviewsLoaded) {
      if (!isOwner && reviews && reviews.length > 0) {
        const users = reviews.map((review) => review.User?.id);
        if (!users.includes(user.id)) {
          return (
            <div id="postReviewButton">
              <OpenModalButton
                buttonText="Post Your Review"
                modalComponent={<PostReviewModal id={id} />}
              />
            </div>
          );
        }
      } else if (!isOwner && (!reviews || reviews.length === 0)) {
        return (
          <div id="postReviewButton">
            <OpenModalButton
              buttonText="Post Your Review"
              modalComponent={<PostReviewModal id={id} />}
            />
          </div>
        );
      }
    }

    return null;
  };

  const displayReviews = () => {
    if (reviewsLoaded) {
      if (reviews && reviews.length > 0) {
        console.log('before:')
        console.log(reviews)
        console.log('after:')
        console.log(reviews)
        reviews = reviews.toReversed()
        return reviews.map((rev) => {
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
            </div>
          );
        });
      } else {
        if (!isOwner) {
          return <h4>Be the first to post a Review!</h4>;
        }
      }
    } else {
      return <h4>Loading Reviews ....</h4>;
    }
  };

  // Add a check to render nothing if the data hasn't loaded yet
  if (!reviewsLoaded || !owner || !user) {
    return null;
  }

  return (
    <div>
      {displayPostReviewButton()}
      {displayReviews()}
    </div>
  );
}

export default SpotReviews;
