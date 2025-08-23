import { SESSIONSTORAGE_NAME_KEY } from '../constants/misc';

export const writePlayerNameToSessionStorage = (playerName: string) => {
    window.sessionStorage.setItem(SESSIONSTORAGE_NAME_KEY, playerName);
};

export const readPlayerNameFromSessionStorage = (): string =>
    window.sessionStorage.getItem(SESSIONSTORAGE_NAME_KEY) || '';
