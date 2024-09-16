const axios = require('axios');
const Event = require('../models/Event');


const saveEventsToDB = async (req, res) => {
  try {
    
    const response = await axios.get('https://financialmodelingprep.com/api/v3/economic_calendar?from=2023-08-08&to=2023-08-08&apikey=jsEbsB1eVbQVMlPI3UjKWEFM4SHVuS9Z');


    const eventsData = response.data;

    const savedEvents = [];

    for (const event of eventsData) {
      const newEvent = new Event({
        date: new Date(event.date),
        country: event.country,
        event: event.event,
        currency: event.currency,
        previous: event.previous,
        actual: event.actual,
        change: event.change,
        impact: event.impact
      });

    
      const savedEvent = await newEvent.save();
      savedEvents.push(savedEvent);
    }

  
    res.status(200).json({
      message: 'Events successfully saved to the database!',
      savedEvents
    });

  } catch (error) {
    console.error('Error saving events:', error);
    res.status(500).json({
      message: 'Failed to save events',
      error: error.message
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); 
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

module.exports = {
  saveEventsToDB,
  getAllEvents
};
