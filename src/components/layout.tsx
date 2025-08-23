import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className="h-screen w-screen">
            <h1 className="absolute left-1/2 -translate-x-1/2">Click The Fox! Game</h1>
            <main className="relative top-1/12 h-11/12 w-svw">
                <Outlet />
            </main>
        </div>
    );
};
