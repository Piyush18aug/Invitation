import { Jimp } from 'jimp';

async function main() {
    const img = await Jimp.read('src/assets/glossy-heart.png');
    console.log("Image size:", img.bitmap.width, "x", img.bitmap.height);
    
    // Find bounding box of non-white pixels
    let minX = img.bitmap.width, maxX = 0, minY = img.bitmap.height, maxY = 0;
    img.scan((x, y, idx) => {
        const r = img.bitmap.data[idx];
        const g = img.bitmap.data[idx+1];
        const b = img.bitmap.data[idx+2];
        if (r < 240 || g < 240 || b < 240) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
    });
    console.log("Heart bounds:", {minX, maxX, minY, maxY});
    console.log("Heart width:", maxX - minX);
    console.log("Heart height:", maxY - minY);
}
main();
