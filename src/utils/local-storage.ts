import { LOCALSTORAGE_SCOREBOARD_KEY } from '../constants/misc';
import type { ScoreBoardRecord } from '../types/score-board-record';

export const writeScoreBoardDataToLocalStorage = (record: ScoreBoardRecord) => {
    const currentScoreBoardData: ScoreBoardRecord[] = readScoreBoardDataFromLocalStorage();

    const foundRecord = currentScoreBoardData.find(
        (scoreRecord) => scoreRecord.player === record.player,
    );

    let newData;

    if (foundRecord) {
        if (record.score > foundRecord.score) {
            foundRecord.score = record.score;
            foundRecord.dateString = record.dateString;
            newData = currentScoreBoardData;
        } else return; // if the player already has record, and he made poorer performance, we don't save it
    } else {
        const desiredIndex = currentScoreBoardData.findIndex((data) => data.score < record.score);
        const insertAt = desiredIndex === -1 ? currentScoreBoardData.length : desiredIndex;

        newData = [
            ...currentScoreBoardData.slice(0, insertAt),
            record,
            ...currentScoreBoardData.slice(insertAt),
        ];
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
