// const { request } = require("express");
// const express = require("express");
// const mongoose = require("mongoose");

// const router = express.Router();

// const userSchema = require("../../models/userSchema.js");

const bcrypt = require("bcrypt");
const saltRounds = 10;

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");

  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

// const url = process.env.mongoURL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err: any) => console.log(err));

const User = mongoose.model("User", userSchema, "users");

// Get Users
router.post("/login", async (req: { body: { userName: any; userPassword: any; }; }, res: { sendStatus: (arg0: number) => void; send: (arg0: any) => void; }) => {
  const userNameToBeFound = req.body.userName;
  const myPlaintextPassword = req.body.userPassword;

  const user = User.where({ userName: userNameToBeFound });
  user.findOne(function (err: any, user: { userPassword: any; }) {
    if (!user) {
      // The user couldn't be found
      res.sendStatus(202);
      return;
    }
    if (user) {
      bcrypt.compare(
        myPlaintextPassword,
        user.userPassword,
        function (err: any, result: any) {
          if (err) {
            console.log("error comparing password:", err);
          }
          if (result) {
            res.send(user);
            return;
          } else {
            res.sendStatus(205);
            return;
          }
        }
      );
    }
  });
});

// Get User after page reload
router.get("/:id", async (req: { params: { id: any; }; }, res: { send: (arg0: any) => void; }) => {
  res.send(await User.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }));
});

// Add User
router.post("/", async (req: { body: { userName: any; userPassword: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; sendStatus: (arg0: number) => void; }) => {
  try {
    const userNameToBeFound = req.body.userName;
    const user = User.where({ userName: userNameToBeFound });
    user.findOne(function (err: any, user: any) {
      if (!user) {
        // The userName doesn't yet exist
        const user = new User();
        user.userName = req.body.userName;
        const myPlaintextPassword = req.body.userPassword;
        bcrypt.hash(
          myPlaintextPassword,
          saltRounds,
          async function (err: any, hash: any) {
            if (err) {
              console.log("error hashing password:", err);
            }
            user.userPassword = hash;
            await user.save(function (err: any, user: any) {
              if (err) {
                res.status(500);
              }
              res.status(201).json(user);
            });
          }
        );
        return;
      }
      if (user) {
        // The userName is already taken
        res.sendStatus(205);
        return;
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete User
router.delete("/:id", async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any; }; }; }) => {
  try {
    let user = await User.findById(req.params.id);
    await user.delete();
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
