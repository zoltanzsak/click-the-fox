import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './mocks/server';
import { ImageFetcher } from '../lib/image-fetcher';

describe('ImageFetcher', () => {
    beforeEach(() => {
        ImageFetcher.resetFields();
    });

    it('should fetch and return images successfully', async () => {
        await ImageFetcher.fetchNextBatch(1);

        const batches = ImageFetcher.getBatches();
        expect(batches).toHaveLength(1);
        expect(batches[0]).toHaveLength(9); // 1 fox + 4 dogs + 4 cats

        const fox = batches[0].find((img) => img.type === 'fox');
        expect(fox).toBeDefined();
        expect(fox?.url).toBe('https://randomfox.ca/images/1.jpg');
    });

    it('should fetch 3 new batches on fetchnewbatches(3)', async () => {
        await ImageFetcher.fetchNextBatch(3);

        const batches = ImageFetcher.getBatches();
        expect(batches.length).toBe(3);
    });

    it('should handle server errors for foxes', async () => {
        server.use(
            http.get('https://randomfox.ca/floof/', () => {
                return new HttpResponse(null, { status: 500 });
            }),
        );

        await ImageFetcher.fetchNextBatch();
        const batches = ImageFetcher.getBatches();
        expect(batches).toHaveLength(0);
    });
});
