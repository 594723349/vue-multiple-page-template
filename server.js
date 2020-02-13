const express = require('express');
let app = express();
app.get('/user', (req, res) => {
    res.json({name: '哈哈'})
});
app.listen(8000);