
function authenticate(allowedRoles) {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      var role = req.user.role;
      if(allowedRoles.indexOf(role) != -1){
        next();
      }else{
        res.status(403).send('Go away!');
      }
    } else {
      res.redirect(config.server_root+'/login');
    }
  };
}

module.exports = function(app){
  app.get(config.server_root+'/login', function(req, res) {
    res.render('login', {
      message : req.flash('loginMessage'),
      root: config.server_root
    });
  });
  
  app.get(config.server_root+'/forgotpassword', function(req, res) {
    res.render('forgotpassword', {root: config.server_root});
  });
  
  app.get(config.server_root+'/changepass', authenticate(['manager', 'admin']), function(req, res) {
    res.render('setpassword', {root: config.server_root});
  });
  
  /*
   * Applications
   */
  app.post(config.server_root+'/application', application.createApplication);
  app.post(config.server_root+'/update', authenticate(['manager', 'admin']), application.updateApplication);
  app.get(config.server_root+'/application/:id', authenticate(['manager', 'admin']), application.getApplication);
  
  /*
   *  Admin
   */
  app.get(config.server_root+'/admin', authenticate(['manager', 'admin']), admin.renderAdminView);
  
  /*
   * User
   */
  app.post(config.server_root+'/login', user.login);
  app.post(config.server_root+'/signup', authenticate(['admin']), user.create);
  app.get(config.server_root+'/user/list', authenticate(['admin']), user.list);
  app.post(config.server_root+'/user/archieve', authenticate(['admin']), user.archieve);
  app.get(config.server_root+'/logout', user.logout);
  app.post(config.server_root+'/forgotpassword', user.forgotpassword);
  app.get(config.server_root+'/resetpassword/:token', user.resetpassword);
  app.post(config.server_root+'/setpasstoken', user.setpassToken);
  app.post(config.server_root+'/setpass',authenticate(['manager', 'admin']), user.setpass);
  app.get(config.server_root+'/user/manage', authenticate(['admin']), user.manage);
  app.get(config.server_root+'/user/get/:id', authenticate(['admin', 'manager']), user.get);
};