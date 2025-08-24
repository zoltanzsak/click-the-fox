import { IMAGE_SIZE } from '../constants/misc';
import type { ImageAsset } from '../types/image-asset';

export const fetchFoxes = async (n: number = 1): Promise<ImageAsset[]> => {
    const promises = Array.from({ length: n }, () =>
        fetch('https://randomfox.ca/floof/').then((res) => res.json()),
    );
    const results = await Promise.all(promises);
    return results.map((data: { image: string }) => ({ url: data.image, type: 'fox' }));
};

export const fetchDogs = async (number: number): Promise<ImageAsset[]> => {
    const res = await fetch(
        `https://api.thedogapi.com/v1/images/search?limit=${number}&size=small`,
        {
            headers: {
                'x-api-key': import.meta.env.VITE_DOG_API_KEY,
            },
        },
    );
    const data: { url: string }[] = await res.json();
    return data.map((item) => ({ url: item.url, type: 'dog' }));
};
export const fetchCats = async (number: number): Promise<ImageAsset[]> => {
    const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${number}&size=small`,
        {
            headers: {
                'x-api-key': import.meta.env.VITE_CAT_API_KEY,
            },
        },
    );
    const data: { url: string }[] = await res.json();
    return data.map((item) => ({ url: item.url, type: 'cat' }));
};
export const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve) => {
        const img = new Image(IMAGE_SIZE, IMAGE_SIZE);
        let settled = false;

        const onSettle = () => {
            if (settled) return;
            settled = true;
            resolve();

            // cleanup handlers
            img.onload = null;
            img.onerror = null;
        };

        img.onload = onSettle;
        img.onerror = onSettle;
        img.src = url;

        // add timeout
        setTimeout(onSettle, 1_000);
    });
};
