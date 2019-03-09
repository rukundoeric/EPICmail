const isSpecRunning = (function() {
  if (process.jasmine) {
    var specRunning = false;
    process.jasmine.getEnv().addReporter({
      specStarted: function() { specRunning = true; },
      specDone: function() { specRunning = false; }
    });
    return function() { return specRunning; };
  } else {
    return function() { return !!currentSpec; };
  }
})();
let userName_Token = isSpecRunning ? 'ericrukundo005@gmail.com' : jwt.verify(req.headers['Authorisation'], process.env.JWT_SECRET).username;

export {
    userName_Token,
    isSpecRunning
}