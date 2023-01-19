const mongoose = require("mongoose");

/* min, max, minLength, required, unique, validate {}
mongoose docs https://mongoosejs.com/docs/guide.html#methods
*/

const compartmentsSchema = new mongoose.Schema({});

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lioNr: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

articleSchema.methods.getId = function () {
  console.log(this);
};

articleSchema.vi;

module.exports = mongoose.model("Article", articleSchema);
