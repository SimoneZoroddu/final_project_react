import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState, } from "react";

const GlobalContext = createContext();

const envFileAPI = import.meta.env.VITE_API

const api = axios.create({
    baseURL: envFileAPI,
});

function GlobalProvider({ children }) {
    const [games, setGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);

    const [loadingGames, setLoadingGames] = useState(true);
    const [loadingGame, setLoadingGame] = useState(false);

    const [gamesError, setGamesError] = useState("");
    const [gameError, setGameError] = useState("");

    const getGames = useCallback(async () => {
        const response = await api.get("");
        return response.data;
    }, []);

    const getGameById = useCallback(async (id) => {
        try {
            setLoadingGame(true);
            setGameError("");
            setCurrentGame(null);

            const response = await api.get(`/${id}`);

            setCurrentGame(response.data);
        } catch (err) {
            console.error(
                `Errore durante il caricamento del gioco ${id}:`,
                err
            );

            if (err.response?.status === 404) {
                setGameError("Gioco non trovato.");
            } else {
                setGameError(
                    "Impossibile caricare il gioco. Controlla che il backend Spring sia avviato."
                );
            }
        } finally {
            setLoadingGame(false);
        }
    }, []);

    useEffect(() => {
        async function loadGames() {
            try {
                const data = await getGames();

                setGames(data);
                setGamesError("");
            } catch (err) {
                console.error(
                    "Errore durante il caricamento dei giochi:",
                    err
                );

                setGamesError(
                    "Impossibile caricare i giochi. Controlla che il backend Spring sia avviato."
                );
            } finally {
                setLoadingGames(false);
            }
        }

        loadGames();
    }, [getGames]);

    return (
        <GlobalContext.Provider
            value={{
                games,
                currentGame,
                loadingGames,
                loadingGame,
                gamesError,
                gameError,
                getGames,
                getGameById,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
    return useContext(GlobalContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { GlobalProvider, useGlobalContext };