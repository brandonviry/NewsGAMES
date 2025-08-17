/*
Projet: NewsGAMES
Auteur: Brandon VIRY (Optimisé)
Titre: Système de recherche optimisé - Intégré avec games-loader.js
*/

class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.searchOkBtn = document.getElementById('search-ok');
        this.promptModal = document.getElementById('prompt');
        this.gamesContainer = document.getElementById('games-container');
        this.searchResults = document.getElementById('search-results');
        
        this.init();
    }

    init() {
        this.bindSearchEvents();
        this.setupKeyboardShortcuts();
    }

    bindSearchEvents() {
        // Ouvrir la modal de recherche
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => {
                this.openSearchModal();
            });
        }

        // Effectuer la recherche
        if (this.searchOkBtn) {
            this.searchOkBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }

        // Recherche en temps réel
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.liveSearch(e.target.value);
            });

            // Recherche sur Enter
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        // Fermer la modal avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isSearchModalOpen()) {
                this.closeSearchModal();
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+F ou Cmd+F pour ouvrir la recherche
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                this.openSearchModal();
            }
        });
    }

    openSearchModal() {
        if (this.promptModal) {
            this.promptModal.style.display = 'grid';
            this.promptModal.setAttribute('aria-hidden', 'false');
            
            // Focus sur l'input
            if (this.searchInput) {
                setTimeout(() => {
                    this.searchInput.focus();
                    this.searchInput.select();
                }, 100);
            }
        }
    }

    closeSearchModal() {
        if (this.promptModal) {
            this.promptModal.style.display = 'none';
            this.promptModal.setAttribute('aria-hidden', 'true');
        }
    }

    isSearchModalOpen() {
        return this.promptModal && this.promptModal.style.display !== 'none';
    }

    performSearch() {
        const query = this.searchInput ? this.searchInput.value.trim() : '';
        
        if (!query) {
            this.showAllGames();
            this.closeSearchModal();
            return;
        }

        // Utiliser la méthode de recherche de games-loader.js
        if (window.gamesLoader) {
            window.gamesLoader.searchGames(query);
            this.announceSearchResults(query);
        }
        
        this.closeSearchModal();
    }

    liveSearch(query) {
        if (!query || query.length < 2) {
            return;
        }

        // Débounce pour éviter trop de recherches
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            if (window.gamesLoader) {
                window.gamesLoader.searchGames(query);
            }
        }, 300);
    }

    showAllGames() {
        // Utiliser la méthode de reset de games-loader.js
        if (window.gamesLoader) {
            window.gamesLoader.resetSearch();
        }

        if (this.searchInput) {
            this.searchInput.value = '';
        }
    }

    announceSearchResults(query) {
        // Attendre un peu que les résultats se chargent
        setTimeout(() => {
            const searchResultsContainer = document.getElementById('search-results');
            const mainContainer = document.getElementById('games-container');
            
            let gameCount = 0;
            
            if (searchResultsContainer && !searchResultsContainer.classList.contains('hidden')) {
                gameCount = searchResultsContainer.querySelectorAll('.game-card').length;
            } else if (mainContainer) {
                gameCount = mainContainer.querySelectorAll('.game-card').length;
            }

            const message = gameCount === 0 
                ? `Aucun résultat pour "${query}"`
                : `${gameCount} jeu${gameCount > 1 ? 'x' : ''} trouvé${gameCount > 1 ? 's' : ''} pour "${query}"`;

            this.createAriaAnnouncement(message);
        }, 100);
    }

    createAriaAnnouncement(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.searchManager = new SearchManager();
});

// Styles CSS pour le système de recherche
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .search-highlight {
        animation: searchPulse 0.6s ease-in-out;
        border-color: var(--accent-color, #008CBA) !important;
        box-shadow: 0 0 10px rgba(0, 140, 186, 0.5) !important;
    }

    @keyframes searchPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .no-games {
        text-align: center;
        padding: 2rem;
        background: rgba(0,0,0,0.8);
        border-radius: 15px;
        color: white;
        margin: 2rem auto;
        max-width: 400px;
        font-family: var(--font-body);
    }

    .no-games h3 {
        color: var(--accent-color);
        margin-bottom: 1rem;
    }

    .show-all-btn {
        background: var(--accent-color, #008CBA);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
        transition: background 0.3s ease;
        font-family: var(--font-body);
    }

    .show-all-btn:hover {
        background: var(--primary-color, #0d6e98);
    }
`;

document.head.appendChild(searchStyles);
