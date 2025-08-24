import { SESSIONSTORAGE_NAME_KEY } from '../constants/misc';
import { safeGet, safeSet, safeRemove } from './storage';

export const writePlayerNameToSessionStorage = (playerName: string) => {
    safeSet(window.sessionStorage, SESSIONSTORAGE_NAME_KEY, playerName);
};

export const readPlayerNameFromSessionStorage = (): string =>
    safeGet<string>(window.sessionStorage, SESSIONSTORAGE_NAME_KEY) ?? '';

export const clearPlayerNameFromSessionStorage = () =>
    safeRemove(window.sessionStorage, SESSIONSTORAGE_NAME_KEY);
