angular
  .module('LoginController', [
    'characterSheet.auth',
    'characterSheet.users',
    'toggleDirective',
  ])
  .controller('LoginController', [
    'auth',
    'users',
    function (auth, users) {

      var login = this;

      login.inputType = 'signin';

      login.submit = function(email, password)
      {
        login.errorMessage = null;

        login[login.inputType](email, password)
          .then(function(res) {
            // TODO redirect to the character sheet selection page
          })
          .catch(function(res) {
            console.log(res.status, res.data);
            login.errorMessage = res.data.message;
          });
      };

      login.signin = function(email, password) {
        return auth.login(email, password);
      };

      login.register = function(email, password, confirmPassword) {
        return users
          .create({
            email: email,
            password: password,
          })
          .then(function(res) {
            return auth.login(email, password);
          });
      };
    },
  ]);
