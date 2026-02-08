const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Database
const users = [
    { email: "user@netflix.com", password: "password123" }
];

app.get('/', (req, res) => {
    res.send("Netflix Backend is working!");
});

// Signup
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "All fields are required." });

    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists." });

    users.push({ email, password });
    console.log("Current Users:", users);
    
    return res.status(201).json({ success: true, message: "Account created successfully!" });
});

// Login 
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        return res.status(200).json({ success: true, message: "Login successful!", token: "mock-token" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});