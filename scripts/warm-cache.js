#!/usr/bin/env node

const https = require('https');

const deploymentHost = process.env.WARM_CACHE_HOST || 'https://www.homeesfytestwebsite.com';

const pathsToWarm = ['/'];

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
  for (const path of pathsToWarm) {
    const url = new URL(path, deploymentHost).toString();
    await warmUrl(url);
  }
})();

