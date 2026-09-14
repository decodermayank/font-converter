const { exec } = require('child_process');
const fs = require('fs');

const p = exec('npx -y localtunnel --port 8080');

p.stdout.on('data', (data) => {
    console.log('STDOUT:', data);
    fs.appendFileSync('PUBLIC_LINK.txt', data);
});

p.stderr.on('data', (data) => {
    console.log('STDERR:', data);
});
