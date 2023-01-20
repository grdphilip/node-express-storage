const mongoose = require("mongoose");
const User = require("../models/userModel");

/* min, max, minLength, required, unique, validate {}
mongoose docs https://mongoosejs.com/docs/guide.html#methods

Adding a schema_version means that an application can identify 
documents shaped for the new schema and handle them accordingly. 
The application can still handle old documents if schema_version 
does not exist on the document.
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
