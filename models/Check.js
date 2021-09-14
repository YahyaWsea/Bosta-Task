const { Schema, SchemaTypes, model } = require('mongoose');
require('mongoose-type-url');

const CheckSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: SchemaTypes.Url, required: true },
    protocol: {
      type: String,
      required: true,
      enum: ['http', 'https'],
    },
    path: { type: String },
    port: { type: Number },
    webHook: { type: SchemaTypes.Url },
    timout: { type: Number, default: 5 },
    interval: { type: Number, default: 10 },
    threshold: { type: Number, default: 1 },
    authentication: {
      username: { type: String },
      password: { type: String },
    },
    httpHeaders: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
    assert: {
      statusCode: { type: Number },
    },
    tags: [String],
    ignoreSSL: { type: Boolean },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    isStopped: { type: Boolean, default: false },
    intervalId: { type: Number },
    alerts: { type: Number, default: 1 },
    histroy: [Date], // [polling]
    currentStatus: { type: String, default: 'up' }, // up -down
    outages: { type: Number }, // +1 if down
    responseTimes: [Number], // reposnse time
    upTime: { type: Number, default: 0 },
    downTime: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const checkModel = model('Check', CheckSchema);

module.exports = checkModel;
