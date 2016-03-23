var contact = require('./components/contact');
var group = require('./components/group');

function authenticate(allowedRoles) {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      var role = req.user.role;
      if (allowedRoles.indexOf(role) != -1) {
        next();
      } else {
        res.status(403).send('Go away!');
      }
    } else {
      res.redirect(config.server_root + '/login');
    }
  };
}

module.exports = function(app) {
  /*
   * Navigation
   */
  app.get(config.server_root + '/login', function(req, res) {
    res.render('login', {
      message: req.flash('loginMessage'),
      root: config.server_root
    });
  });

  app.get(config.server_root + '/forgotpassword', function(req, res) {
    res.render('forgotpassword', { root: config.server_root });
  });

  app.get(config.server_root + '/changepass', authenticate(['manager', 'admin']), function(req, res) {
    res.render('setpassword', { root: config.server_root });
  });

  app.get(config.server_root, authenticate(['admin', 'manager']), function(req, res){
    res.redirect(config.server_root+'/view/contacts');
  });
  
  app.get(config.server_root+'/view/contacts', authenticate(['admin', 'manager']), contact.view);
  app.get(config.server_root+'/view/groups', authenticate(['admin', 'manager']), group.view);

  /*
   * Contacts
   */
  app.post(config.server_root + '/contact', authenticate(['admin']), contact.create);
  app.put(config.server_root + '/contact', authenticate(['admin']), contact.update);
  app.get(config.server_root + '/contact/:id', authenticate(['admin']), contact.find);
  app.get(config.server_root + '/contact', authenticate(['admin']), contact.list);
  app.delete(config.server_root + '/contact/:id', authenticate(['admin']), contact.remove);

  /*
   * Groups
   */
  app.post(config.server_root + '/group', authenticate(['admin']), group.create);
  app.put(config.server_root + '/group', authenticate(['admin']), group.update);
  app.get(config.server_root + '/group/:id', authenticate(['admin']), group.find);
  app.get(config.server_root + '/group', authenticate(['admin']), group.list);
  app.delete(config.server_root + '/group/:id', authenticate(['admin']), group.remove);

  /*
   * User
   */
  app.post(config.server_root + '/login', user.login);
  app.post(config.server_root + '/signup', authenticate(['admin']), user.create);
  app.get(config.server_root + '/user/list', authenticate(['admin']), user.list);
  app.post(config.server_root + '/user/archieve', authenticate(['admin']), user.archieve);
  app.get(config.server_root + '/logout', user.logout);
  app.post(config.server_root + '/forgotpassword', user.forgotpassword);
  app.get(config.server_root + '/resetpassword/:token', user.resetpassword);
  app.post(config.server_root + '/setpasstoken', user.setpassToken);
  app.post(config.server_root + '/setpass', authenticate(['manager', 'admin']), user.setpass);
  app.get(config.server_root + '/user/manage', authenticate(['admin']), user.manage);
  app.get(config.server_root + '/user/get/:id', authenticate(['admin', 'manager']), user.get);
};