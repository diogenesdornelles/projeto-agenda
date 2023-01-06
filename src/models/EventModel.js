const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String,
    required: [true, 'No need a name?'],
    trim: true
  },
  surname: {
    type: String,
    required: [true, 'No need a surname?'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Need a title?'],
    trim: true
  },
  start: {
    type: String,
    trim: true,
    required: [true, 'No have start?']
  },
  end: {
    type: String,
    trim: true,
    required: [true, 'No have end?'],
    validate: {
      validator: function (value) {
        return value.length === 19 ? value : this.start
      }
    }
  },
  type: {
    type: String,
    required: [true, 'No need type?'],
    trim: true
  },
  allDay: {
    default: false
  },
  backgroundColor: {
    type: String,
    default: '#000',
    set: function () {
      switch (this.type) {
        case 'option-1': this.backgroundColor = '#83A0A0'
          return
        case 'option-2': this.backgroundColor = '#2B3D41'
          return
        case 'option-3': this.backgroundColor = '#4C5F6B'
          return
        case 'option-4': this.backgroundColor = '#BCA0BC'
      }
    }
  },
  extendedProps: {
    type: Object
  },
  url: {
    type: String
  },
  className: {
    type: String
  }
}, { timestamps: true })

const Event = mongoose.model('Event', EventSchema)

module.exports = {
  Event
}
