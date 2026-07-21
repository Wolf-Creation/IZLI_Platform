# Résumé du projet — IZLI Platform

## 1. Vision générale

**IZLI Platform** est un écosystème éditorial et commercial composé de deux expériences React réunies dans un même projet :

1. **IZLI Website** — l’expérience publique : découverte de la marque, commerce, contenus, héritage, communauté et programme Keeper Circle.
2. **IZLI Admin** — l’espace interne : gestion de la boutique, contenus, communauté, archives, production, QR, recommandations, analyse et paramètres système.

Les deux applications ne sont pas deux produits visuellement séparés : elles partagent une même **langue de design**, des composants communs, un vocabulaire d’entités et une couche d’architecture métier appelée **IZLI OS**.

> État actuel : le projet est une application front-end Vite/React. La plupart des écrans utilisent des données et états locaux de démonstration ; les interfaces de services, repositories, providers et moteurs dans `src/core/` préparent l’intégration d’un backend persistant sans coupler les écrans à un fournisseur précis.

---

## 2. Stack technique

| Élément | Rôle |
|---|---|
| **React 19** | Composition des interfaces et gestion d’état local. |
| **TypeScript** | Typage des écrans, entités, routes, services et contrats métier. |
| **Vite** | Serveur de développement et build de production. |
| **Tailwind CSS v4** | Utilitaire CSS disponible pour les nouvelles interfaces ; l’application utilise aussi des styles inline cohérents avec le shell existant. |
| **Google Fonts** | Playfair Display, Inter et JetBrains Mono, chargées dans `src/index.css`. |

---

## 3. Arborescence principale

```text
src/
├── App.tsx                     # Switcher Website/Admin et shell Admin principal
├── main.tsx                    # Point d’entrée React
├── index.css                   # Styles globaux, polices, mapping Tailwind
├── types.ts                    # Union `Screen` des écrans Admin
├── tokens.ts                   # Réexport de compatibilité des tokens partagés
│
├── apps/                       # Entrées canoniques des applications
│   ├── admin/                  # Documentation/entrée Admin
│   └── website/                # Entrée Website
│
├── components/                 # Shell visuel historique de l’Admin
│   ├── Sidebar.tsx             # Navigation Admin et lien Design System
│   └── Topbar.tsx              # Barre de contexte/action Admin
│
├── screens/                    # Écrans métier de l’Admin
├── website/                    # Website public : pages, navbar, footer, types
├── shared/                     # Bibliothèque réellement partagée
│   ├── components/ui/          # Primitives : Button, Card, Input, Badge, Modal…
│   ├── components/entities/    # Cartes des entités : Product, Story, Member…
│   ├── components/layouts/     # Container, Grid, PageHeader, FilterToolbar…
│   ├── hooks/                  # Hooks de lecture/interaction métier
│   ├── services/               # Services front-end par domaine
│   └── theme/                  # Tokens de couleurs, typo, spacing, ombres…
│
├── core/                       # IZLI OS : contrats et orchestration métier
├── entities/                   # Définitions TypeScript des entités de plateforme
├── routes/                     # Constantes et helpers de routes Admin/Website
└── imports/                    # Documents de cadrage/imports ; ne pas modifier pour implémenter une UI
```

---

## 4. Démarrage et navigation des applications

### 4.1 Point d’entrée

`src/main.tsx` monte le composant racine `App` dans le DOM.

### 4.2 `src/App.tsx` : orchestrateur de surface

`App.tsx` maintient un état d’application (`website` ou `admin`) et affiche :

- `WebsiteApp` lorsque l’utilisateur est dans la partie publique ;
- le shell Admin lorsque l’utilisateur est dans la partie interne.

Un bouton flottant permet actuellement de basculer entre les deux surfaces dans la démo. Cela illustre le fait que les deux expériences appartiennent au même produit, tout en conservant leurs navigations respectives.

### 4.3 Navigation actuelle

La navigation est aujourd’hui **gérée en mémoire** via `useState` et des unions TypeScript (`Screen` pour l’Admin, `WebPage` pour le Website). Les fichiers `src/routes/admin.ts` et `src/routes/website.ts` définissent déjà des routes URL et des helpers de construction de chemins : ils servent de contrat pour une future navigation URL complète (par exemple avec React Router).

---

## 5. IZLI Website — fonctionnement

### 5.1 Composition

`src/website/WebsiteApp.tsx` est le conteneur principal du site public :

```text
WebsiteApp
├── Navbar
├── page active (Home, Shop, Stories…)
└── Footer (sauf écrans spécifiques tels que Login)
```

La fonction `navigate(page)` change la page active, puis remonte la fenêtre en haut de page pour préserver l’expérience de navigation.

### 5.2 Pages publiques

| Domaine | Pages | Finalité |
|---|---|---|
| Découverte | `Home`, `About`, `Heritage` | Présenter l’univers, la vision et le patrimoine IZLI. |
| Commerce | `Shop`, `Collections`, `ProductDetail`, `Cart` | Découvrir les collections, consulter un produit et préparer l’achat. |
| Éditorial | `Stories` | Consommer les histoires, contenus et regards liés aux objets et à la marque. |
| Communauté | `Community`, `CommunityLab`, `Events` | Découvrir ou rejoindre projets, appels et événements. |
| Héritage | `Legacy`, `Archives`, `KeeperCircle` | Explorer les archives et les mécanismes de contribution/reconnaissance. |
| Compte | `Login`, `Profile` | Poser le parcours d’authentification et d’espace personnel. |

### 5.3 Liens internes du Website

- Un **produit** peut mener à son détail, à sa collection, à son histoire, à son passeport ou à ses contenus associés.
- Une **story** peut contextualiser un produit, une archive, une personne ou un projet communautaire.
- Les surfaces **Legacy**, **Archives** et **Keeper Circle** relient l’achat et la consultation à la provenance, la contribution et la reconnaissance.
- La **Navbar** et le **Footer** sont les composants publics transversaux ; ils utilisent le même langage de tokens que l’Admin.

---

## 6. IZLI Admin — fonctionnement

### 6.1 Shell Admin

Le shell affiché par `App.tsx` est composé de :

```text
Admin shell
├── Sidebar (`src/components/Sidebar.tsx`)
├── Topbar (`src/components/Topbar.tsx`)
└── écran actif (`src/screens/*.tsx`)
```

- La **Sidebar** contient les domaines fonctionnels et les écrans principaux.
- La **Topbar** exprime le contexte de l’écran actif et les actions globales.
- `renderScreen()` dans `App.tsx` associe chaque valeur de `Screen` à son composant d’écran.
- `src/types.ts` est le registre de types des écrans ; un nouvel écran doit y être ajouté avant d’être branché dans `App.tsx` et la Sidebar.

### 6.2 Domaines Admin

| Domaine | Exemples d’écrans | Ce que l’Admin permet de faire |
|---|---|---|
| **Dashboard** | `Dashboard` | Lire l’activité de la plateforme et accéder aux priorités. |
| **Commerce** | Produits, collections, commandes, clients | Créer/éditer les catalogues, organiser les collections, suivre commandes et clients. |
| **Content / CMS** | Home Builder, pages, média, stories, review queue | Composer l’expérience éditoriale et valider les contenus avant publication. |
| **Community** | Membres, contributions, challenges, Lab, appels | Gérer la participation, les initiatives et les contributions. |
| **Legacy** | Archives, timeline, Keeper Circle, rewards, votes, referrals | Administrer l’héritage, les archives et les mécanismes de reconnaissance. |
| **Production** | Production Center, templates, assets, print presets, batch, export | Préparer les actifs de marque, QR, impressions et exports en série. |
| **Product passports / QR** | Passeports produits, QR Experiences | Associer un objet physique à son identité, sa provenance et ses contenus numériques. |
| **Recommandations & style** | Recommendation Hub, Style Guides | Configurer la curation et l’intelligence de style. |
| **Analytics** | Commerce, Community, Content, Legacy, Production, Recommendations | Lire les indicateurs de performance par domaine. |
| **System** | Team & Roles, Automation, Global Settings, Audit Log | Administrer droits, automatisations, paramètres et traçabilité. |
| **Design System** | `Components.tsx` | Documenter la bibliothèque partagée officielle. |

### 6.3 Design System

L’ancien item **Components** a été renommé **Design System**. `src/screens/Components.tsx` est désormais la référence de documentation interne :

- foundations, tokens, typographie, couleurs ;
- composants UI et composants métier ;
- composants Website, Admin, Legacy, Production et Content Graph ;
- patterns, motion, accessibilité et changelog ;
- recherche par nom, tag, domaine, token ou pattern ;
- aperçus visuels et principes d’utilisation.

Il ne remplace pas les composants existants : il les documente et en garantit la cohérence.

---

## 7. Bibliothèque partagée et design language

### 7.1 Tokens

La source de vérité visuelle est `src/shared/theme/tokens.ts`. `src/tokens.ts` ne fait que réexporter ces valeurs pour préserver les imports historiques.

Les tokens comprennent notamment :

- couleurs : indigo, surfaces chaudes, sable, argile, sage et états sémantiques ;
- typographies : Playfair Display, Inter, JetBrains Mono ;
- échelle typographique, line-height et letter-spacing ;
- espacement, rayons, bordures et ombres ;
- transitions, easing, dimensions de layout, z-index et focus ring.

`src/index.css` déclare les polices et expose les couleurs/typographies via le thème Tailwind. Website et Admin doivent utiliser ces valeurs au lieu de créer un nouveau langage visuel.

### 7.2 Composants réutilisables

La bibliothèque sous `src/shared/components/` est organisée en trois niveaux :

1. **UI** : primitives génériques — `Button`, `Input`, `Card`, `Badge`, `Modal`, `Tabs`, `Toast`, etc.
2. **Layouts** : structures de page — `Container`, `Grid`, `PageHeader`, `FilterToolbar`, `SidebarLayout`.
3. **Entities** : cartes spécialisées — `ProductCard`, `CollectionCard`, `StoryCard`, `MemberCard`, `ChallengeCard`, `OrderCard`, etc.

Cette séparation permet au Website et à l’Admin de partager les fondations sans perdre leurs besoins de densité et de contexte propres.

---

## 8. Entités et Content Graph

Les entités de la plateforme sont centralisées dans `src/entities/` et réexportées dans `src/core/entities/`. Elles constituent le vocabulaire commun des deux applications : produits, collections, stories, archives, membres, contributions, projets, commandes, récompenses, passeports, etc.

### 8.1 Principe relationnel

IZLI ne traite pas les objets comme des silos. Le **Content Graph** (`src/core/entities/index.ts`) gère des références transversales :

```text
Product ── appartient à ──> Collection
   │
   ├── est raconté par ──> Story
   ├── est contextualisé par ──> Archive / Heritage
   ├── est identifié par ──> Product Passport / QR Experience
   └── peut inspirer ──> Style Guide / Recommendation

Member ── participe à ──> Contribution / Challenge / Community Project
   └── progresse dans ──> Keeper Circle / Rewards / Achievements
```

Le `ContentGraph` expose :

- `addNode(ref)` : enregistre une entité ;
- `link(parentId, childId)` : crée un lien parent/enfant ;
- `getChildren(entityId)` et `getParents(entityId)` : récupèrent les relations.

Les écrans de contenu, de passeport, de recommandations et de Legacy doivent exploiter ce modèle pour révéler le contexte d’une entité plutôt que seulement ses champs isolés.

---

## 9. IZLI OS (`src/core/`) — couche métier

IZLI OS est une couche d’abstraction indépendante des écrans. Son rôle est d’organiser la logique métier, les règles et les intégrations futures.

| Module | Responsabilité |
|---|---|
| `entities` | Types d’entités et Content Graph. |
| `engines` | Logique par domaine : commerce, contenu, communauté, legacy, production, QR, recommandations, recherche, style intelligence, analytics, notifications, automations. |
| `services` | Contrats/implémentations de services métier tels que Product, Keeper, Archive et Search. |
| `repositories` | Accès aux données par type d’entité, isolé du reste de l’application. |
| `providers` | Adaptateurs d’infrastructure : données, média, cache. |
| `events` | Event bus et événements IZLI pour découpler les domaines. |
| `workflows` | Cycles de vie : produit, archive, keeper, QR et publication. |
| `automations` | Définitions d’automatisations et sélection des automatisations actives. |
| `permissions` | Rôles Admin/Membre/Plateforme et contrôle d’accès. |
| `registry` | Registre des types d’entités, métadonnées et recherche. |
| `generators` | Génération d’identifiants produits, QR, referrals, badges et passeports. |
| `analytics` | Contrats de métriques commerce, community, legacy, QR et production. |

### 9.1 Flux métier conceptuel

```text
Écran Website ou Admin
        ↓
Hooks / services partagés
        ↓
IZLI OS : service ou engine de domaine
        ↓
Repository
        ↓
Provider de données / média / cache
        ↓
Backend futur ou source de données
```

Ce découplage permet de remplacer des données de démonstration par une API, Supabase ou un autre backend sans réécrire chaque écran.

---

## 10. Flux entre Website et Admin

### Commerce et contenu

1. L’équipe crée un **produit** et le place dans une **collection** depuis l’Admin.
2. Elle associe médias, texte, story, guide de style et relations de contenu.
3. La publication alimente les surfaces Website : Shop, Collections, Product Detail et Stories.
4. Les données d’engagement, d’achat et de contenu alimentent ensuite les écrans Analytics Admin.

### Produit, passeport et QR

1. L’Admin crée/édite un **Product Passport** et un lien **QR Experience**.
2. Le moteur/générateur QR prépare l’identifiant et l’expérience liée.
3. Le QR public peut ouvrir une expérience contextualisée : produit, origine, archive, histoire, conseils ou communauté.
4. Les interactions QR doivent contribuer aux métriques Analytics et au Content Graph.

### Community et Legacy

1. Les membres interagissent avec les défis, contributions, projets et événements sur le Website.
2. L’Admin modère, examine et gère ces objets dans les écrans Community.
3. Les contributions significatives peuvent être reliées aux archives, récompenses, niveaux Keeper ou achievements.
4. Website et Admin présentent donc la même donnée sous deux angles : participation publique et gouvernance interne.

### Production et diffusion

1. Les équipes créent assets, templates, presets et batch jobs dans Production Center.
2. Les exports et médias produits sont réutilisables dans le CMS, les fiches produits, les campagnes et les QR experiences.
3. L’Admin conserve le suivi de production ; le Website restitue le résultat final validé.

---

## 11. Événements, workflows et automatisations

La couche core prépare une logique évènementielle : une action métier peut émettre un événement et déclencher plusieurs réactions sans couplage direct entre les écrans.

Exemples de scénarios attendus :

- publication d’un produit → indexation recherche, rafraîchissement de recommandations, disponibilité Website ;
- création d’un passeport → génération QR et association au produit ;
- contribution validée → progression Keeper, notification, possible reward/achievement ;
- contenu approuvé → publication, relation au Content Graph et disponibilité dans les surfaces éditoriales ;
- production exportée → notification et lien de l’asset aux ressources concernées.

Les workflows (`ProductLifecycleWorkflow`, `ArchiveLifecycleWorkflow`, `KeeperLifecycleWorkflow`, `QRWorkflow`, `PublishingWorkflow`) modélisent les étapes, statuts et contrôles nécessaires pour faire évoluer une entité proprement.

---

## 12. Règles pour faire évoluer le projet

1. **Étendre, ne pas redessiner.** Préserver le shell Admin, les tokens et le langage éditorial existants.
2. **Utiliser les tokens partagés.** Ajouter une valeur dans `src/shared/theme/tokens.ts` seulement lorsqu’elle est réellement réutilisable.
3. **Favoriser les composants `shared`.** Une primitive ou carte réutilisée doit vivre dans `src/shared/components/`, puis être documentée dans le Design System.
4. **Préserver les contrats core.** Les écrans ne doivent pas dépendre directement d’un backend spécifique ; passer par services/repositories/providers.
5. **Relier les entités.** Lorsqu’une nouvelle fonction crée une relation durable, l’exprimer avec les types d’entité et le Content Graph.
6. **Respecter les permissions.** Toute capacité d’administration future doit être associée aux rôles et permissions de `src/core/permissions/`.
7. **Documenter chaque composant réutilisable.** Le Design System doit exposer variantes, états, propriétés, responsive, accessibilité, règles d’usage et notes développeur.
8. **Ajouter un écran Admin proprement.** Créer l’écran dans `src/screens/`, ajouter son type dans `src/types.ts`, le brancher dans `App.tsx`, puis le déclarer dans `Sidebar.tsx` et éventuellement dans `src/routes/admin.ts`.
9. **Ajouter une page Website proprement.** Créer la page dans `src/website/pages/`, l’ajouter à `WebPage`, la brancher dans `WebsiteApp.tsx`, puis connecter Navbar/Footer si nécessaire.

---

## 13. Résumé de l’architecture en une phrase

**IZLI est une plateforme React composée d’un Website public et d’un Admin éditorial qui partagent tokens, composants, entités et une couche IZLI OS afin de faire circuler de façon cohérente le commerce, le contenu, les archives, la communauté, la production et les expériences QR.**
