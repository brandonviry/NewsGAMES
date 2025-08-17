# NewsGAMES 

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/status-optimized-success.svg?style=for-the-badge)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge)

## Description

**NewsGAMES** est une plateforme web moderne et optimisée dédiée aux actualités gaming et à la découverte de jeux vidéo. L'application offre une interface élégante avec des fonctionnalités avancées pour explorer les dernières sorties, filtrer par genre et période, gérer ses jeux favoris avec un système de persistance local.

### Fonctionnalités avancées

#### Filtrage intelligent
- **Filtrage temporel** : Aujourd'hui, Demain, Cette semaine, Ce mois, 6 mois, Année
- **Filtrage par genre** : Battle Royale, FPS, RPG, Sport, Sandbox, MOBA
- **Recherche en temps réel** : Filtrage instantané par titre avec debouncing
- **Filtres combinés** : Possibilité de combiner plusieurs critères

#### Système de favoris avancé
- **Persistance locale** : Sauvegarde automatique dans localStorage
- **Animations fluides** : Effet heartbeat et transitions CSS
- **Compteur dynamique** : Affichage du nombre de favoris
- **Filtre dédié** : Vue spéciale pour les jeux favoris

#### Chargement dynamique optimisé
- **Architecture JSON** : Base de données structurée et extensible
- **Lazy loading** : Chargement progressif des images avec IntersectionObserver
- **Gestion d'erreurs** : Fallbacks et messages d'erreur utilisateur
- **Performance** : Optimisations avec will-change et debouncing

#### Design moderne glassmorphism
- **Effets visuels** : Backdrop-filter blur et gradients
- **Animations fluides** : Transitions CSS et staggered loading
- **Responsive design** : Mobile-first avec CSS Grid
- **Thème gaming** : Interface sombre optimisée

#### Accessibilité complète
- **ARIA labels** : Support complet des lecteurs d'écran
- **Navigation clavier** : Tabulation et raccourcis
- **Reduced motion** : Respect des préférences utilisateur
- **Contraste élevé** : Conformité WCAG

## Architecture technique

### Structure modulaire optimisée
```
NewsGAMES/
├── index.html              # Page principale optimisée
├── styles/
│   ├── style.css              # Styles principaux avec variables CSS
│   ├── dialog.css             # Modales et overlays
│   └── prompt.css             # Composants interactifs
├── js/                     # Architecture modulaire
│   ├── games-loader.js        # Chargement dynamique et gestion des jeux
│   ├── navigation.js          # Filtrage temporel intelligent
│   ├── search.js              # Recherche en temps réel (SUPPRIMÉ - intégré)
│   ├── datetime.js            # Widget date/heure avec design moderne
│   └── ui-interactions.js     # Interactions UI et animations
├── data/
│   └── games.json             # Base de données JSON structurée
├── images/
│   ├── logo.png               # Assets optimisés
│   └── [images de jeux]       # Images avec lazy loading
├── bdd/
│   └── [Jeux]/                # Pages détaillées des jeux
└── README.md               # Documentation complète
```

### Classes JavaScript principales
- **`GamesLoader`** : Gestion complète des jeux (chargement, affichage, favoris)
- **`NavigationManager`** : Filtrage temporel avec logique de dates
- **`UIManager`** : Interactions, modales, notifications toast

## Fonctionnalités détaillées

### Filtrage temporel intelligent
- **Aujourd'hui** : Jeux sortis exactement aujourd'hui
- **Demain** : Sorties de demain uniquement
- **Cette semaine** : Sorties des 7 prochains jours
- **Ce mois-ci** : Sorties du mois en cours
- **Dans 6 mois** : Sorties des 6 prochains mois
- **Dans l'année** : Sorties de l'année en cours

### Filtrage par genre avec émojis
- **Battle Royale** : Fortnite, Apex Legends
- **FPS** : Call of Duty, Valorant  
- **RPG** : The Witcher 3, Cyberpunk 2077
- **Sport** : FIFA 24
- **Sandbox** : Minecraft
- **MOBA** : Nouveaux jeux MOBA

### Système de favoris avancé
- **Ajout/suppression** : Clic sur le cœur avec animation
- **Persistance** : Sauvegarde automatique localStorage
- **Compteur** : Affichage dynamique du nombre de favoris
- **Vue dédiée** : Filtre "Mes Favoris" pour voir uniquement les favoris

## Technologies et optimisations

### Frontend moderne
- **HTML5 sémantique** : Structure accessible et SEO-friendly
- **CSS3 avancé** : Variables CSS, Grid, Flexbox, animations
- **JavaScript ES6+** : Classes, modules, async/await
- **Responsive design** : Mobile-first avec breakpoints optimisés

### Performance
- **Lazy loading** : Images chargées à la demande
- **Debouncing** : Optimisation des recherches en temps réel
- **Will-change** : Optimisations GPU pour les animations
- **Minification** : Code optimisé pour la production

### Données et stockage
- **JSON structuré** : Base de données flexible et extensible
- **LocalStorage** : Persistance des favoris côté client
- **Gestion d'erreurs** : Fallbacks et récupération automatique

## Personnalisation avancée

### Variables CSS personnalisables
```css
:root {
  --primary-color: #0d6e98;
  --secondary-color: #18191b;
  --accent-color: #008CBA;
  --text-light: #ffffff;
  --border-radius: 15px;
  --transition: all 0.3s ease;
  --font-gaming: 'Orbitron', sans-serif;
  --font-body: 'Exo 2', sans-serif;
}
```

### Thèmes personnalisés
Modifiez les variables CSS pour créer vos propres thèmes :
- **Thème clair** : Couleurs inversées pour un mode jour
- **Thème coloré** : Gradients et couleurs vives
- **Thème minimaliste** : Couleurs neutres et espaces épurés

### Animations personnalisables
- **Durée des transitions** : Modifiez `--transition`
- **Effets de hover** : Personnalisez les transformations
- **Animations de chargement** : Ajustez les keyframes

## Fonctionnalités techniques avancées

### Optimisations de performance
- **IntersectionObserver** : Lazy loading intelligent des images
- **RequestAnimationFrame** : Animations fluides 60fps
- **Debouncing** : Limitation des appels de recherche
- **CSS will-change** : Optimisations GPU

### Gestion d'erreurs robuste
- **Try-catch** : Gestion des erreurs de chargement JSON
- **Fallbacks** : Images de remplacement automatiques
- **Messages utilisateur** : Notifications d'erreur claires
- **Récupération automatique** : Retry logic intégré

### Accessibilité WCAG
- **ARIA labels** : Descriptions complètes pour lecteurs d'écran
- **Focus management** : Navigation clavier optimisée
- **Contraste** : Ratios conformes aux standards
- **Reduced motion** : Respect des préférences utilisateur

## Résolution de problèmes

### Problèmes courants

#### Données non chargées
- Vérifiez que `data/games.json` existe
- Utilisez un serveur web local (pas file://)
- Consultez la console pour les erreurs CORS

#### Images manquantes
- Vérifiez les URLs dans `games.json`
- Placez les images locales dans `images/`
- Les fallbacks SVG s'affichent automatiquement

#### Favoris non sauvegardés
- Vérifiez que localStorage est activé
- Effacez le cache si nécessaire
- Testez en navigation privée

#### Filtres non fonctionnels
- Vérifiez la console JavaScript
- Assurez-vous que `games-loader.js` est chargé
- Vérifiez les dates dans `games.json`

### Mode debug
Ouvrez la console développeur pour voir :
- Logs détaillés de chargement
- Statistiques de filtrage
- Messages d'erreur explicites
- Métriques de performance

## Auteur et crédits

**VIRY Brandon**
- Développeur Full-Stack spécialisé
- Passionné de gaming et technologies web
- Expert en optimisation et UX moderne
- Contact : [votre-email]

### Remerciements
- Design inspiré des interfaces gaming modernes
- Documentation basée sur les meilleures pratiques
- Optimisations inspirées des standards web actuels

## Licence

Ce projet est sous licence personnalisée. Tous droits réservés à l'auteur.
Utilisation libre pour l'apprentissage et projets personnels.

## Contribution

Les contributions sont encouragées ! Pour contribuer :

1. **Fork** le projet sur GitHub
2. **Créez** une branche pour votre fonctionnalité
3. **Développez** en respectant l'architecture existante
4. **Testez** sur différents navigateurs
5. **Documentez** vos changements
6. **Soumettez** une Pull Request détaillée

### Guidelines de contribution
- Code commenté et documenté
- Tests sur Chrome, Firefox, Safari
- Compatibilité mobile vérifiée
- Accessibilité respectée
- Performance optimisée

## Roadmap et évolutions

### Version 2.1 (Prochaine)
- Système de notifications push
- Support multilingue (EN/FR)
- Statistiques utilisateur avancées
- Recommandations personnalisées

### Version 2.2 (Future)
- Intégration API gaming (Steam, Epic)
- Système de commentaires et avis
- Système de badges et achievements
- Progressive Web App (PWA)

### Version 3.0 (Vision)
- Intelligence artificielle pour recommandations
- Intégration avec plateformes gaming
- Streaming et vidéos intégrées
- Communauté et social features

## Ressources et liens utiles

### Documentation technique
- [MDN Web Docs](https://developer.mozilla.org/fr/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript ES6+](https://es6-features.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Outils de développement
- [JSON Validator](https://jsonlint.com/)
- [Color Palette Generator](https://coolors.co/)
- [Performance Testing](https://web.dev/measure/)
- [Accessibility Checker](https://wave.webaim.org/)

### Inspiration design
- [Gaming UI Patterns](https://gameuidatabase.com/)
- [Modern Web Design](https://awwwards.com/)
- [Mobile UX Best Practices](https://material.io/)

---

## Changelog récent

### Version 2.0.0 - Optimisation majeure
- **Nouveau** : Architecture modulaire avec 5 fichiers JS optimisés
- **Nouveau** : Système de favoris avec persistance localStorage
- **Nouveau** : Filtrage temporel intelligent avec logique de dates
- **Nouveau** : Recherche en temps réel avec debouncing
- **Nouveau** : Design glassmorphism avec animations fluides
- **Nouveau** : Accessibilité complète WCAG
- **Nouveau** : Lazy loading des images avec IntersectionObserver
- **Amélioré** : Performance générale et optimisations GPU
- **Amélioré** : Gestion d'erreurs robuste
- **Amélioré** : Structure JSON extensible
- **Corrigé** : Problèmes de responsive design
- **Corrigé** : Bugs de navigation et filtrage

---

N'hésitez pas à mettre une étoile si ce projet vous plaît !

Projet optimisé et prêt pour la production