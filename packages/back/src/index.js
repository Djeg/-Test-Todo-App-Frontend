require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/todos', (req, res) => {
    res.json([
        { text: 'test todo', complete: false }
    ]);
})

app.listen(process.env.PORT, () => {
    console.log(`Server todo is listening at: http://localhost:${process.env.PORT}/todos`);
})