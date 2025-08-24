import type { ImageAsset } from '../types/image-asset';
import { fetchFoxes, fetchDogs, fetchCats, preloadImage } from '../utils/game-utils';
import { mutatingShuffle, nonMutatingShuffle } from '../utils/array-utils';

const DOG_PER_PAGE = 4;
const CAT_PER_PAGE = 4;

export class ImageFetcher {
    private static batches: ImageAsset[][] = [];
    private static currentlyFetchingIndex = 0;

    static getBatches = () => this.batches;
    static getBatchByIndex = (idx: number) => this.batches[idx];
    static getCurrentlyFetchingIndex = () => this.currentlyFetchingIndex;

    static async fetchNextBatch(n: number = 1) {
        const [foxes, dogs, cats] = await Promise.all([
            fetchFoxes(n),
            fetchDogs(DOG_PER_PAGE * n),
            fetchCats(CAT_PER_PAGE * n),
        ]);

        const shuffled = nonMutatingShuffle(
            Array.from({ length: n }).map((_, idx) => [
                foxes[idx],
                ...dogs.slice(idx * DOG_PER_PAGE, (idx + 1) * DOG_PER_PAGE),
                ...cats.slice(idx * CAT_PER_PAGE, (idx + 1) * CAT_PER_PAGE),
            ]),
        );

        shuffled.forEach((batch) => batch.forEach((a) => preloadImage(a.url)));

        this.batches.push(...shuffled);
        this.currentlyFetchingIndex += shuffled.length;
    }

    static reShuffleBatches() {
        mutatingShuffle(this.batches);
        this.batches.forEach((batch) => mutatingShuffle(batch));
    }
}
