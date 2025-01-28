const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session'); // For session management
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3003; 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Serve static files only for public pages (e.g., login.html)
app.use(express.static(path.join(__dirname, 'public_html'), {
  index: false, // Prevents serving home.html automatically
  extensions: ['html'],
}));

// MongoDB Connection process.env.MONGO_URI
mongoose
  .connect('mongodb+srv://namitjain123:namit@carbooking.esec1.mongodb.net/')
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // URL to the car image
  description: { type: String },
});

const Car = mongoose.model('Car', carSchema);

const Feedback = mongoose.model('Feedback', feedbackSchema);

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/'); // Redirect to login page if not authenticated
  }
};

const User = mongoose.model('User', userSchema);

app.post('/api/feedback', async (req, res) => {
  const { name, mobile, email, message } = req.body;

  try {
    const feedback = new Feedback({ name, mobile, email, message });
    await feedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully!' }); 
    
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve Login Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public_html', 'login.html')); // Ensure correct path
});

// Serve Home Page (Protected Route)
app.get('/home', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'private_html', 'home.html')); // Only accessible after login
});

app.get('/feedback', async (req, res) => {
  try {
    // Serve the HTML file
    res.sendFile(path.join(__dirname, 'private_html', 'feedback.html'));
  } catch (error) {
    console.error('Error serving feedback page:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ date: -1 });
    res.json(feedbackList); // Send the feedback data as JSON
  } catch (error) {
    console.error('Error fetching feedback data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    // Redirect to login page with success message
    res.redirect('/?message=registered');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});


// Login Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Save user info in session
      req.session.user = { id: user._id, username: user.username };
      res.redirect('/home'); // Redirect to home page on success
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

// Logout Endpoint
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/'); // Redirect to login page after logout
  });
});

app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find(); // Fetch all cars from the database
    res.json(cars); // Send the data as JSON
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/add-car', async (req, res) => {
  const { make, model, year, price, image, description } = req.body;
  try {
    const car = new Car({ make, model, year, price, image, description });
    await car.save();
    res.status(201).json({ message: 'Car added successfully!' });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//this middleware will handle any uncaught error
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(500).json({ error: 'Something went wrong!' }); // Send a generic error response
});
// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
