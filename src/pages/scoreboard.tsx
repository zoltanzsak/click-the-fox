import { useEffect, useState } from 'react';
import { readScoreBoardDataFromLocalStorage } from '../utils/local-storage';
import type { ScoreBoardRecord } from '../types/score-board-record';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { readPlayerNameFromSessionStorage } from '../utils/session-storage';

export const ScoreBoard = () => {
    const [data, setData] = useState<ScoreBoardRecord[]>([]);

    useEffect(() => {
        const scores = readScoreBoardDataFromLocalStorage();
        setData(scores);
    }, []);

    const currentPlayer = readPlayerNameFromSessionStorage();

    return (
        <div className="flex h-full flex-col justify-evenly py-32">
            <h1>HighScores</h1>
            {data.length > 0 ? (
                <table className="m-auto w-1/2 text-left">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((s, idx) => (
                            <tr
                                key={idx}
                                className={clsx(
                                    idx % 2 === 0 && 'bg-gray-200',
                                    currentPlayer === s.player &&
                                        'animate-pulse border-2 border-yellow-500',
                                )}
                            >
                                <td>{idx + 1}.</td>
                                <td>{s.player}</td>
                                <td>{s.dateString}</td>
                                <td>{s.score}</td>
                                {currentPlayer === s.player && (
                                    <td className="text-yellow-600"> {'<-'} Your Record! </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No scores...</div>
            )}
            <div className="flex w-full justify-evenly">
                <Link to="/">To Welcome Screen</Link>
                <Link to="/game">Play</Link>
            </div>
        </div>
    );
};
