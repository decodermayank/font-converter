const localtunnel = require('localtunnel');
const fs = require('fs');

(async () => {
    try {
        console.log('Connecting tunnel to http://localhost:8080...');
        const tunnel = await localtunnel({ port: 8080, subdomain: 'kruti-dev-converter-' + Math.floor(Math.random() * 8999 + 1000) });

        console.log('\n==================================================');
        console.log('PUBLIC CLIENT SHAREABLE URL:');
        console.log(tunnel.url);
        console.log('==================================================\n');

        fs.writeFileSync('CLIENT_SHARE_LINK.txt', `PUBLIC CLIENT URL: ${tunnel.url}\n`);

        tunnel.on('close', () => {
            console.log('Tunnel closed.');
        });
    } catch (err) {
        console.error('Tunnel error:', err);
    }
})();
