import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {  editSpot, getOneSpot } from "../store/spot";
import { useModal } from "../context/Modal";


function UpdateSpotModal({id}) {
  const history = useHistory()
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()

    useEffect(() => {
        dispatch(getOneSpot(id));
      }, [dispatch, id]);

    const spot = useSelector((state) => state.spots.Current);


    const [country, setCountry] = useState(spot.country)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLong] = useState(spot.lng)
    const [description, setDescription] = useState(spot.description)
    const [name, setName] = useState(spot.name)
    const [price, setPrice] = useState(spot.price)





    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = { address, city, state, country, lat, lng, name, description, price };

     let newSpot = await dispatch(editSpot(id, payload));

        if(newSpot.id){
          closeModal()
          history.push(`/spots/${newSpot.id}`)
        }
          else{
            const res = await newSpot.json()
            setErrors(res.errors);
          }

    };



    return (
      <>
        <form onSubmit={handleSubmit} id="newSpotModal">
        <button className = 'close' onClick={closeModal}>X</button>

        <h1>Update Your Spot</h1>


          <h4>Where's your place located?</h4>
          <p>Guest will only get your exact address once they have booked a reservation</p>
            <div id='location'>
          <label className='loclabel'>


            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <div className="errors">{errors?.address}</div>
          </label>

          <label className='loclabel'>

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
            <div className="errors">{errors?.city}</div>
          </label>

          <label className='loclabel'>

            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            />
            <div className="errors">{errors?.state}</div>
          </label>
          <label className='loclabel'>

            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
           <div className="errors">{errors?.country}</div>
          </label>

          <label className='loclabel'>

            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Latitude"
            />
            <div className="errors">{errors?.lat}</div>
          </label>

          <label className='loclabel'>

            <input
              type="text"
              value={lng}
              onChange={(e) => setLong(e.target.value)}
              placeholder="Longitude"
            />
            <div className="errors">{errors?.lng}</div>

          </label>
        </div>


        <div id='description'>
            <h4>Describe your place to guest</h4>
            <p>Mention the best features of your space, any special amentitites like fast wifi or parking, and what you love about the neighborhood</p>
            <textarea value={description} placeholder="Please write at least 30 characters"id='descNewSpot'onChange={(e) => setDescription(e.target.value)} />
            <div className="errors">{errors?.description}</div>
        </div>
        <div id='nameprice'>
        <div id='spotName'>
            <h4>Create a title for your spot</h4>
            <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of your spot"
            />
            <div className="errors">{errors?.name}</div>
        </div>

        <div id='price'>
            <h4>Set a base price for your spot</h4>
            <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
            <div id='dolla'> <div id='dollarSign'>$ </div><input id='priceInputNew'
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
            /></div>
            <div className="errors">{errors?.price}</div>
        </div>
        </div>


          <button type="submit"  id='submitUpdateSpot'>Update Your Spot</button>
        </form>
      </>
    );

}

export default UpdateSpotModal;
