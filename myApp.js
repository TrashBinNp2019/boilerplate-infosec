const express = require('express');
const { contentSecurityPolicy } = require('helmet');
const helmet = require('helmet');
const app = express();

app.use(helmet.noCache( true ));
app.use(helmet.dnsPrefetchControl( true ));
app.use(helmet({
  noCache: true,
  dnsPrefetchControl: true,
  frameguard: {
    action: 'deny',
  },
  contentSecurityPolicy: {
    directives: {
        defaultSrc: ["'self'"],
    }
  },
}))

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
