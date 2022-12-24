const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  id:  {
    type: String,
  },
  name: { 
    type: String,
    required: [true, "No need a name?"],
    trim: true,
  },
  surname: { 
    type: String,
    required: [true, "No need a surname?"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Need a title?"],
    trim: true,
  },
  start: {
    type: String,
    trim: true,
    required: [true, "No have start?"],
  },
  end: {
    type: String,
    trim: true,
    required: [true, "No have end?"],
    validate: {
      validator: function(value) {
        return value.length === 19 ? value : this.start;
      },
    },
  },
  type: {
    type: String,
    required: [true, "No need type?"],
    trim: true,
  },
  allDay: {
    default: false,
  },
  backgroundColor: {
    type: String,
    validade: { function (){
        switch (this.type) {
          case 'option-1': this.backgroundColor = '#83A0A0';
          return;
          case 'option-2': this.backgroundColor = '#2B3D41';
          return;
          case 'option-3': this.backgroundColor = '#4C5F6B';
          return;
          case 'option-4': this.backgroundColor = '#BCA0BC';
          return;
          case 'option-5': this.backgroundColor = '#F9B9F2';
          return;
          case 'option-6': this.backgroundColor = '#378BBF';
          return;
          case 'option-7': this.backgroundColor = '#2C7828';
          return;
          case 'option-8': this.backgroundColor = '#A0C79E';
          return;
          case 'option-9': this.backgroundColor = '#26BDBD';
          return;
          case 'option-10': this.backgroundColor = '#4C3891';
          return;
        }
      }
    },
  },
  extendedProps: {
    type: Object,
  },
  url: {
    type: String,
  },
  className: {
    type: String,
  },
}, {timestamps: true});

const Event = mongoose.model('Event', EventSchema);

module.exports = {
  Event
}