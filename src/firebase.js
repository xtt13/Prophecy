var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      // Google provider must be enabled in Firebase Console to support one-tap
      // sign-up.
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable this provider in one-tap sign-up.
      authMethod: 'https://accounts.google.com',
      // Required to enable ID token credentials for this provider.
      // This can be obtained from the Credentials page of the Google APIs
      // console.
      clientId: 'xxxxxxxxxxxxxxxxx.apps.googleusercontent.com'
    },
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Required to enable one-tap sign-up credential helper.
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
});
// Auto sign-in for returning users is enabled by default except when prompt is
// not 'none' in the Google provider custom parameters. To manually disable:
ui.disableAutoSignIn();


	  firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
          	console.log('signed in');
          	console.log(user);
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            user.getIdToken().then(function(accessToken) {
              document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('sign-in').textContent = 'Sign out';
              document.getElementById('account-details').textContent = JSON.stringify({
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                phoneNumber: phoneNumber,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
              }, null, '  ');
            });
          } else {
          	console.log('signed out');
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
          }
        }, function(error) {
          console.log(error);
        });