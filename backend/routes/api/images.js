const express = require('express');
const { Image, Spot } = require('../../db/models');



const router = express.Router();


/*******************************************
                DELETE AN IMAGE
 ******************************************/
router.delete('images/:type/:id', async (req, res, next)=> {
    // Throw an error if a user is not signed in
    if(!req.user){
        const autherr = new Error()
        autherr.status = 403
        autherr.message = "Authentication required"
        return next(autherr)
    }
    // check if this is the url for spot images
    if (req.params.type === "spot"){

        // Get the user ID
        const userId = req.user.id
        // Get the image and related Spot info
        const image = await Image.findOne({where: {id: req.params.id}, include: Spot})
        // check that the image was found
        if (image) {
            // Throw an error if the current user does not own the spot
            if( userId !== image.Spot.ownerId){
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
            err.message =  "Image couldn't be found";
            return next(err);
        }
    }
    if (req.params.type === "review"){

    }
})


module.exports = router
