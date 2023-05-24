const express = require('express');
const { Review, Image } = require('../../db/models');

const router = express.Router();

/******************************************
EDIT A REVIEW
*********************************************/
router.put('/:id', async (req,res, next)=>{
    if(!req.user){
        const aerror = new Error()
        aerror.status = 401
        aerror.title = "Sign-in Error"
        aerror.message = "Authentication Required"
        return next(aerror)
    }
    const oldreview = await Review.findByPk(req.params.id)
    if(!oldreview){
        const rerror = new Error()
        rerror.title = "No Such Review"
        rerror.status = 404
        rerror.message = "Review not found"
        return next(rerror)
    }
    if(oldreview.userId !== req.user.id){
        const perror = new Error()
        perror.status = 403
        perror.title = "Permission Error"
        perror.message = "Forbidden"
        return next(perror)
    }
    const {review, stars} = req.body
    if(stars < 1 || stars > 5 || !review || !stars){
        const serror = new Error()
        serror.status = 400
        serror.title = "Input Error"
        serror.message= "Bad Request"
        const errors = {}
        if(! review){
            errors.review = "Review is required"
        }
        if(!stars){
            errors.stars = "Stars are required"
        }
        if(stars > 5 || stars < 1){
            errors.stars = "Stars must be a number between 1 and 5"
        }
        serror.errors = errors
        return next(serror)
    }
    try {
        const newReview = await oldreview.update({
            description: review, stars
        })
        return res.json(newReview)
    }catch(err){
        return next(err)
    }
})

/******************************************
ADD A REVIEW IMAGE BY REVIEW ID
*********************************************/
router.post('/:id/images', async (req, res, next)=> {
    const {url} = req.body

    // Throw an error if a user is not signed in
    if(!req.user){
        const autherr = new Error()
        autherr.status = 401
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
DELETE A REVIEW
*********************************************/
router.delete('/:id', async (req, res, next)=>{
    if(!req.user){
        const autherr = new Error()
        autherr.status = 401
        autherr.message = "Authentication required"
        return next(autherr)
    }
    const review = await Review.findByPk(req.params.id)
    if(!review){
        const nonerr = new Error()
        nonerr.status = 404
        nonerr.message = "Review couldn't be found"
        return next(nonerr)
    }
    if(review.userId !== req.user.id){
        const perr = new Error()
        perr.status = 403
        perr.message = "Forbidden"
        return next(perr)
    }
    try{
        await review.destroy()
        return res.json({"message": "Successfully deleted"})
    }catch(err){
        next(err)
    }
})


/******************************************
DELETE A REVIEW'S IMAGE
*********************************************/

router.delete('/images/:id', async (req, res, next)=> {
    // Throw an error if a user is not signed in
    if(!req.user){
        const autherr = new Error()
        autherr.status = 401
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
            permerr.status = 403;
            permerr.message = "Forbidden";
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
