
const jwt = require("jsonwebtoken");
const Dynamic_Web = require('../models/schema')
// require('../app')

// User token Validation to vrifid user is real or fake
exports.auth = async (req, res, next) => {

  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verifyUser);

    const user = await Dynamic_Web.findOne({ _id: verifyUser });
    const users = await Dynamic_Web.findOne({ _id: verifyUser });
    console.log(user.firstname);

    req.token = token;
    req.user = user;
    req.users = users;
    next();
  } catch {
    res.status(401).render('404')
  }
};


// User Verifid Authantication
exports.verifidUser = async (req, res, next) => {
  try {
    const webdev = await Dynamic_Web.findOne({ email: req.body.email })
    if (webdev.verifyemail) {
      next()
    } else {
      res.send({ massge: 'please chack your email ' })
    }
  } catch (error) {
    console.log(error)
  }

}

