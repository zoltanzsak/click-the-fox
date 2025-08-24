import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/welcome';
import { Game } from './pages/game';
import { ScoreBoard } from './pages/scoreboard';
import { Layout } from './components/layout';

export default function App() {
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
