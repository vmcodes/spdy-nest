const spdy = require('@vmcodes/node-spdy');
const fs = require('fs');

interface Options {
  key: string;
  cert: string;
}

async function spdyNest(options: Options, express: Function, port?: number): Promise<Function> {
  if (express) {
    try {
      const PORT: number = port || 443;

      const httpsOptions = {
        key: fs.readFileSync(options.key),
        cert: fs.readFileSync(options.cert),
        spdy: {
          protocols: ['h2', 'http/1.1', 'http/1.0'],
          plain: false,
        },
      };

      return await spdy.createServer(httpsOptions, express).listen(PORT);
    } catch (err) {
      throw new Error(err);
    }
  }

  throw new Error('express is undefined');
}

module.exports = spdyNest;
