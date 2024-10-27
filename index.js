const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/tasks',taskRoutes);

const PORT =  3000;

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
