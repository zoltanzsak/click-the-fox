import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './mocks/server';
import { fetchCats, fetchDogs, fetchFoxes } from '../utils/game-utils';
import { CAT_PER_PAGE, DOG_PER_PAGE } from '../config/constants';

describe('game-utils', () => {
    describe('fetchFoxes', () => {
        it('should return a single fox', async () => {
            const foxes = await fetchFoxes(1);
            expect(foxes).toHaveLength(1);
            expect(foxes[0].type).toBe('fox');
            expect(foxes[0].url).toBe('https://randomfox.ca/images/1.jpg');
        });

        it('should return multiple foxes', async () => {
            const foxes = await fetchFoxes(3);
            expect(foxes).toHaveLength(3);
            foxes.forEach((fox) => {
                expect(fox.type).toBe('fox');
            });
        });

        it('should throw an error if the request fails', async () => {
            server.use(
                http.get('https://randomfox.ca/floof/', () => {
                    return new HttpResponse(null, { status: 500 });
                }),
            );
            await expect(fetchFoxes(1)).rejects.toThrow();
        });
    });

    describe('fetchDogs', () => {
        it('should return a single dog', async () => {
            const dogs = await fetchDogs(1);
            expect(dogs).toHaveLength(DOG_PER_PAGE);
            expect(dogs[0].type).toBe('dog');
        });

        it('should return multiple dogs', async () => {
            const amount = 3;
            const dogs = await fetchDogs(amount);
            expect(dogs).toHaveLength(amount * DOG_PER_PAGE);
            dogs.forEach((dog) => {
                expect(dog.type).toBe('dog');
            });
        });

        it('should throw an error if the request fails', async () => {
            server.use(
                http.get('https://api.thedogapi.com/v1/images/search', () => {
                    return new HttpResponse(null, { status: 500 });
                }),
            );
            await expect(fetchDogs(1)).rejects.toThrow();
        });
    });

    describe('fetchCats', () => {
        it('should return a single cat', async () => {
            const cats = await fetchCats(1);
            expect(cats).toHaveLength(CAT_PER_PAGE);
            expect(cats[0].type).toBe('cat');
        });

        it('should return multiple cats', async () => {
            const amount = 3;
            const cats = await fetchCats(amount);
            expect(cats).toHaveLength(amount * CAT_PER_PAGE);
            cats.forEach((cat) => {
                expect(cat.type).toBe('cat');
            });
        });

        it('should throw an error if the request fails', async () => {
            server.use(
                http.get('https://api.thecatapi.com/v1/images/search', () => {
                    return new HttpResponse(null, { status: 500 });
                }),
            );
            await expect(fetchCats(1)).rejects.toThrow();
        });
    });
});
