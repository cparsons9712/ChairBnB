const express = require('express');
const { Review, Image } = require('../../db/models');

const router = express.Router();

/******************************************
EDIT A REVIEW
*********************************************/

/******************************************
ADD A REVIEW IMAGE BY REVIEW ID
*********************************************/
router.post('/:id/images', async (req, res, next)=> {
    const {url} = req.body

    // Throw an error if a user is not signed in
    if(!req.user){
        const autherr = new Error()
        autherr.status = 403
        autherr.message = "Authentication required"
        return next(autherr)
    }
        // Get the user ID
    const userId = req.user.id
        // Get the review
    const review = await Review.findOne({where: {id: req.params.id}})
        // count the number of images the review currently has, throw error if 10 or more
    const numImages = await Image.findAndCountAll({where: {refId: req.params.id}})
    const {count} = numImages
        if(count >= 10){
            const err = new Error();
            err.status = 403;
            err.message = "Maximum number of images for this resource was reached"
            return next(err)
        }

        if (review) {
            // Throw an error if the current user does not own the spot
        if( userId !== review.userId){
            const permerr = new Error();
            permerr.status = 403;
            permerr.message = "Forbidden";
            return next(permerr)
        }// Otherwise delete the image and send a response
        else {
            let newimage = await Image.create({
                url,
                type: "Review",
                refId: req.params.id
            })
            return res.json(newimage)
        }
    } // throw an error if the image isn't found
    else {
        const err = new Error();
        err.status = 404;
        err.message =  "Review couldn't be found";
        return next(err);
    }
})
/******************************************
DELETE A REVIEW'S IMAGE
*********************************************/

router.delete('/images/:id', async (req, res, next)=> {
    // Throw an error if a user is not signed in
    if(!req.user){
        const autherr = new Error()
        autherr.status = 403
        autherr.message = "Authentication required"
        return next(autherr)
    }
        // Get the user ID
    const userId = req.user.id
        // Get the image and related Spot info
    const image = await Image.findOne({where: {id: req.params.id}, include: Review})
        // check that the image was found
    if (image) {
            // Throw an error if the current user does not own the spot
        if( userId !== image.Review.userId){
            const permerr = new Error();
            permerr.status = 403;permerr.message = "Forbidden";
            return next(permerr)
        }// Otherwise delete the image and send a response
        else {
            await image.destroy();
            return res.json({"message": "Successfully deleted"})
        }
    } // throw an error if the image isn't found
    else {
        const err = new Error();
        err.status = 404;
        err.message =  "Review image couldn't be found";
        return next(err);
    }
})

module.exports = router;
