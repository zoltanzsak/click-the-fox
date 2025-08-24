import type { ScoreBoardRecord } from '../types/score-board-record';

export const mutatingShuffle = <T extends unknown[]>(arr: T): T =>
    arr.sort(() => Math.random() - 0.5);

export const nonMutatingShuffle = <T extends unknown[]>(arr: T): T =>
    [...arr].sort(() => Math.random() - 0.5) as T;

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
