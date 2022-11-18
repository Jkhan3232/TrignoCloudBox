const mongoose = require("mongoose");

const DB = process.env.DATABASE
mongoose
  .connect(DB )
  .then(() => console.log("Conection Successfull..."))
  .catch((err) => console.log(err));


          // webdev.save()(user => {
            //     transporter.sendMail({
            //         to: 'http://email-smtp.ap-south-1.amazonaws.com/',
            //         from: "noreply@trignocoloud.com",
            //         subject: "You SignUp Succesfully...",
            //         html: "<h3> Welcome To TrignoCloudeBox</h3>"
            //     })
            //     res.json("saved succesfuly")
            // }).catch(err => {
            //     console.log(err);
            // })


          //   let mailOptions = ({
          //     from: "noreply@ibcrajeshkumar.com",
          //     to: 'jeeshankhan3232@gmail.com',
          //     subject: "You SignUp Succesfully...",
          //     html: "<h3> Welcome To TrignoCloudeBox</h3>"
          // })
          // res.json('seved successfully..')

          // transporter.sendMail(mailOptions, function (error, info) {
          //     if (error) throw Error(error);
          //     console.log('Email Sent Successfully');
          //     console.log(info);
          // });



          

// var transporter = nodemailer.createTransport({
//   service: 'SES',
//   auth: {
//       type: 'email-smtp.ap-south-1.amazonaws.com',
//       user: 'AKIAWUOUY7R3U4LJUMZR',
//       pass: 'BARWYXMm3hHOQWlKH8gmRBx8cvI7xaUBpR76Y7yacdsy'

      // port: 2587,
//   }
// });