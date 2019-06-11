

exports.sendResponse = function(data, req, res) {
  //
  if (typeof data === 'object' && data && ('error' in data)) {
    res.status(data['error']['status'] || 400).json(data['error']);
  } else {
    res.json(data);
  }
};


exports.sendErrorResponse = function(data, req, res) {
  res.status(data.status).json(data);
};


exports.sendValidateResponse = function(errors, ext, req, res) {
  var error = errors.array()[0];

  return exports.sendResponse({
    status: 400,
    code: ext + '_01',
    message: error.param + ': ' + error.msg
  }, req, res);
};
