import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addImages, createNewSpot } from "../store/spot";
import { useModal } from "../context/Modal";


function NewSpotModal() {
  const history = useHistory()
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(true)
    const {closeModal} = useModal()

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLong] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState()
    const[image1, setImage1] = useState(null)
    const[image2, setImage2] = useState(null)
    const[image3, setImage3] = useState(null)
    const[image4, setImage4] = useState(null)
    const[image5, setImage5] = useState(null)
    const [attempt, setAttempt] =useState(false)

    useEffect(()=>{
      setImages([image1,image2,image3,image4, image5])
      
    }, [image1,image2,image3,image4, image5])

    const handleSubmit = async (e) => {
      e.preventDefault();


      const payload = { address, city, state, country, lat, lng, name, description, price };

      let newSpot = await dispatch(createNewSpot(payload));


      if (newSpot.id) {

        if (image1 === null) {
          return setErrors({ previewImg: 'Preview Image is required' });
        } else {
          for (let i = 0; i < images.length; i++) {
            let preview = false;
            if (i === 0) preview = true;
            await dispatch(
              addImages(newSpot.id, {
                url: images[i],
                preview
              })
            );
          }
        }
        closeModal();
        history.push(`/spots/${newSpot.id}`);
      } else {
        const res = await newSpot.json();
        setErrors(res.errors);
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit} id="newSpotModal">
        <button className = 'close' onClick={closeModal}>X</button>

        <h1>Create a New Spot</h1>


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
            <div id='dolla'>
              <div id='dollarSign'>$ </div>
              <input id='priceInputNew'
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
              />
            </div>
            <div className="errors">{errors?.price}</div>
        </div>
        </div>
       <div id='addPhotos'>
            <h4>Liven up your spot with photos</h4>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <div className="errors">{errors?.previewImg}</div>
            <div id='urlInputs'>
            <input
              type="text"
              value={image1}
              onChange={(e) =>setImage1(e.target.value)}
              placeholder="Preview Image URL"
              key="previewURL"
            />

            <input
              type="text"
              value={image2}
              onChange={(e) =>setImage2(e.target.value)}
              placeholder="Image URL"
              key="URL2"
            />
            <input
              type="text"
              value={image3}
              onChange={(e) =>setImage3(e.target.value)}
              placeholder="Image URL"
              key="URL3"
            />
            <input
              type="text"
              value={image4}
              onChange={(e) =>setImage4(e.target.value)}
              placeholder="Image URL"
              key="URL4"
            />
            <input
              type="text"
              value={image5}
              onChange={(e) =>setImage5(e.target.value)}
              placeholder="Image URL"
              key="URL5"
            />
            </div>


        </div>

          <button type="submit"  id='submitNewSpot'>Create Spot</button>
        </form>
      </>
    );

}

export default NewSpotModal
