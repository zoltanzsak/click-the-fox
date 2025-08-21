import { useEffect, useState } from 'react';
import { useTimer } from '../hooks/use-timer';
import type { ImageAsset } from '../types/image-asset';
import { fetchBatch } from '../utils/game-utils';

export const Game = () => {
    const [images, setImages] = useState<ImageAsset[]>([]);
    const [nextImages, setNextImages] = useState<ImageAsset[]>([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const timeLeft = useTimer(10, () => {
        window.location.href = '/score-board';
    });

    useEffect(() => {
        fetchBatch().then(setImages);
        fetchBatch().then(setNextImages);
    }, []);

    const handleClick = async (animal: ImageAsset) => {
        if (isLoading) return;
        if (animal.type === 'fox') {
            setScore((s) => s + 1);
        } else {
            setScore((s) => s - 1);
        }
        setImages(nextImages);
        try {
            setIsLoading(true);
            const newBatch = await fetchBatch();
            setNextImages(newBatch);
        } catch (error) {
            console.error('Failed to fetch new batch:', error);
        } finally {
            setIsLoading(false);
        }
    };
    if (images.length === 0) return <div>Loading…</div>;
    return (
        <div className="p-4">
            <h2>Time left: {timeLeft}s</h2> <h2>Score: {score}</h2>
            <div className="grid grid-cols-3 gap-2">
                {images.map((animal, i) => (
                    <img
                        key={i}
                        src={animal.url}
                        alt={animal.type}
                        className="cursor-pointer rounded"
                        onClick={() => handleClick(animal)}
                    />
                ))}
            </div>
        </div>
    );
};
