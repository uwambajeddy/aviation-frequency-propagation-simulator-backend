const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recieverSchema = new Schema({
  longitute: {
    type: Number,
    required: [true, 'Please! enter longitute.']
  },
  latitude: {
    type: Number,
    required: [true, 'Please! enter longitute.']
  },
  radius: {
    type: Number,
    min:4,
    max:10,
    required: [true, 'Please! enter radius between 4 to 10 km']
  }
});

const Reciever = model('Reciever', recieverSchema);

module.exports= Reciever;
