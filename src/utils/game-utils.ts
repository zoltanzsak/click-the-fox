import type { ImageAsset } from '../types/image-asset';

export const fetchFox = async (): Promise<ImageAsset> => {
    const res = await fetch('https://randomfox.ca/floof/');
    const data: { image: string } = await res.json();
    return { url: data.image, type: 'fox' };
};
export const fetchDogs = async (number: number): Promise<ImageAsset[]> => {
    const res = await fetch(`https://api.thedogapi.com/v1/images/search?limit=${number}`);
    const data: { url: string }[] = await res.json();
    return data.splice(number).map((item) => ({ url: item.url, type: 'dog' })); // Note the limit query param does not work, therefore using splice...
};
export const fetchCats = async (number: number): Promise<ImageAsset[]> => {
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${number}`);
    const data: { url: string }[] = await res.json();
    return data.splice(number).map((item) => ({ url: item.url, type: 'cat' })); // Note the limit query param does not work, therefore using splice...
};
function preloadImage(url: string): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
    });
}
export const fetchBatch = async (): Promise<ImageAsset[]> => {
    const [fox, dogs, cats] = await Promise.all([fetchFox(), fetchDogs(4), fetchCats(4)]);
    const all = [fox, ...dogs, ...cats];
    console.log({ all });
    const shuffled = all.sort(() => Math.random() - 0.5);
    await Promise.all(shuffled.map((a) => preloadImage(a.url)));
    return shuffled;
};
