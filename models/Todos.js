const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 24,
      required: true,
      unique: true,
    },
    body: { type: String, minlength: 10, maxlength: 128 },
    completed: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("TodoList", TodoSchema);
