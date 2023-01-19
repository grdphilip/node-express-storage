const mongoose = require("mongoose");

/* min, max, minLength, required, unique, validate {}
mongoose docs https://mongoosejs.com/docs/guide.html#methods
*/

const compartmentsSchema = new mongoose.Schema({
  placement:{
    type: String,
    required: true,
  },
  storageId:{
    type: String,
    required: true,
  },
  qrCode:{
    type: String,
    required: true,
  },
  quantity:{
    type: Number,
    required: true,
  },
});

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    compartments: [compartmentsSchema],
    lioNr: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
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



module.exports = mongoose.model("Article", articleSchema);
