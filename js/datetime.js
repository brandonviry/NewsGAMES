/*
Projet: NewsGAMES
Auteur: Brandon VIRY (Optimisé)
Titre: Gestion date et heure optimisée
*/

// Fonction simple et directe pour mettre à jour l'heure
function updateDateTime() {
    const now = new Date();
    
    // Mise à jour de l'heure
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const timeString = now.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = timeString;
        timeElement.setAttribute('datetime', now.toISOString());
    }
    
    // Mise à jour de la date
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const dateString = now.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        dateElement.textContent = dateString;
        dateElement.setAttribute('datetime', now.toISOString().split('T')[0]);
    }
}

// Initialisation immédiate
function initDateTime() {
    console.log(' Initialisation du système datetime...');
    
    // Première mise à jour
    updateDateTime();
    
    // Mise à jour toutes les secondes
    setInterval(updateDateTime, 1000);
    
    console.log(' Système datetime démarré');
}

// Démarrage automatique
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDateTime);
} else {
    initDateTime();
}

// Export pour compatibilité
window.ladate = new Date();
window.date = window.ladate.toLocaleDateString('fr-FR');
