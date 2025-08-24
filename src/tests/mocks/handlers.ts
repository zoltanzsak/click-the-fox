import { http, HttpResponse } from 'msw';
import { CAT_PER_PAGE, DOG_PER_PAGE } from '../../constants/misc';

export const handlers = [
    http.get('https://randomfox.ca/floof/', ({ request }) => {
        const url = new URL(request.url);
        const index = Number(url.searchParams.get('i') ?? 1);
        return HttpResponse.json({ image: `https://randomfox.ca/images/${index}.jpg` });
    }),
    http.get('https://api.thedogapi.com/v1/images/search', ({ request }) => {
        const url = new URL(request.url);
        const limit = Number(url.searchParams.get('limit') ?? 1);
        const images = Array.from({ length: limit * DOG_PER_PAGE }, (_, i) => ({
            url: `https://cdn2.thedogapi.com/images/${i + 1}.jpg`,
        }));
        return HttpResponse.json(images);
    }),
    http.get('https://api.thecatapi.com/v1/images/search', ({ request }) => {
        const url = new URL(request.url);
        const limit = Number(url.searchParams.get('limit') ?? 1);
        const images = Array.from({ length: limit * CAT_PER_PAGE }, (_, i) => ({
            url: `https://cdn2.thecatapi.com/images/${i + 1}.jpg`,
        }));
        return HttpResponse.json(images);
    }),
];
