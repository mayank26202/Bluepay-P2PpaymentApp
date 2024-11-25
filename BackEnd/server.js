const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user");
const Wallet=require("./model/wallet");
const Razorpay = require("razorpay");

const app = express();
const cors = require('cors'); const corsOptions = {
  origin: ['http://localhost:8081'],
  methods: ['GET', 'POST'],
  credentials: true,
};



const razorpay = new Razorpay({
  key_id:'rzp_test_ZsQ10yKgHqSgCi',
  key_secret:'sOsmgEHOoJ9vwUBzMBKgdt9H'
});



const dburl = 'mongodb+srv://dfs_07_09_24:0iiTG27rOBgcDuLX@cluster0.adxchpg.mongodb.net/bluePay?retryWrites=true&w=majority';

mongoose.connect(dburl, {})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Connection error', err);
  });



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


const sessionOptions = {
  // store,
  secret: "mySuperSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen('8080', () => {
  console.log("app is listening at port 8080");
});

app.post('/signup', async (req, res) => {

  try {
    let { name, email, password } = req.body;
    const newUser = new User({ email, username: name });
    let registeredUser = await User.register(newUser, password);

    console.log(registeredUser);
    res.status(200).json({
      user: registeredUser,
      message: "You Have Succefully Signed Up"
    })
  }
  catch (error) {
    res.status(500).json({
      user: '',
      message: "Error"
    })
  }

});


app.post('/login', passport.authenticate('local'), async (req, res) => {
  try {
    res.status(200).json({
      message: "You Have Succefully Signed Up"
    })
  }
  catch (error) {
    res.status(500).json({
      user: '',
      message: "Error"
    })
  }

});


app.post('/create-order',(req,res)=>{
  let options = {
    amount:req.body.amount,
    currency: "INR"
  };

  razorpay.orders.create(options, (err, order) => {
    console.log(order);
    res.json(order);
  });
})

app.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, amount } = req.body;

  const secret ='sOsmgEHOoJ9vwUBzMBKgdt9H';
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  if (expectedSignature === razorpay_signature) {
    // Update wallet balance on successful verification
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, balance: 0 });
    }
    wallet.balance += amount;
    await wallet.save();
    return res.json({ success: true, balance: wallet.balance });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid Signature' });
  }
});