const validator = require('validator')

const validateRequest = async (req, res, next) => {
  try {
    const { vendor, date } = req.body;

    if (!vendor || !date || !validator.isDate(date)) {
      return res.status(400).json({
        message: 'Invalid request data'
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

module.exports = validateRequest;
