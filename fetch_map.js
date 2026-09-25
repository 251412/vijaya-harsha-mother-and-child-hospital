const https = require('https');
https.get('https://www.google.com/maps/search/Vijaya+Harsha+Mother+%26+Child+Hospital+Srikakulam', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const cidMatch = data.match(/cid=(\d+)/) || data.match(/1s(0x[0-9a-f]+:0x[0-9a-f]+)/) || data.match(/!3m1!4b1!4m5!3m4!1s(0x[a-z0-9]+:0x[a-z0-9]+)/);
    const pbMatch = data.match(/pb=!1m[0-9][^"&]+/);
    console.log('CID Match:', cidMatch ? cidMatch[1] : 'None');
    console.log('PB Match:', pbMatch ? pbMatch[0] : 'None');
  });
});
