import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/welcome';
import { Game } from './pages/game';
import { ScoreBoard } from './pages/scoreboard';
import { Layout } from './components/layout';
import { useEffect } from 'react';
import { CAT_API_KEY, DOG_API_KEY } from './config/constants';
import { initMockScoreBoard } from './utils/mock-scoreboard';

export default function App() {
    // Without api-key the app can be broken or behave unexpectedly
    // DISCLAIMER: With defined, but not valid api key, it still works, but API responses can be unexpected
    useEffect(() => {
        if (!DOG_API_KEY || !CAT_API_KEY) {
            throw new Error('Api Keys must be defined!');
        }

        // Set up a mock scoreboard so it's not empty
        initMockScoreBoard();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/score-board" element={<ScoreBoard />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/" element={<Welcome />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
