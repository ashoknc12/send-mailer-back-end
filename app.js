const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

 


app.post('/sendExcelFile', async (req,res)=>{
  const { 
    file,subject,body
} = req.body;
var sendMail = [];
file.forEach((element,i) => {
  let emailData = element.Email
  sendMail.push(emailData);
  console.log(sendMail);
});
let transporter = nodemailer.createTransport({
  host: "testmedifit@gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  service: 'gmail',
  auth: {
    user: details.email,
    pass: details.password
  }
});

let mailOptions = {
  from: '"Mail"<testmedifit@gmail.com>', // sender address
  to: sendMail, // list of receivers
  subject: subject, // Subject line
  html: body
};

// send mail with defined transport object
let info = await transporter.sendMail(mailOptions);

// callback(info);

res.status(200).json({
  error:false,
  message:"Upload",
  result : { files: file, subject: subject, body: body}
})
console.log("Mail send successfull");
})





app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome</h1>"
  );
});






app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  console.log(this.myMails);
  sendMail(user, info => {
    console.log(user);
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});


async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "testmedifit@gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Mail"<testmedifit@gmail.com>', // sender address
    to: sendMail, // list of receivers
    subject: "Wellcome", // Subject line
    html: `<h1>Sub: ${user.name}</h1><br>
    <h4>Thank u from  ${user.body}</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);

////////////////////////////////////////////////////////////////////////////

