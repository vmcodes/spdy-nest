import { Application } from 'express';
const spdy = require('spdy');
const fs = require('fs');
const origWarning = process.emitWarning;
process.emitWarning = function (...args) {
  if (args[2] !== 'DEP0066') {
    // pass any other warnings through normally
    return origWarning.apply(process, args);
  }
};

interface Options {
  key: string;
  cert: string;
}

function spdyNest(options: Options, server: Application, port?: number) {
  const PORT = port || 443;

  try {
    const httpsOptions = {
      key: fs.readFileSync(options.key),
      cert: fs.readFileSync(options.cert),
      spdy: {
        protocols: ['h2', 'http/1.1'],
        plain: false,
      },
    };

    if (server) {
      console.log('HTTP2 is listening on port:', PORT);
      return spdy.createServer(httpsOptions, server).listen(PORT);
    } else {
      console.log('Express server not specified.');
      return process.exit(1);
    }
  } catch (err) {
    console.log(err);
    return process.exit(1);
  }
}

module.exports = spdyNest;
