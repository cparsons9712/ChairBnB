const express = require('express');
const { Image, Spot } = require('../../db/models');
const {requireAuth} = require('../../utils/auth')


const router = express.Router();

router.delete('/:id', async (req, res, next)=> {

    // spot ownerId must match signedin user id


        if(!req.user){
            const autherr = new Error()
            autherr.status = 403
            autherr.message = "Authentication required"
            return next(autherr)
        }
        const userId = req.user.id
        const image = await Image.findOne({where: {id: req.params.id}, include: Spot})




        if (image) {


            if( userId !== image.Spot.ownerId){
                const permerr = new Error();
                permerr.status = 403;
                permerr.message = "Forbidden"
                return next(permerr)
            }
        else {
            await image.destroy();
            return res.json({"message": "Successfully deleted"})
        }

        }else {
            const err = new Error();
            err.status = 404;
            err.message =  "Spot Image couldn't be found";
            return next(err);
        }






})


module.exports = router
