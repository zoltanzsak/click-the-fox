import { useEffect, useState } from 'react';
import { useTimer } from '../hooks/use-timer';
import type { ImageAsset } from '../types/image-asset';
import { ImageFetcher } from '../lib/image-fetcher';
import { GAME_TIME_SECONDS, IMAGE_SIZE, IMAGES_TO_PREFETCH } from '../constants/misc';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { readPlayerNameFromSessionStorage } from '../utils/session-storage';
import { writeScoreBoardDataToLocalStorage } from '../utils/local-storage';

export const Game = () => {
    const [currentBatchIndex, setCurrentBatchIndex] = useState<number>(0);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();

    const batches = ImageFetcher.getBatches();

    useEffect(() => {
        const isFetching =
            batches.length > 0 && ImageFetcher.getCurrentlyFetchingIndex() <= currentBatchIndex;
        console.log('dbg----', isFetching, batches.length);
        if (batches.length === 0 && !isFetching) navigate('/');
    }, [batches.length, currentBatchIndex]);

    const { timeLeft, startTimer, running } = useTimer(GAME_TIME_SECONDS, () => {
        const player = readPlayerNameFromSessionStorage();
        const dateString = new Date().toLocaleDateString();
        writeScoreBoardDataToLocalStorage({ player, score, dateString });
        navigate('/score-board');
    });

    const handleClick = (animal: ImageAsset) => {
        if (!running) startTimer();

        setScore((s) => (animal.type === 'fox' ? s + 1 : s - 1));
        setCurrentBatchIndex((prev) => prev + 1);

        const remaining = batches.length - (currentBatchIndex + 1);
        if (remaining <= IMAGES_TO_PREFETCH) {
            ImageFetcher.fetchNextBatch(IMAGES_TO_PREFETCH);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex w-full justify-center gap-32 text-lg font-bold">
                <span>Time left: {timeLeft}s </span>
                <span>Score: {score}</span>
            </div>

            {/* To prevent flickering on low-end devices we mount all the batches, and display only the current one */}
            {batches.map((batch, batchIndex) => (
                <div
                    key={batchIndex}
                    className={clsx(
                        'm-auto grid w-max grid-cols-3 gap-2',
                        batchIndex === currentBatchIndex ? 'grid' : 'hidden',
                    )}
                >
                    {batch.map((animal, i) => (
                        <div key={i} className="aspect-square">
                            <img
                                src={animal.url}
                                alt={animal.type}
                                className="cursor-pointer rounded object-cover"
                                style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                                onMouseDown={() => handleClick(animal)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
