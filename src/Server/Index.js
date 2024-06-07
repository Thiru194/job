const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Task = require('../Components/mongo.js');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/postdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const File = mongoose.model('File', {
  name: String,
  data: Buffer,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const newFile = new File({
      name: file.originalname,
      data: file.buffer,
    });

    await newFile.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('File upload failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: Number, // Add OTP field to the schema
});

const User = mongoose.model('User', userSchema);

app.post('/add', async (req, res) => {
  const task = {
    companyname: req.body.companyName,
    aboutjob: req.body.about,
    salary: req.body.salary,
    mail: req.body.email,
  };

  try {
    const newTask = await new Task(task).save();
    res.status(200).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('User with this email already exists:', existingUser);
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    console.log('Signup successful. New user added:', newUser);
    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found with this email:', email);
      return res.status(404).json({ error: 'User not found with this email' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('Incorrect password for user:', email);
      return res.status(401).json({ error: 'Incorrect password' });
    }

    console.log('Login successful. User:', user);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found with this email:', email);
      return res.status(404).json({ error: 'User not found with this email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jobboardotp123@gmail.com', 
        pass: 'epsh cefz sbzt wurj', 
      },
    });

    const mailOptions = {
      from: 'jobboardotp123@gmail.com', 
      to: email,
      subject: 'Password Recovery OTP',
      text: `Your OTP for password recovery is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    console.log('OTP sent successfully to:', email);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (deletedTask) {
      console.log('Task deleted:', deletedTask);
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      console.log('Task not found with ID:', id);
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found with this email:', email);
      return res.status(404).json({ error: 'User not found with this email' });
    }

    // Verify OTP using user's secret key
    const isVerified = verifyOTP(user.otpSecret, otp);

    if (isVerified) {
      console.log('OTP verification successful for user:', email);
      res.status(200).json({ message: 'OTP verification successful' });
    } else {
      console.log('Incorrect OTP for user:', email);
      res.status(401).json({ error: 'Incorrect OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  console.log('Request Body:', req.body); // Log request payload

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found with this email:', email);
      return res.status(404).json({ error: 'User not found with this email' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    
    user.password = hashedPassword;
    await user.save();

    console.log('Password reset successful for user:', email);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getdata', async (req, res) => {
  try {
    const getdata = await Task.find().sort({ companyname: 1 });
    res.status(200).json(getdata);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 