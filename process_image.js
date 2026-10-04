import { Jimp } from 'jimp';

async function main() {
    const img = await Jimp.read('src/assets/glossy-heart.png');
    img.scan((x, y, idx) => {
        const r = img.bitmap.data[idx + 0];
        const g = img.bitmap.data[idx + 1];
        const b = img.bitmap.data[idx + 2];
        
        // Remove white and near-white pixels (handling anti-aliasing)
        if (r > 240 && g > 240 && b > 240) {
            img.bitmap.data[idx + 3] = 0; // Fully transparent
        } else if (r > 200 && g > 200 && b > 200 && (Math.abs(r-g) < 15) && (Math.abs(g-b) < 15)) {
            // Anti-aliasing edges: make semi-transparent based on lightness
            const lightness = (r + g + b) / 3;
            const alpha = Math.max(0, 255 - ((lightness - 200) * 4));
            img.bitmap.data[idx + 3] = Math.min(img.bitmap.data[idx + 3], alpha);
        }
    });
    await img.write('src/assets/glossy-heart-transparent.png');
}
main();
