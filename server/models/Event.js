const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  country: { type: String, required: true },
  event: { type: String, required: true },
  currency: { type: String, required: true },
  previous: { type: String },
  actual: { type: String },
  change: { type: String },
  impact: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
