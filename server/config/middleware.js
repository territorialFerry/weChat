module.exports = function(app, express){

  // create express routes
  var userRouter = express.Router();
  var messageRouter = express.Router();

  // designate routes
  app.use('/wechat/users', userRouter);
  app.use('/wechat/messages', messageRouter);

  // require routers into route files
  require('../users/userRoutes.js')(userRouter);
  require('../messages/messageRoutes.js')(messageRouter);
};
