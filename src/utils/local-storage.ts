import { LOCALSTORAGE_SCOREBOARD_KEY } from '../config/constants';
import type { ScoreBoardRecord } from '../types/score-board-record';
import { insertRecordSorted } from './array-utils';
import { safeGet, safeSet } from './storage';

export const writeScoreBoardDataToLocalStorage = (record: ScoreBoardRecord) => {
    const currentScoreBoardData: ScoreBoardRecord[] = readScoreBoardDataFromLocalStorage();
    let newData: ScoreBoardRecord[] = [...currentScoreBoardData];

    const foundIndex = currentScoreBoardData.findIndex(
        (scoreRecord) => scoreRecord.player === record.player,
    );

    if (foundIndex !== -1) {
        const foundRecord = currentScoreBoardData[foundIndex];

        // if there is a new highscore, remove old and insert a new without mutating original
        if (record.score > foundRecord.score) {
            newData.splice(foundIndex, 1);
            const updated: ScoreBoardRecord = {
                player: foundRecord.player,
                score: record.score,
                dateString: record.dateString,
            };
            newData = insertRecordSorted(newData, updated);
        } else {
            return;
        }
    } else {
        newData = insertRecordSorted(newData, record);
    }

    safeSet(localStorage, LOCALSTORAGE_SCOREBOARD_KEY, newData);
};

export const readScoreBoardDataFromLocalStorage = (): ScoreBoardRecord[] => {
    const data = safeGet<ScoreBoardRecord[]>(localStorage, LOCALSTORAGE_SCOREBOARD_KEY);
    return data ?? [];
};
