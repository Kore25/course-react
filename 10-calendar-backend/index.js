const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectionDB } = require('./database/config');

const PORT = process.env.PORT;
const app = express();

connectionDB();

app.use( cors() );
app.use( express.static('public') );
app.use( express.json() );

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.listen( PORT, () => {
  console.log(`Servidor correndo en puerto ${PORT}`);
});