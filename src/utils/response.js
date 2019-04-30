

exports.sendResponse = function(data, req, res) {
  //
  if (typeof data === 'object' && data && ('error' in data)) {
    res.status(400).json(data);
  } else {
    res.json(data);
  }
};


exports.sendValidateResponse = function(errors, ext, req, res) {
  console.log(errors.array());
  var error = errors.array()[0];

  return exports.sendResponse({
    error: {
      status: 400,
      code: ext + '_01',
      message: error.param + ': ' + error.msg
    }
  }, req, res);
};
