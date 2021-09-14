const UserModel = require('../models/User');
const { LOGIN_FAIL_ERR, SCHEMA_VALIDATION_ERROR } = require('../error/errors');
const CustomError = require('../error/CustomError');
const { confirmationMailBody } = require('../mail/mailTemplates');
const { sendMail } = require('../mail/nodmaile');
const { LoginSchema, RegisterSchema } = require('../schemas/authSchema');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { value, error } = LoginSchema.validate(req.body);
    if (error) throw SCHEMA_VALIDATION_ERROR(error);
    const user = await UserModel.findOne({ email }).exec();
    if (!user) throw LOGIN_FAIL_ERR;
    const match = await user.comparePassword(password);
    if (!match) throw LOGIN_FAIL_ERR;
    if (user.status !== 'Active') throw new CustomError({ statusCode: 401, code: 'EMAIL_NOT_VERIVIED', message: 'Your email is not verified' });
    const token = await user.generateToken('3h');
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    const { value, error } = RegisterSchema.validate(req.body);
    if (error) throw SCHEMA_VALIDATION_ERROR(error);

    const {
      name, email, password,
    } = req.body;
    const code = await UserModel.generateConfirmationCode({ name, email });
    const user = new UserModel({
      name,
      email,
      password,
      code,
    });
    await user.save();
    sendMail({
      email,
      subject: 'confirm your mail',
      body: confirmationMailBody({ name, confirmationCode: code }),
    });
    const token = await user.generateToken('30m');
    res.status(200).json({ token });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

const mailConfirmation = async (req, res, next) => {
  try {
    const { confirmationCode } = req.params;
    const user = await UserModel.findOne({ code: confirmationCode }).exec();
    if (!user) throw LOGIN_FAIL_ERR;
    user.status = 'Active';
    await user.save();
    res.status(200).json({ message: 'Your mail is verified' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  signup,
  mailConfirmation,
};
