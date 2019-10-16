var knex = require('../config/knex');
var message = require('../utils/message');

module.exports.getAllTrackingDetails = async (req, res) => {
    try {
      var data = await knex.select().table('table name');
      console.log("---", JSON.parse(JSON.stringify(data))[0]);
      return res.json({
        response: JSON.parse(JSON.stringify(data))[0]
      });
    } catch (e) {
      console.log(e);
    }
  };