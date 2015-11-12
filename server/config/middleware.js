var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function(app, express){

  // create express routes
  var userRouter = express.Router();
  var messageRouter = express.Router();

  // for parsing incoming requests and cookies
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());

  // landing page
  app.get('/wechat', function(req, res, next){
    res.render('landing');
  })

  // designate routes
  app.use('/wechat/users', userRouter);
  app.use('/wechat/messages', messageRouter);

  // require routers into route files
  require('../users/userRoutes.js')(userRouter);
  require('../messages/messageRoutes.js')(messageRouter);
};
