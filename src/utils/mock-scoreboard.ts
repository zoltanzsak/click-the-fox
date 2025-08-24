import type { ScoreBoardRecord } from '../types/score-board-record';
import {
    readScoreBoardDataFromLocalStorage,
    writeScoreBoardDataToLocalStorage,
} from './local-storage';
const mockScoreBoard: ScoreBoardRecord[] = [
    { player: 'CyberNinja', score: 20, dateString: '01/06/2024' },
    { player: 'PixelAvenger', score: 18, dateString: '02/06/2024' },
    { player: 'DataDynamo', score: 15, dateString: '03/06/2024' },
    { player: 'CodeWizard', score: 10, dateString: '04/06/2024' },
    { player: 'GlitchHunter', score: 5, dateString: '05/06/2024' },
    { player: 'LogicLord', score: 0, dateString: '06/06/2024' },
    { player: 'SyntaxSorcerer', score: -2, dateString: '07/06/2024' },
    { player: 'ByteBender', score: -5, dateString: '08/06/2024' },
    { player: 'KernelKing', score: -8, dateString: '09/06/2024' },
    { player: 'ScriptSavvy', score: -10, dateString: '10/06/2024' },
];

export const initMockScoreBoard = () => {
    const scoreBoardData = readScoreBoardDataFromLocalStorage();
    if (scoreBoardData.length > 0) return;

    mockScoreBoard.forEach((record) => writeScoreBoardDataToLocalStorage(record));
};
