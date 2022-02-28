## Description

<p>A wrapper for <a href="https://www.npmjs.com/package/spdy" target="_blank">SPDY Server</a> intended to make creating HTTP2 servers a little easier in <a href="https://www.npmjs.com/package/spdy" target="_blank">Nest JS</a>.</p>

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
const express = require('express');
const server = express();

// paths to certificates
const httpsOptions = {
  key: './secrets/private-key.pem',
  cert: './secrets/public-certificate.pem',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  await app.listen(3000);
  spdyNest(httpsOptions, server, 443);
}

bootstrap();
```
