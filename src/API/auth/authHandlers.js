/**
 * Created by djavrell on 10/01/17.
 */

const PostLoginHandler = (req, res, next) => {
  console.log(req.body);
  res.send({data: 'login'});
  next();
};

const GetLoginHandler = (req, res, next) => {
  console.log(req.body);
  res.send({data: 'login'});
  next();
};

const PostLogoutHandler = (req, res, next) => {
  res.send({data: 'logout'});
  next();
};

const PostRegisterHandler = (req, res, next) => {
  res.send({data: 'logout'});
  next();
};

const GetMeHandler = (req, res, next) => {
  res.send({data: 'logout'});
  next();
};

const DeleteMeHandler = (req, res, next) => {
  res.send({data: 'logout'});
  next();
};

const PutMeHandler = (req, res, next) => {
  res.send({data: 'logout'});
  next();
};




module.exports = {
  PostLoginHandler,
  GetLoginHandler,
  PostLogoutHandler,
  GetMeHandler,
  DeleteMeHandler,
  PutMeHandler,
  PostRegisterHandler,
};