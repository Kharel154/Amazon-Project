const express = require('express');
const path = require('path');



const app = express();
const PORT = 5002;

console.log(__dirname);
app.get('../amazon.html');


app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT}`);
    
});

