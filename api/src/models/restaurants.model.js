// restaurants-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'restaurants';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const restaurant = new Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    type: {
      type: String
    },
    star: {
      type: Number,
      required: true,
      default: 1,
    },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, restaurant);

};
