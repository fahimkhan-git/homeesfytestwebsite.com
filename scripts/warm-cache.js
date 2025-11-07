#!/usr/bin/env node

const https = require('https');

const urlsToWarm = [
  'https://www.homeesfytestwebsite.com/',
  'https://www.homeesfytestwebsite.com/style.css',
  'https://www.homeesfytestwebsite.com/assets/js/main.js',
  'https://www.homeesfytestwebsite.com/assets/images/banner/banner.webp'
];

function warmUrl(url) {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        res.resume();
        console.log(`Warmed ${url} → ${res.statusCode}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error warming ${url}: ${err.message}`);
        resolve();
      });
  });
}

(async () => {
  for (const url of urlsToWarm) {
    await warmUrl(url);
  }
})();

