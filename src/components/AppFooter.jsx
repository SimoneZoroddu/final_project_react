export default function AppFooter() {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container text-center">
                <p className="mb-2">© 2026 Game Store. Tutti i diritti riservati.</p>

                <div className="d-flex justify-content-center gap-4">
                    <a
                        href="https://www.instagram.com/"
                        className="text-white fs-4"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                    >
                        <i className="bi bi-instagram"></i>
                    </a>

                    <a
                        href="https://www.facebook.com/"
                        className="text-white fs-4"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                    >
                        <i className="bi bi-facebook"></i>
                    </a>

                    <a
                        href="https://www.tiktok.com/"
                        className="text-white fs-4"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="TikTok"
                    >
                        <i className="bi bi-tiktok"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
