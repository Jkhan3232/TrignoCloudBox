const express = require("express");
const {
  signup,
  signout,
  signin,
  verify_email,
  forgetPassword,
  resetPassword,
} = require("../controler/auth");
const router = express.Router();
const { auth, verifidUser } = require("../middlewere/auth");
// const multer = require('multer');
// const uuid = require('uuid').v4;

router.get("/", (req, res) => {
  res.render("trignoweb", {
    Title: "Home",
  });
});

//signout routes
router.get("/signout", auth, signout);

// get router
router.get("/trignouser", auth, (req, res) => {
  res.render("trignouser", {
    Title: "TrignoUserBox",
  });
});

router.get("/", verify_email, (req, res) => {
  res.render("trignoweb", {
    Title: "Box",
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    Title: "SignUp",
  });
});

router.get("/signin", (req, res) => {
  res.render("signin", {
    Title: "SignIn",
  });
});

router.get("/forgetPassword", (req, res) => {
  res.render("forgetPassword", {
    Title: "ForgetPassword",
  });
});

// router.get("/resetPassword", resetPassword, (req, res) => {
//     res.render('resetPassword')
// })

// error route
router.get("*", (req, res) => {
  res.render("404", {
    Errormsg: "Opps Page Could Not Found! Go back🔄",
  });
});

// post routers
router.post("/signup", signup);
router.post("/signin", verifidUser, signin);
router.post("/forgetPassword", forgetPassword);

// router.post('/upload')

// const storage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, 'src/uploads')
//     },
//     filename: (req, file, cb) => {
//         const { orignalname } = file;

//         cb(null, `${uuid()}==${orignalname}`)
//     }
// })

// const uploads = multer({ storage })

// // const Multiupload = uploads.fields([{ name: 'Jeeshan' }, { name: 'Neha' }])
// router.post('/upload', uploads.array('file'), (req, res) => {
//     console.log(req.files);
//     res.json({ status: "success" })
// })

module.exports = router;
