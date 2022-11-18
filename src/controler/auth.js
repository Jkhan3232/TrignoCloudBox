const Dynamic_Web = require("../models/schema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "./.env" });

// Nodemailer
const transpoter = nodemailer.createTransport({
  host: "email-smtp.ap-south-1.amazonaws.com",
  port: "2587",
  auth: {
    user: "AKIAWUOUY7R3U4LJUMZR",
    pass: "BARWYXMm3hHOQWlKH8gmRBx8cvI7xaUBpR76Y7yacdsy",
  },
});

// User Logout
exports.signout = async (req, res) => {
  try {
    req.user.tokens = [];
    res.clearCookie("jwt");
    console.log("logout successfully..");
    await req.user.save();
    res.render("signin");
    // res.send({
    //     Tital: "SignOut"
    // })
  } catch (err) {
    res.status(500).render("500");
  }
};

//User Signup
exports.signup = async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const webdev = new Dynamic_Web({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: password,
        confirmpassword: cpassword,
        emailToken: crypto.randomBytes(32).toString("hex"),
        // verifyemail: false
      });
      const token = await webdev.genrateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 100000),
        httpOnly: true,
      });
      const jk = await webdev.save();

      const link = `  <a herf="${process.env.ClINT_URL}/verify_email?token=${webdev.emailToken}></a>`;
      //send verification mail to user
      const mailConfigurations = {
        from: "noreply@fashionsection.in",
        to: webdev.email,
        subject: "Gshan Khan Verify your email",
        html: ` <h3> ${webdev.firstname}! Thank For wisit Our Website😄😄 </h3>
                   <p> please verify your email to bi continue.. </p> ,
                   <button> ${link} </button>
                  
            `,
      };

      transpoter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent:...");
        }
      });

      res.status(200);
    } else {
      res.send("Password is not match");
    }
    // const user = await Dynamic_Web.findOne({ _id: _id })
    res.status(200).send({ status: "succes" });
  } catch {
    res.status(400).render("404");
  }
};

//Uswr Signin
exports.signin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const usremail = await Dynamic_Web.findOne({ email });
    const isMail = await bcrypt.compare(password, usremail.password);
    const token = await usremail.genrateAuthToken();
    console.log("The token part" + token);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 100000),
      httpOnly: true,
    });

    if (isMail) {
      const user = await Dynamic_Web.findOne({ email: email });
      console.log(user.firstname);
      res.status(201).render("trignouser", {
        UserName: user.firstname,
        Title: "TrignoCloudBox",
      });
      // console.log({ UserName: user.firstname });
    } else {
      res.send("passwor is not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// User Email Verificatin
exports.verify_email = async (req, res) => {
  try {
    const token = req.body.token;
    const webdev = await Dynamic_Web.findOne({ Token: token });
    if (webdev) {
      webdev.Token = null;
      webdev.verifyemail = true;
      await webdev.save();
      res.redirect("/signin");
      console.log("succesfully..");
    } else {
      res.redirect("/signup");
      console.log("not sent successfully.");
    }
  } catch (error) {
    console.log(error);
  }
};

// // forgetpassword

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    console.log("hellow");
    const webdev = await Dynamic_Web.findOne({ email });
    console.log(">>>>>>>", webdev._id, email);
    if (!webdev) {
      return res.send({ Massage: "User Dose Not Exist Plz Enter Valid Email" });
    } else {
      const secrate = process.env.SECRTE_KEY + webdev.password;
      const token = jwt.sign({ email: webdev.email, id: webdev._id }, secrate, {
        expiresIn: "5m",
      });
      const link = `http://localhost:8000/resetPassword/${webdev._id}/${token}`;
      const UserMailSending = {
        from: "noreply@fashionsection.in",
        to: webdev.email,
        subject: "Reset Password Link",
        html: `<h3>Click On This Link To Reset Your Password And Create New Password</h3>
                  <span> ${link} </span>`,
      };

      transpoter.sendMail(UserMailSending, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent:...");
        }
      });
    }
    res.send({ msassge: "sent .. ok" });
  } catch (error) {
    return res.send("errr");
  }
};

// rester password
