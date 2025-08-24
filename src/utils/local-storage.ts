import { LOCALSTORAGE_SCOREBOARD_KEY } from '../constants/misc';
import type { ScoreBoardRecord } from '../types/score-board-record';
import { insertRecordSorted } from './array-utils';

export const writeScoreBoardDataToLocalStorage = (record: ScoreBoardRecord) => {
    const currentScoreBoardData: ScoreBoardRecord[] = readScoreBoardDataFromLocalStorage();
    let newData: ScoreBoardRecord[] = [...currentScoreBoardData];

    const foundIndex = currentScoreBoardData.findIndex(
        (scoreRecord) => scoreRecord.player === record.player,
    );

    if (foundIndex !== -1) {
        const foundRecord = currentScoreBoardData[foundIndex];

        if (record.score > foundRecord.score) {
            newData.splice(foundIndex, 1);
            foundRecord.score = record.score;
            foundRecord.dateString = record.dateString;
            newData = insertRecordSorted(newData, foundRecord);
        } else {
            return;
        }
    } else {
        newData = insertRecordSorted(newData, record);
    }

    const encoded = btoa(JSON.stringify(newData));
    localStorage.setItem(LOCALSTORAGE_SCOREBOARD_KEY, encoded);
};

export const readScoreBoardDataFromLocalStorage = (): ScoreBoardRecord[] => {
    const encoded = localStorage.getItem(LOCALSTORAGE_SCOREBOARD_KEY);
    if (!encoded) return [];
    try {
        const json = atob(encoded);
        return JSON.parse(json);
    } catch {
        sessionStorage.setItem(LOCALSTORAGE_SCOREBOARD_KEY, '[]'); // At this point, someone tried to cheat - so we wipe scoreboard
        return [];
    }
};
