import { Jimp } from 'jimp';

async function main() {
    const img = await Jimp.read('src/assets/glossy-heart.png');
    const width = img.bitmap.width;
    const height = img.bitmap.height;
    
    // Simple flood fill from (0,0) replacing near-white with transparent
    const visited = new Uint8Array(width * height);
    const queue = [{x: 0, y: 0}];
    
    // Helper to check if a pixel is near-white
    const isBackground = (idx) => {
        const r = img.bitmap.data[idx];
        const g = img.bitmap.data[idx + 1];
        const b = img.bitmap.data[idx + 2];
        return r > 230 && g > 230 && b > 230; // lenient white threshold
    };
    
    // We add all 4 corners to start the queue, just in case
    queue.push({x: width - 1, y: 0});
    queue.push({x: 0, y: height - 1});
    queue.push({x: width - 1, y: height - 1});
    
    while (queue.length > 0) {
        const {x, y} = queue.pop();
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        
        const pos = y * width + x;
        if (visited[pos]) continue;
        visited[pos] = 1;
        
        const idx = pos * 4;
        if (isBackground(idx)) {
            // make it transparent
            img.bitmap.data[idx + 3] = 0;
            
            // enqueue neighbors
            queue.push({x: x + 1, y});
            queue.push({x: x - 1, y});
            queue.push({x, y: y + 1});
            queue.push({x, y: y - 1});
        }
    }
    
    // optional: feathering/anti-aliasing for non-background pixels that border background
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const pos = y * width + x;
            if (!visited[pos]) {
                const idx = pos * 4;
                // if it has a transparent neighbor, maybe soften it
                const neighbors = [
                    visited[(y-1)*width + x],
                    visited[(y+1)*width + x],
                    visited[y*width + (x-1)],
                    visited[y*width + (x+1)]
                ];
                let bgCount = neighbors.reduce((a, b) => a + b, 0);
                if (bgCount > 0 && isBackground(idx)) {
                    // It's a border pixel that's quite white, make it semi-transparent
                    img.bitmap.data[idx + 3] = 100;
                }
            }
        }
    }

    await img.write('src/assets/glossy-heart-transparent.png');
    console.log("Done");
}
main();
