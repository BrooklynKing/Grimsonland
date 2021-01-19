const fs = require('fs');
const ejs = require('ejs');
const express = require('express');

function render(template, data) {
  const options = Object.assign(
    {
      debug: true,
      basename: '/',
      staticsBaseUrl: '//localhost:3200/',
    },
    data,
  );

  return ejs.render(fs.readFileSync(template, { encoding: 'utf8' }), options);
}

function start(port = 3000, onListen = () => {}) {
  const app = express();

  app.get('/', (req, res) => {
    res.send(render('./dev/index.ejs'));
  });

  app.use('/assets', express.static('./src/assets'));

  return app.listen(port, () => {
    console.log('Server is listening on port ' + port + '...');
    onListen();
  });
}

start();
