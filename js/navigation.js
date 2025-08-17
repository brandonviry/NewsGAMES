/*
Projet: NewsGAMES
Auteur: Brandon VIRY (Optimisé)
Titre: Navigation et filtrage optimisés
*/

class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('nav a');
        this.gamesLoader = null;
        this.init();
    }

    init() {
        this.bindNavigationEvents();
        // Attendre que le GamesLoader soit disponible
        this.waitForGamesLoader();
    }

    waitForGamesLoader() {
        // Vérifier si gamesLoader est disponible globalement
        if (window.gamesLoader && window.gamesLoader.games && window.gamesLoader.games.length > 0) {
            this.gamesLoader = window.gamesLoader;
            console.log('✅ NavigationManager connecté au GamesLoader');
        } else {
            console.log('⏳ Attente du GamesLoader...');
            setTimeout(() => this.waitForGamesLoader(), 200);
        }
    }

    bindNavigationEvents() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Vérifier que gamesLoader est disponible
                if (!this.gamesLoader) {
                    console.warn('⚠️ GamesLoader non disponible, nouvelle tentative...');
                    this.waitForGamesLoader();
                    return;
                }
                
                // Retirer la classe active de tous les liens
                this.navLinks.forEach(l => l.classList.remove('active'));
                // Ajouter la classe active au lien cliqué
                link.classList.add('active');
                
                const href = link.getAttribute('href');
                console.log(`🔄 Filtrage par période: ${href}`);
                this.filterGamesByPeriod(href);
            });
        });
    }

    filterGamesByPeriod(period) {
        if (!this.gamesLoader || !this.gamesLoader.games) {
            console.warn('❌ GamesLoader ou données non disponibles');
            return;
        }

        const currentDate = new Date();
        let filteredGames = [];

        switch(period) {
            case '#today':
                filteredGames = this.filterByToday(currentDate);
                break;
            case '#tomorrow':
                filteredGames = this.filterByTomorrow(currentDate);
                break;
            case '#week':
                filteredGames = this.filterByWeek(currentDate);
                break;
            case '#month':
                filteredGames = this.filterByMonth(currentDate);
                break;
            case '#semester':
                filteredGames = this.filterBySemester(currentDate);
                break;
            case '#year':
                filteredGames = this.filterByYear(currentDate);
                break;
            default:
                filteredGames = this.gamesLoader.games;
        }

        console.log(`📊 ${filteredGames.length} jeux trouvés pour ${period}`);
        
        // Afficher les jeux filtrés
        this.gamesLoader.displayGames('games-container', filteredGames);
        
        // Mettre à jour le message de statut
        this.updateStatusMessage(period, filteredGames.length);
        
        // Effacer le filtre par titre
        const titleFilterInput = document.getElementById('title-filter-input');
        if (titleFilterInput) {
            titleFilterInput.value = '';
        }
    }

    filterByToday(currentDate) {
        // Utiliser la date locale sans heure pour éviter les problèmes de fuseau horaire
        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const todayStr = today.toISOString().split('T')[0];
        
        console.log(`🔍 Recherche jeux pour aujourd'hui: ${todayStr}`);
        
        const filtered = this.gamesLoader.games.filter(game => {
            console.log(`📅 Comparaison: ${game.title} - ${game.releaseDate} === ${todayStr}`);
            return game.releaseDate === todayStr;
        });
        
        return filtered;
    }

    filterByTomorrow(currentDate) {
        const tomorrow = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        
        console.log(`🔍 Recherche jeux pour demain: ${tomorrowStr}`);
        
        return this.gamesLoader.games.filter(game => {
            console.log(`📅 Comparaison: ${game.title} - ${game.releaseDate} === ${tomorrowStr}`);
            return game.releaseDate === tomorrowStr;
        });
    }

    filterByWeek(currentDate) {
        const weekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const weekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
        
        console.log(`🔍 Recherche jeux pour cette semaine: ${weekStart.toISOString().split('T')[0]} à ${weekEnd.toISOString().split('T')[0]}`);
        
        return this.gamesLoader.games.filter(game => {
            const releaseDate = new Date(game.releaseDate + 'T00:00:00');
            const inRange = releaseDate >= weekStart && releaseDate <= weekEnd;
            console.log(`📅 ${game.title}: ${game.releaseDate} - ${inRange ? '✅' : '❌'}`);
            return inRange;
        });
    }

    filterByMonth(currentDate) {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        console.log(`🔍 Recherche jeux pour ce mois: ${currentMonth + 1}/${currentYear}`);
        
        return this.gamesLoader.games.filter(game => {
            const releaseDate = new Date(game.releaseDate + 'T00:00:00');
            const match = releaseDate.getMonth() === currentMonth && releaseDate.getFullYear() === currentYear;
            console.log(`📅 ${game.title}: ${game.releaseDate} - Mois: ${releaseDate.getMonth() + 1}, Année: ${releaseDate.getFullYear()} - ${match ? '✅' : '❌'}`);
            return match;
        });
    }

    filterBySemester(currentDate) {
        const sixMonthsLater = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, currentDate.getDate());
        
        console.log(`🔍 Recherche jeux pour les 6 prochains mois: jusqu'au ${sixMonthsLater.toISOString().split('T')[0]}`);
        
        return this.gamesLoader.games.filter(game => {
            const releaseDate = new Date(game.releaseDate + 'T00:00:00');
            const inRange = releaseDate >= currentDate && releaseDate <= sixMonthsLater;
            console.log(`📅 ${game.title}: ${game.releaseDate} - ${inRange ? '✅' : '❌'}`);
            return inRange;
        });
    }

    filterByYear(currentDate) {
        const currentYear = currentDate.getFullYear();
        
        console.log(`🔍 Recherche jeux pour cette année: ${currentYear}`);
        
        return this.gamesLoader.games.filter(game => {
            const releaseDate = new Date(game.releaseDate + 'T00:00:00');
            const match = releaseDate.getFullYear() === currentYear;
            console.log(`📅 ${game.title}: ${game.releaseDate} - Année: ${releaseDate.getFullYear()} - ${match ? '✅' : '❌'}`);
            return match;
        });
    }

    updateStatusMessage(period, count) {
        const periodNames = {
            '#today': 'aujourd\'hui',
            '#tomorrow': 'demain',
            '#week': 'cette semaine',
            '#month': 'ce mois-ci',
            '#semester': 'dans les 6 prochains mois',
            '#year': 'cette année'
        };

        const periodName = periodNames[period] || 'tous';
        const message = `${count} jeu(s) trouvé(s) pour ${periodName}`;
        
        // Afficher le message dans la console et optionnellement dans l'UI
        console.log(`📅 ${message}`);
        
        // Optionnel: afficher dans l'interface
        const statusElement = document.querySelector('.filter-status');
        if (statusElement) {
            statusElement.textContent = message;
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
});

// Export pour compatibilité
window.NavigationManager = NavigationManager;
