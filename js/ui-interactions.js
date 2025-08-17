/*
Projet: NewsGAMES
Auteur: Brandon VIRY (Optimisé)
Titre: Interactions UI optimisées
*/

class UIManager {
    constructor() {
        this.dialogModal = document.getElementById('dialog');
        this.dialogOkBtn = document.getElementById('dialog-ok');
        this.reloadBtn = document.getElementById('reload-btn');
        
        this.init();
    }

    init() {
        this.bindUIEvents();
        // Ne pas afficher automatiquement le dialog au chargement
        // this.showInitialDialog();
    }

    bindUIEvents() {
        // Dialog modal
        if (this.dialogOkBtn) {
            this.dialogOkBtn.addEventListener('click', () => {
                this.closeDialog();
            });
        }

        // Bouton reload
        if (this.reloadBtn) {
            this.reloadBtn.addEventListener('click', () => {
                this.reloadPage();
            });
        }

        // Fermer les modals avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Gestion des clics en dehors des modals
        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });
    }

    showInitialDialog() {
        if (this.dialogModal) {
            this.dialogModal.setAttribute('aria-hidden', 'false');
            
            // Focus sur le bouton OK
            setTimeout(() => {
                if (this.dialogOkBtn) {
                    this.dialogOkBtn.focus();
                }
            }, 100);
        }
    }

    closeDialog() {
        if (this.dialogModal) {
            // Animation de fermeture
            this.dialogModal.classList.add('modal-exit');
            
            setTimeout(() => {
                this.dialogModal.setAttribute('aria-hidden', 'true');
                this.dialogModal.classList.remove('modal-exit');
            }, 300);
        }
    }

    reloadPage() {
        // Confirmation avant rechargement
        this.showConfirmDialog(
            'Êtes-vous sûr de vouloir recharger la page ?',
            () => {
                // Animation de chargement
                this.showLoadingIndicator();
                
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        );
    }

    showLoadingIndicator() {
        const loader = document.createElement('div');
        loader.className = 'loading-indicator';
        loader.innerHTML = `
            <div class="spinner"></div>
            <p>Rechargement en cours...</p>
        `;
        
        // Styles inline pour le loader
        Object.assign(loader.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            color: 'white'
        });

        document.body.appendChild(loader);
    }

    closeAllModals() {
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            if (modal.getAttribute('aria-hidden') !== 'true') {
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    handleOutsideClick(e) {
        // Fermer les modals si on clique en dehors du contenu
        const modals = document.querySelectorAll('[role="dialog"]');
        
        modals.forEach(modal => {
            if (modal.getAttribute('aria-hidden') !== 'true') {
                const modalContent = modal.querySelector('#dialog-content, #search-content');
                if (modalContent && !modalContent.contains(e.target) && e.target === modal) {
                    modal.setAttribute('aria-hidden', 'true');
                }
            }
        });
    }

    // Utilitaires pour les animations
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'flex';
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.opacity = Math.min(progress / duration, 1);
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    fadeOut(element, duration = 300) {
        let start = null;
        const initialOpacity = parseFloat(getComputedStyle(element).opacity);
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.opacity = initialOpacity * (1 - progress / duration);
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.setAttribute('aria-hidden', 'true');
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Notifications toast
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Styles pour le toast
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Couleurs selon le type
        const colors = {
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#F44336'
        };
        
        toast.style.background = colors[type] || colors.info;

        document.body.appendChild(toast);

        // Animation d'entrée
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Animation de sortie
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    }

    // Gestion des erreurs
    handleError(error, context = '') {
        console.error(`Erreur ${context}:`, error);
        this.showToast(`Une erreur est survenue ${context}`, 'error');
    }

    // Confirmation personnalisée
    showConfirmDialog(message, onConfirm, onCancel) {
        const confirmDialog = document.createElement('div');
        confirmDialog.className = 'confirm-dialog';
        confirmDialog.setAttribute('role', 'dialog');
        confirmDialog.setAttribute('aria-labelledby', 'confirm-title');
        confirmDialog.setAttribute('aria-hidden', 'false');
        
        confirmDialog.innerHTML = `
            <div class="confirm-content">
                <h3 id="confirm-title">Confirmation</h3>
                <p>${this.escapeHtml(message)}</p>
                <div class="confirm-buttons">
                    <button class="confirm-btn confirm-yes">Oui</button>
                    <button class="confirm-btn confirm-no">Non</button>
                </div>
            </div>
        `;

        // Styles pour la dialog
        Object.assign(confirmDialog.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1001'
        });

        const content = confirmDialog.querySelector('.confirm-content');
        Object.assign(content.style, {
            background: 'white',
            color: 'black',
            padding: '24px',
            borderRadius: '8px',
            textAlign: 'center',
            maxWidth: '400px',
            margin: '20px'
        });

        document.body.appendChild(confirmDialog);

        // Event listeners
        const yesBtn = confirmDialog.querySelector('.confirm-yes');
        const noBtn = confirmDialog.querySelector('.confirm-no');

        yesBtn.addEventListener('click', () => {
            confirmDialog.remove();
            if (onConfirm) onConfirm();
        });

        noBtn.addEventListener('click', () => {
            confirmDialog.remove();
            if (onCancel) onCancel();
        });

        // Fermer avec Escape
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                confirmDialog.remove();
                document.removeEventListener('keydown', escapeHandler);
                if (onCancel) onCancel();
            }
        };
        document.addEventListener('keydown', escapeHandler);

        // Focus sur le bouton Non par défaut
        setTimeout(() => noBtn.focus(), 100);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.uiManager = new UIManager();
});

// Styles CSS pour les animations et composants
const uiStyles = document.createElement('style');
uiStyles.textContent = `
    .modal-exit {
        animation: fadeOutModal 0.3s ease-in forwards !important;
    }

    @keyframes fadeOutModal {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
    }

    .loading-indicator .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255,255,255,0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .confirm-btn {
        padding: 10px 20px;
        margin: 0 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: background 0.3s ease;
    }

    .confirm-yes {
        background: #4CAF50;
        color: white;
    }

    .confirm-yes:hover {
        background: #45a049;
    }

    .confirm-no {
        background: #f44336;
        color: white;
    }

    .confirm-no:hover {
        background: #da190b;
    }

    .confirm-buttons {
        margin-top: 20px;
    }

    .toast {
        font-family: 'Libre Baskerville', serif;
        font-size: 14px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
`;

document.head.appendChild(uiStyles);
