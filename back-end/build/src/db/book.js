"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bookSchema = new Schema({
  ea_isbn: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    require: true,
  },
  publisher: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  translator: {
    type: String,
  },
  title_url: {
    type: String,
  },
  subject: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  publisher_predate: {
    type: String,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  review: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
exports.book = mongoose.model("book", bookSchema);
