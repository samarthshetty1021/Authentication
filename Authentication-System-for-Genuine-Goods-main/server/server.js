const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const db = require("./config");
const session = require("express-session");
require("dotenv").config();

db.connect();

const app = express();
const port = 3001;
const saltRounds = 10;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/s_signup", (req, res) => {
  const { id, city, pass } = req.body;
  bcrypt.hash(pass, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "INSERT INTO seller (seller_id, seller_city, pass) VALUES ($1, $2, $3)",
        [id, city, hash],
        (err, result) => {
          if (err) {
            console.error("Error inserting seller:", err.stack);
            return res.status(500).send({ error: "Error signing up" });
          }
          res.status(200).send("Successfully signed up");
        }
      );
    }
  });
});

app.post("/s_signin", (req, res) => {
  const { id, pass } = req.body;
  console.log("printitng ", id, pass);
  db.query("SELECT * FROM seller WHERE seller_id = $1", [id], (err, result) => {
    if (err) {
      console.error("Error retrieving manufacturer:", err.stack);
      return res.status(500).send({ error: "Error signing in" });
    }
    console.log(result.rows[0]);
    /*if (!seller || seller.pass != pass) {
      return res.status(401).send("Invalid credentials");
    }
      return res.status(200).send("1");*/
      try{
    bcrypt.compare(pass, result.rows[0].pass, function (err, reslt) {
      if (reslt) {
        res.status(200).send("1");
      } else {
        return res.status(402).send("Invalid credentials");
      }
    });
  }catch{

    res.status(401).send("Invalid credentials");


  }
  });
});

app.post("/m_signup", (req, res) => {
  const { id, brand, city, pass } = req.body;
  bcrypt.hash(pass, saltRounds, function (err, hash) {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "INSERT INTO manufacturer (manuf_id, manuf_brand, manuf_city, pass) VALUES ($1, $2, $3, $4)",
        [id, brand, city, hash],
        (err, result) => {
          if (err) {
            console.error("Error inserting manufacturer:", err.stack);
            return res.status(500).send("Error signing up");
          }
          //res.render("m_login.ejs");
          res.status(200).send("success");
        }
      );
    }
  });
});

app.post("/m_signin", (req, res) => {
  try {
    const { id, pass } = req.body;
    db.query(
      "SELECT * FROM manufacturer WHERE manuf_id = $1",
      [id],
      (err, result) => {
        if (err) {
          console.error("Error retrieving manufacturer:", err.stack);
          return res.status(500).send({ error: "Error signing in" });
        }

        const manufacturer = result.rows[0];
        try {
          bcrypt.compare(pass, manufacturer.pass, function (err, reslt) {
            if (reslt) {
              res.status(200).send("Successfully signed in");
            } else {
              res.status(401).send("Invalid credentials");
            }
          });
        } catch {
          // alert("Very wrong credentials");
          // console.log("wrong very wrong");
          res.status(401).send("Invalid credentials");
        }
      }
    );
  } catch {
    alert("Wrong Credentials!");
  }
});

app.post("/brand", (req, res) => {
  const { id } = req.body;
  db.query(
    "SELECT * FROM manufacturer WHERE manuf_id = $1",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error retrieving data", err.stack);
        return res.status(500).send({ error: "error retrieving brand" });
      } else {
        const resp = result.rows[0];

        return res.status(200).send(resp);
      }
    }
  );
});

app.post("/sendEmail", (req, res) => {
  const { brand, prodId, email, consumerCode } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "amolpatilgamer55@gmail.com",
      pass: "oklh mvho syac pkju",
    },
  });

  const mailOptions = {
    from: "amolpatilgamer55@gmail.com",
    to: email,
    subject: `Your consumer code for purchase is ${consumerCode}`,
    text: ` Your consumer code on purchase from ${brand} product-id : ${prodId} is ${consumerCode}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    console.log("Email sent: " + info.response);
    console.log(consumerCode);
    return res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
