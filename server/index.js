const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventController = require('./controllers/evnetController'); 

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://viveknirala:forex@cluster0.4bvhv.mongodb.net/forexEventsDB?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.post('/api/save-events', eventController.saveEventsToDB); 
app.get('/api/events', eventController.getAllEvents);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
