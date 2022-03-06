import { Application } from 'express';
const spdy = require('@vmcodes/node-spdy');
const fs = require('fs');

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
        protocols: ['h2', 'http/1.1', 'http/1.0'],
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
