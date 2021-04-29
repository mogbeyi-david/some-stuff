const fetch = require('node-fetch');
const {prepareData, renderData} = require('./solution');

// example of run, you could leave it or modify however you want
fetch('https://api.spacexdata.com/v3/launches/past')
  .then(response => response.json())
  .then(prepareData)
  .then(renderData)
