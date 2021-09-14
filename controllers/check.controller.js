const Check = require('../models/Check');
const { checkHandler } = require('../helpers/checkHelpers');
const { getReportBy } = require('../helpers/reportHelpers');
const { CheckSchema } = require('../schemas/checkSchema');
const { SCHEMA_VALIDATION_ERROR } = require('../error/errors');

const createCheck = async (req, res) => {
  const { value, error } = CheckSchema.validate(req.body);
  if (error) throw SCHEMA_VALIDATION_ERROR(error);

  const { _id: id } = req.user;
  const check = await Check.create({ ...value, userId: id });

  checkHandler(check._id);
  const handlerInterval = setInterval(checkHandler, value.interval * 60 * 1000, check._id);
  check.intervalId = handlerInterval;
  await check.save();
  res.json({ message: 'created' });
};

const getChecks = async (req, res) => {
  const { id } = req.user;
  console.log({ id });
  const checks = await Check.find({ userId: id });

  const mappedChecks = checks.map(({
    name, url, protocol, path, port, webhook, timeout, interval,
    threshold, tags, authentication, httpHeaders,
  }) => ({
    name,
    url,
    protocol,
    path,
    port,
    webhook,
    timeout,
    interval,
    threshold,
    tags,
    authentication,
    httpHeaders,
  }));

  res.status(200).json(mappedChecks);
};

const updateCheck = async (req, res) => {
  const { value, error } = CheckSchema.validate(req.body);
  if (error) throw SCHEMA_VALIDATION_ERROR(error);

  const { id } = req.params;
  const oldCheck = Check.findById(id);
  clearInterval(oldCheck.intervalId);

  const updatedCheck = await Check.findOneAndReplace({ _id: id }, value, { new: true });
  checkHandler(updateCheck._id);
  const handlerInterval = setInterval(checkHandler, value.interval * 60 * 1000, updatedCheck._id);
  updatedCheck.intervalId = handlerInterval;
  await updatedCheck.save();

  res.status(201).json({ message: 'Check updated successfully!', updatedCheck });
};

const deleteCheck = async (req, res) => {
  const { id } = req.params;
  const check = Check.findById(id);
  clearInterval(check.intervalId);

  const response = await Check.deleteOne({ _id: id });

  res.status(202).json({ message: 'Check deleted successfully!', deletedChecks: response.deletedCount });
};

const report = async (req, res) => {
  const { id, tag } = req.query;
  const { _id: userId } = req.user;
  const result = await getReportBy({ id, tag, userId });
  res.json({ result });
};

module.exports = {
  createCheck,
  getChecks,
  updateCheck,
  deleteCheck,
  report,
};
