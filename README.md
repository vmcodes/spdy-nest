## Description

<p>A wrapper for <a href="https://github.com/spdy-http2/node-spdy" target="_blank">SPDY Server</a> intended to make creating HTTP2 servers a little easier in <a href="https://github.com/nestjs/nest" target="_blank">Nest JS</a>.</p>

## Installation

```bash
$ npm install spdy-nest
```

## Usage

Implementation is almost identical to the
<a href="https://docs.nestjs.com/faq/multiple-servers" target="_blank">documentation</a> on using
HTTPS in Nest.

```javascript
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
const spdyNest = require('spdy-nest');
const cors = require('cors');
const express = require('express');
const server = express();

// paths to certificates
const httpsOptions = {
  key: './secrets/private-key.pem',
  cert: './secrets/public-certificate.pem',
};

async function bootstrap() {
  // enable cors
  server.use(cors());

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.listen(3000);

  await spdyNest(options, server, 443);
}

bootstrap();
```
