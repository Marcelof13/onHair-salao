const https = require('https');
const fs = require('fs');

const url = "https://files.oaiusercontent.com/file-K1f5yLgZb1j8g3W?se=2024-03-01T08%3A05%3A05Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D12999e2b-f38b-4b2a-aecf-b98a3bca447b.webp&sig=G0x/B9zFk8OEYy9S5eK5Aowv0/YnC/kHIf+G7S2t/M0%3D";

https.get(url, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed to download: ${res.statusCode}`);
        return;
    }

    const file = fs.createWriteStream('src/assets/images/logo.png');
    res.pipe(file);

    file.on('finish', () => {
        file.close();
        console.log('Download complete.');
    });
}).on('error', (err) => {
    console.error(`Error: ${err.message}`);
});
