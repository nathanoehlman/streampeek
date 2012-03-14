// Based on code by Brandon Satrom (http://userinexperience.com/?p=714)

var exports = module.exports;

exports.setup = function(stream, opts, callback) {
    
    if (arguments.length == 2) {
        callback = opts;
        opts = null;
    }
    
    var original = stream,
        write = stream.write,
        block = (opts ? opts.block || false : false);            

    return (
              function(stub) {
                  return function (string, encoding, fd) {
                      callback(string, encoding, fd);
                      if (!block) {
                          stub.apply(process.stdout, arguments);    
                      }
                  };
              }
          )(stream.write);
};