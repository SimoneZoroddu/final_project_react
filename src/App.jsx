import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalContext";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import SingleGame from "./pages/SingleGame";

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<DefaultLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/single-game/:id" element={<SingleGame />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    );
}

export default App;
