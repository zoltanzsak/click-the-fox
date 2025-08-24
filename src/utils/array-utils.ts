import type { ScoreBoardRecord } from '../types/score-board-record';

// Non Biased Shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
export const mutatingShuffle = <T>(arr: T[]): T[] => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export const nonMutatingShuffle = <T>(arr: T[]): T[] => {
    return mutatingShuffle([...arr]);
};

export const insertRecordSorted = (
    data: ScoreBoardRecord[],
    record: ScoreBoardRecord,
): ScoreBoardRecord[] => {
    const desiredIndex = data.findIndex((d) => d.score < record.score);
    const insertAt = desiredIndex === -1 ? data.length : desiredIndex;

    const newData = [...data];
    newData.splice(insertAt, 0, record);
    return newData;
};
