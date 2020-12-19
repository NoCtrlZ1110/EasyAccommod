const express = require('express');
const path = require('path');
const app = express();

const port = 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || port, () =>
  console.log(`Server running at → ${port}!`)
);
