const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require('./routes/auth');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use('/api', authRoutes);

mongoose.connect('', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('We Are Connected to DB');
});
// mongodb+srv://nishant007-tech:nishanti69@cluster0.jmjrn.mongodb.net/nishant?retryWrites=true&w=majority

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
    })
}


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});