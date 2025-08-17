/*
Projet: NewsGAMES
Auteur: Brandon VIRY
Titre: Chargeur de jeux depuis JSON
*/

class GamesLoader {
    constructor() {
        this.games = [];
        this.categories = [];
        this.platforms = [];
        this.currentFilter = 'all';
        this.favorites = this.loadFavorites();
    }

    // Charger les données depuis le fichier JSON
    async loadData() {
        try {
            console.log(' Tentative de chargement depuis data/games.json...');
            const response = await fetch('data/games.json');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            this.games = data.games || [];
            this.categories = data.categories || [];
            this.platforms = data.platforms || [];
            
            console.log(` ${this.games.length} jeux chargés depuis le JSON`);
            console.log(' Données chargées:', this.games);
            
        } catch (error) {
            console.error(' Erreur lors du chargement du JSON:', error);
            console.error(' Détails de l\'erreur:', {
                message: error.message,
                stack: error.stack,
                url: window.location.href
            });
            
            // Essayer de servir le fichier localement
            console.log(' Tentative alternative...');
            throw error; // Relancer l'erreur pour forcer l'utilisateur à corriger
        }
    }

    // Générer le HTML d'une carte de jeu
    generateGameCard(game) {
        const isFavorite = this.favorites.includes(game.id);
        return `
            <article class="game-card" tabindex="0" role="button" aria-label="${game.title} - ${game.subtitle}" data-game-id="${game.id}">
                <div class="image-container">
                    <img src="${game.image}" 
                         alt="${game.title}" 
                         class="game-card-image"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNikiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4='; this.classList.add('error');">
                    <div class="image-overlay"></div>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                            data-game-id="${game.id}" 
                            aria-label="${isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
                            title="${isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
                        <span aria-hidden="true">${isFavorite ? '' : ''}</span>
                    </button>
                </div>
                <div class="game-card-content">
                    <h3 class="game-card-title">${game.title}</h3>
                    <p class="game-card-release">${game.genre} • ${game.year}</p>
                    ${game.rating ? `<div class="game-rating"> ${game.rating}/5</div>` : ''}
                </div>
                <span class="game-card-badge" style="background-color: ${game.badgeColor || '#008CBA'}">${game.badge}</span>
            </article>
        `;
    }

    // Afficher tous les jeux
    displayGames(container = 'games-container', gamesToShow = null) {
        const gamesContainer = document.getElementById(container);
        if (!gamesContainer) {
            console.error(`Container ${container} non trouvé`);
            return;
        }

        const games = gamesToShow || this.games;
        
        if (games.length === 0) {
            gamesContainer.innerHTML = '<p class="no-games">Aucun jeu trouvé</p>';
            return;
        }

        gamesContainer.innerHTML = games.map(game => this.generateGameCard(game)).join('');
        
        this.addGameClickEvents(container);
    }

    // Ajouter les événements de clic sur les cartes
    addGameClickEvents(container) {
        const gameCards = document.querySelectorAll(`#${container} .game-card`);
        gameCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Éviter le déclenchement si on clique sur le bouton favori
                if (e.target.closest('.favorite-btn')) {
                    return;
                }
                
                const gameId = parseInt(card.dataset.gameId);
                const game = this.games.find(g => g.id === gameId);
                if (game) {
                    this.showGameDetails(game);
                }
            });

            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const gameId = parseInt(card.dataset.gameId);
                    const game = this.games.find(g => g.id === gameId);
                    if (game) {
                        this.showGameDetails(game);
                    }
                }
            });
        });

        // Ajouter les événements pour les boutons favoris
        const favoriteButtons = document.querySelectorAll(`#${container} .favorite-btn`);
        favoriteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const gameId = parseInt(button.dataset.gameId);
                const isFavorite = this.favorites.includes(gameId);
                
                if (isFavorite) {
                    this.removeFavorite(gameId);
                } else {
                    this.addFavorite(gameId);
                }
            });
        });
    }

    // Afficher les détails d'un jeu
    showGameDetails(game) {
        const url = game.url;
        if (url) {
            window.open(url, '_blank');
        } else {
            const modal = document.getElementById('dialog');
            const modalContent = document.getElementById('dialog-content');
            
            if (modal && modalContent) {
                modalContent.innerHTML = `
                    <div class="game-details">
                        <img src="${game.image}" alt="${game.title}" class="game-details-image">
                        <div class="game-details-info">
                            <h2>${game.title}</h2>
                            <h3>${game.subtitle}</h3>
                            <p><strong>Genre:</strong> ${game.genre}</p>
                            <p><strong>Année:</strong> ${game.year}</p>
                            <p><strong>Développeur:</strong> ${game.developer || 'Non spécifié'}</p>
                            ${game.platform ? `<p><strong>Plateformes:</strong> ${game.platform.join(', ')}</p>` : ''}
                            ${game.rating ? `<p><strong>Note:</strong>  ${game.rating}/5</p>` : ''}
                            ${game.description ? `<p class="game-description">${game.description}</p>` : ''}
                        </div>
                    </div>
                    <button class="close-modal" onclick="closeDialog()">Fermer</button>
                `;
                
                modal.setAttribute('aria-hidden', 'false');
                modal.style.display = 'flex';
            }
        }
    }

    // Ajouter un jeu aux favoris
    addFavorite(gameId) {
        if (!this.favorites.includes(gameId)) {
            this.favorites.push(gameId);
            this.saveFavorites();
            this.updateFavoriteButton(gameId, true);
            this.announceFilterChange(`Jeu ajouté aux favoris`);
        }
    }

    // Retirer un jeu des favoris
    removeFavorite(gameId) {
        const index = this.favorites.indexOf(gameId);
        if (index !== -1) {
            this.favorites.splice(index, 1);
            this.saveFavorites();
            this.updateFavoriteButton(gameId, false);
            this.announceFilterChange(`Jeu retiré des favoris`);
            
            // Si on est en mode favoris et qu'on retire un favori, rafraîchir l'affichage
            if (this.currentFilter === 'favorites') {
                this.filterByGenre('favorites');
            }
        }
    }

    // Mettre à jour l'apparence du bouton favori
    updateFavoriteButton(gameId, isFavorite) {
        const button = document.querySelector(`[data-game-id="${gameId}"].favorite-btn`);
        if (button) {
            button.classList.toggle('active', isFavorite);
            button.setAttribute('aria-label', isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris');
            button.setAttribute('title', isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris');
            button.querySelector('span').textContent = isFavorite ? '' : '';
        }
    }

    // Filtrer par genre
    filterByGenre(genre, button) {
        // Mettre à jour l'état actif des boutons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        
        let filteredGames;
        
        if (genre === 'all') {
            filteredGames = this.games;
        } else if (genre === 'favorites') {
            filteredGames = this.games.filter(game => this.favorites.includes(game.id));
        } else {
            filteredGames = this.games.filter(game => game.genre === genre);
        }

        this.displayGames('games-container', filteredGames);
        this.updateFilterStatus(genre === 'all' ? 'tous les jeux' : `genre ${genre}`, filteredGames.length);
        
        // Effacer le filtre par titre
        const titleFilterInput = document.getElementById('title-filter-input');
        if (titleFilterInput) {
            titleFilterInput.value = '';
        }
    }

    // Mettre à jour le compteur de favoris
    updateFavoritesCount() {
        const favoritesButton = document.querySelector('[data-genre="favorites"]');
        if (favoritesButton) {
            const count = this.favorites.length;
            const buttonText = favoritesButton.childNodes[2]; // Le texte après l'emoji
            if (buttonText) {
                buttonText.textContent = count > 0 ? ` Mes Favoris (${count})` : ' Mes Favoris';
            }
        }
    }

    // Charger les favoris depuis localStorage
    loadFavorites() {
        try {
            const stored = localStorage.getItem('newsgames-favorites');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('Erreur lors du chargement des favoris:', error);
            return [];
        }
    }

    // Sauvegarder les favoris dans localStorage
    saveFavorites() {
        try {
            localStorage.setItem('newsgames-favorites', JSON.stringify(this.favorites));
        } catch (error) {
            console.warn('Erreur lors de la sauvegarde des favoris:', error);
        }
    }

    // Initialiser le chargeur
    async init() {
        console.log(' Initialisation du GamesLoader...');
        
        // Masquer le message de chargement initial
        const loadingMessage = document.querySelector('.loading-message');
        if (loadingMessage) {
            loadingMessage.style.display = 'block';
        }
        
        try {
            // Charger uniquement depuis JSON
            await this.loadData();
            console.log(' Données JSON chargées avec succès');
            
            // Afficher les jeux et configurer les filtres
            this.displayGames();
            this.setupGenreFilters();
            this.updateFavoritesCount();
            
            // Masquer le message de chargement
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
            
            console.log(` ${this.games.length} jeux chargés avec succès`);
            console.log(' GamesLoader disponible globalement:', !!window.gamesLoader);
            
        } catch (error) {
            console.error(' Erreur lors de l\'initialisation:', error);
            
            // Afficher un message d'erreur à l'utilisateur
            const gamesContainer = document.getElementById('games-container');
            if (gamesContainer) {
                gamesContainer.innerHTML = `
                    <div class="error-message">
                        <h3>Erreur de chargement</h3>
                        <p>Impossible de charger les données des jeux depuis data/games.json</p>
                        <p>Vérifiez que le fichier existe et est accessible.</p>
                        <button onclick="window.location.reload()" class="retry-btn">
                            Réessayer
                        </button>
                    </div>
                `;
            }
            
            // Masquer le message de chargement même en cas d'erreur
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
        }
    }

    setupGenreFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const titleFilterInput = document.getElementById('title-filter-input');
        
        // Filtres par genre
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const genre = button.dataset.genre;
                this.filterByGenre(genre, button);
            });
        });

        // Filtre par titre en temps réel
        if (titleFilterInput) {
            titleFilterInput.addEventListener('input', (e) => {
                this.filterByTitle(e.target.value);
            });

            // Effacer le filtre avec Escape
            titleFilterInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    e.target.value = '';
                    this.filterByTitle('');
                }
            });
        }
    }

    filterByTitle(titleQuery) {
        const query = titleQuery.toLowerCase().trim();
        
        if (!query) {
            // Si pas de recherche, afficher tous les jeux
            this.displayGames('games-container', this.games);
            this.updateFilterStatus('tous les jeux', this.games.length);
            return;
        }

        const filteredGames = this.games.filter(game => 
            game.title.toLowerCase().includes(query)
        );

        this.displayGames('games-container', filteredGames);
        this.updateFilterStatus(`titre contenant "${titleQuery}"`, filteredGames.length);

        // Réinitialiser les filtres de genre
        this.resetGenreFilters();
    }

    resetGenreFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        const allGamesBtn = document.querySelector('[data-genre="all"]');
        if (allGamesBtn) {
            allGamesBtn.classList.add('active');
            allGamesBtn.setAttribute('aria-pressed', 'true');
        }
    }

    updateFilterStatus(filterType, count) {
        console.log(` Filtre actif: ${count} jeu(s) pour ${filterType}`);
        
        // Optionnel: afficher dans l'interface
        const statusElement = document.querySelector('.filter-status');
        if (statusElement) {
            statusElement.textContent = `${count} jeu(s) - ${filterType}`;
        }
    }
}

// Instance globale
const gamesLoader = new GamesLoader();

// Exposer immédiatement dans window pour que navigation.js puisse y accéder
window.gamesLoader = gamesLoader;

console.log(' GamesLoader créé et exposé globalement');

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    console.log(' DOM chargé, initialisation du GamesLoader...');
    gamesLoader.init();
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GamesLoader;
}
