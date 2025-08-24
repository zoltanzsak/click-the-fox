import type { ImageAsset } from '../types/image-asset';
import { fetchFoxes, fetchDogs, fetchCats, preloadImage } from '../utils/game-utils';
import { mutatingShuffle, nonMutatingShuffle } from '../utils/array-utils';
import { CAT_PER_PAGE, DOG_PER_PAGE } from '../constants/misc';

export class ImageFetcher {
    private static batches: ImageAsset[][] = [];
    private static currentlyFetchingIndex = 0;
    private static isFetching = false;

    static getBatches = () => this.batches;
    static getBatchByIndex = (idx: number) => this.batches[idx];
    static getCurrentlyFetchingIndex = () => this.currentlyFetchingIndex;
    static getIsFetching = () => this.isFetching;

    // For testing
    static resetFields = () => {
        this.batches = [];
        this.currentlyFetchingIndex = 0;
        this.isFetching = false;
    };

    static async fetchNextBatch(n: number = 1) {
        this.isFetching = true;
        try {
            const [foxes, dogs, cats] = await Promise.all([
                fetchFoxes(n),
                fetchDogs(DOG_PER_PAGE * n),
                fetchCats(CAT_PER_PAGE * n),
            ]);

            const shuffled = Array.from({ length: n }).map((_, idx) =>
                nonMutatingShuffle([
                    foxes[idx],
                    ...dogs.slice(idx * DOG_PER_PAGE, (idx + 1) * DOG_PER_PAGE),
                    ...cats.slice(idx * CAT_PER_PAGE, (idx + 1) * CAT_PER_PAGE),
                ]),
            );

            shuffled.forEach((batch) => batch.forEach((a) => preloadImage(a.url)));

            this.batches.push(...shuffled);
            this.currentlyFetchingIndex += shuffled.length;
        } catch {
            console.error('Failed to fetch next Batch');
        } finally {
            this.isFetching = false;
        }
    }

    static reShuffleBatches() {
        mutatingShuffle(this.batches);
        this.batches.forEach((batch) => mutatingShuffle(batch));
    }
}
