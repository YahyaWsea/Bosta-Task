const { Types } = require('mongoose');
const Check = require('../models/Check');

const getReportBy = async ({ id, tag, userId }) => {
  const filter = id ? { _id: Types.ObjectId(id) } : { tags: tag };
  return Check.aggregate([
    { $match: { ...filter, userId } },
    {
      $project: {
        name: 1,
        currentStatus: 1,
        outages: 1,
        upTime: 1,
        downTime: 1,
        history: 1,
        avgResponsetime: { $avg: '$responseTimes' },
        availability: { $multiply: [{ $divide: ['$upTime', { $add: ['$upTime', '$downTime'] }] }, 100] },
      },
    },
  ]);
};

module.exports = {
  getReportBy,
};
