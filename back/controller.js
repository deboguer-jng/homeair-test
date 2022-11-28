const csvParser = require('csvtojson')
const validator = require('validator')

const upload = async (req, res) => {
  const { csv } = req.files;

  return csvParser()
    .fromString(csv.data.toString())
    .then((csvRow) => {
      for (let i = 0; i < csvRow.length; i ++) {
        const row = csvRow[i];
        if (!row['Model Number']?.length) {
          return res.status(400).json({
            message: `Invalid csv Model Number type: row - ${i + 1}`
          });
        } else if (!validator.isFloat(row['Unit Price'])) {
          return res.status(400).json({
            message: `Invalid csv Unit Price type: row - ${i + 1}`
          });
        } else if (!validator.isDecimal(row['Quantity'])) {
          return res.status(400).json({
            message: `Invalid csv Quantity type: row - ${i + 1}`
          });
        }
      }
      return res.status(200).json({
        message: 'success'
      })
    })
    .catch(err => {
      return res.status(400).json({
        message: 'Invalid csv file format'
      })
    })
};

module.exports = upload;