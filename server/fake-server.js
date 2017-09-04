const express = require('express');
const render = require('./tmpl');

module.exports = function start(port = 5000, onListen = () => {}) {
  const app = express();

  app.get('/', (req, res) => {
    res.send(render('./server/index.ejs'));
  });

  app.use('/assets', express.static('./src/assets'));

  return app.listen(port, () => {
    console.log('Server is listening on port ' + port + '...');
    onListen();
  });
};
