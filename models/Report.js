const { Schema, model } = require('mongoose');

// report is embeded in Check model now .... to be separeated later
const ReportSchema = new Schema(
  {
    checkId: { type: Schema.Types.ObjectId, ref: 'Check' },
    lastCheck: { type: Date }, // last check
    alerts: { type: Number },
    histroy: [Date], // [polling]
    currentStatus: { type: String }, // up -down
    outages: { type: Number }, // +1 if down
    responseTimes: [Number], // reposnse time
    upTime: { type: Number, default: 0 },
    downTime: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const ReportModel = model('Report', ReportSchema);

module.exports = ReportModel;
