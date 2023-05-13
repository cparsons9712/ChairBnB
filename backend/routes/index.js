
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const validateLogin = require('./api/session')
const User = require('../db/models')

router.use('/api', apiRouter);


// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
});

//get current logged in user
// router.get("/user", (req, res) => {
//   const { user } = req;
//     if (user) {
//       const safeUser = {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         username: user.username,
//       };
//       return res.json({
//         user: safeUser
//       });
//     } else return res.json ({ user: null})
// })

// //login
// router.post(
//   '/login',
//   validateLogin,
//   async (req, res, next) => {
//     const { credential, password } = req.body;

//     const user = await User.unscoped().findOne({
//       where: {
//         [Op.or]: {
//           username: credential,
//           email: credential
//         }
//       }
//     });

//     if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
//       const err = new Error('Login failed');
//       err.status = 401;
//       err.title = 'Login failed';
//       err.errors = { credential: 'The provided credentials were invalid.' };
//       return next(err);
//     }

//     const safeUser = {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       username: user.username,
//     };

//     await setTokenCookie(res, safeUser);

//     return res.json({
//       user: safeUser
//     });
//   }
// );


module.exports = router;
