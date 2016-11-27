'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * History Schema
 */
var HistorySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill History name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  project: {
    type: Schema.ObjectId,
    ref: 'Project'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('History', HistorySchema);
