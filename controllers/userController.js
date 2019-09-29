var knex = require('../config/knex');
var md5 = require('md5');
var message = require('../utils/message')

module.exports.getUsers = async (req, res) => {
  try {
    var data = await knex.select().table('user');
    console.log("---", JSON.parse(JSON.stringify(data))[0]);
    return res.json({
      response: JSON.parse(JSON.stringify(data))[0]
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports.login = async (req, res) => {
  try {
    var data = await knex('user').where({email_id:req.body.email_id,password:md5(req.body.password),isActive:1}).select('id','email_id')
    console.log("data",data.length);
    if(data.length>0){
      return res.json({
        response: JSON.parse(JSON.stringify(data))[0],
        message:message.success.LOGIN
      });
    }else{
      return res.json({
        response: message.error.INVALID_LOGIN
      });
    }
    
  } catch (e) {
    console.log(e)
  }
}

module.exports.register = async (req, res) => {
  try {
    let isUserExist = await checkUserExist(req.body.email_id);
    if(isUserExist){
      return res.json({
        message:message.error.USER_ALLREADY_EXIST
      });
    }else{
      var data = await knex('user').insert({email_id:req.body.email_id,password:md5(req.body.password),isActive:1});
      if(data.length>0){
        return res.json({
          message:message.success.REGISTER
        });
      }else{
        return res.json({
          response: message.error.UNABLE_REGISTER
        });
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports.forgotPassword = async (req,res) =>{
  try {
    var userDetails = await knex('user').where({email_id:req.body.email_id,isActive:1})
    if(userDetails.length>0){
      console.log("data",JSON.parse(JSON.stringify(userDetails)));
      return res.json({
        response: message.success.FORGOT_PASSWORD_SENT
      });
    }else{
      return res.json({
        response: message.error.USER_NOT_EXIST
      });
    }
  } catch (e) {
    console.log(e)
  }
}

var checkUserExist = async (email_id) =>{
  try {
    var data = await knex('user').where({email_id:email_id,isActive:1})
    console.log("data",data.length);
    if(data.length>0){
      return true;
    }else{
      return false;
    }
  } catch (e) {
    console.log(e)
  }
}