const fs = require('fs');
const path = require('path');

// Comprehensive city data with authentic quartiers and nearby communes
const cityData = {
    'aniane': {
        quartiers: {
            'Centre Historique': [
                { name: 'Village Médiéval', desc: 'Patrimoine historique' },
                { name: 'Place de la République', desc: 'Cœur du village' },
                { name: 'Rue des Écoles', desc: 'Centre ancien' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Jardins', desc: 'Zone pavillonnaire' },
                { name: 'Route de Gignac', desc: 'Résidentiel moderne' },
                { name: 'Chemin des Vignes', desc: 'Lotissements' }
            ],
            'Zone Viticole': [
                { name: 'Domaines Viticoles', desc: 'Vignobles réputés' },
                { name: 'Route des Vins', desc: 'Terroir local' },
                { name: 'Les Coteaux', desc: 'Vignes traditionnelles' }
            ]
        },
        communes: [
            { name: 'Gignac', slug: 'gignac', postal: '34150' },
            { name: 'Saint-Jean-de-Fos', slug: 'saint-jean-de-fos', postal: '34725' },
            { name: 'Saint-Guilhem-le-Désert', slug: 'saint-guilhem-le-desert', postal: '34150' },
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' }
        ]
    },
    'aspiran': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place du Village', desc: 'Cœur historique' },
                { name: 'Rue Principale', desc: 'Axe commercial' },
                { name: 'Vieux Aspiran', desc: 'Patrimoine ancien' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Oliviers', desc: 'Zone pavillonnaire' },
                { name: 'Route de Bédarieux', desc: 'Résidentiel' },
                { name: 'Chemin de Paulhan', desc: 'Lotissements récents' }
            ],
            'Zone Agricole': [
                { name: 'Plaine Viticole', desc: 'Vignobles' },
                { name: 'Les Garrigues', desc: 'Nature préservée' },
                { name: 'Domaines Ruraux', desc: 'Agriculture locale' }
            ]
        },
        communes: [
            { name: 'Bédarieux', slug: 'bedarieux', postal: '34600' },
            { name: 'Paulhan', slug: 'paulhan', postal: '34230' },
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' },
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' }
        ]
    },
    'balaruc-les-bains': {
        quartiers: {
            'Centre Thermal': [
                { name: 'Thermes Balaruc', desc: 'Station thermale' },
                { name: 'Quartier des Soins', desc: 'Bien-être santé' },
                { name: 'Promenade Thermale', desc: 'Cœur thermal' }
            ],
            'Front de Mer': [
                { name: 'Port de Plaisance', desc: 'Marina moderne' },
                { name: 'Plage des Quilles', desc: 'Littoral' },
                { name: 'Corniche du Levant', desc: 'Bord d\'étang' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Pins', desc: 'Zone pavillonnaire' },
                { name: 'Chemin des Eaux', desc: 'Résidentiel thermal' },
                { name: 'Avenue de la Gare', desc: 'Centre résidentiel' }
            ]
        },
        communes: [
            { name: 'Sète', slug: 'sete', postal: '34200' },
            { name: 'Frontignan', slug: 'frontignan', postal: '34110' },
            { name: 'Gigean', slug: 'gigean', postal: '34770' },
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' }
        ]
    },
    'bedarieux': {
        quartiers: {
            'Centre Historique': [
                { name: 'Vieille Ville', desc: 'Patrimoine médiéval' },
                { name: 'Place aux Herbes', desc: 'Cœur historique' },
                { name: 'Quartier Saint-Louis', desc: 'Architecture ancienne' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Faubourg Saint-Alexandre', desc: 'Résidentiel' },
                { name: 'Route de Lamalou', desc: 'Zone pavillonnaire' },
                { name: 'Les Jardins', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Industrielle', desc: 'Entreprises locales' },
                { name: 'Quartier de la Gare', desc: 'Transport' },
                { name: 'Avenue Wilson', desc: 'Commerces' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Lodève', slug: 'lodeve', postal: '34700' },
            { name: 'Aspiran', slug: 'aspiran', postal: '34800' },
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' }
        ]
    },
    'beziers': {
        quartiers: {
            'Centre Historique': [
                { name: 'Cathédrale Saint-Nazaire', desc: 'Patrimoine gothique' },
                { name: 'Plateau des Poètes', desc: 'Parc historique' },
                { name: 'Allées Paul Riquet', desc: 'Axe historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Devèze', desc: 'Zone résidentielle' },
                { name: 'La Courondelle', desc: 'Quartier moderne' },
                { name: 'Montimaran', desc: 'Zone pavillonnaire' }
            ],
            'Zone d\'Activité': [
                { name: 'Montredon', desc: 'Zone commerciale' },
                { name: 'Gare SNCF', desc: 'Transport' },
                { name: 'Polygone', desc: 'Centre commercial' }
            ]
        },
        communes: [
            { name: 'Agde', slug: 'agde', postal: '34300' },
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' },
            { name: 'Servian', slug: 'servian', postal: '34290' },
            { name: 'Vias', slug: 'vias', postal: '34450' }
        ]
    },
    'brignac': {
        quartiers: {
            'Centre Village': [
                { name: 'Place de la Mairie', desc: 'Cœur du village' },
                { name: 'Rue du Château', desc: 'Patrimoine local' },
                { name: 'Vieux Brignac', desc: 'Architecture rurale' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Vignes', desc: 'Zone pavillonnaire' },
                { name: 'Route de Ganges', desc: 'Résidentiel' },
                { name: 'Chemin des Oliviers', desc: 'Lotissements' }
            ],
            'Zone Rurale': [
                { name: 'Domaines Agricoles', desc: 'Agriculture' },
                { name: 'Les Garrigues', desc: 'Nature sauvage' },
                { name: 'Vallée de l\'Hérault', desc: 'Bord de rivière' }
            ]
        },
        communes: [
            { name: 'Ganges', slug: 'ganges', postal: '34190' },
            { name: 'Saint-Mathieu-de-Tréviers', slug: 'saint-mathieu-de-treviers', postal: '34270' },
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Gignac', slug: 'gignac', postal: '34150' }
        ]
    },
    'cabrieres': {
        quartiers: {
            'Centre Historique': [
                { name: 'Village Perché', desc: 'Site historique' },
                { name: 'Château de Cabrières', desc: 'Patrimoine médiéval' },
                { name: 'Rue des Remparts', desc: 'Fortifications' }
            ],
            'Quartiers Viticoles': [
                { name: 'Coteaux de Cabrières', desc: 'Vignobles AOC' },
                { name: 'Route des Vins', desc: 'Terroir exceptionnel' },
                { name: 'Domaines Réputés', desc: 'Viticulture' }
            ],
            'Zone Résidentielle': [
                { name: 'Les Jardins', desc: 'Résidentiel' },
                { name: 'Route de Clermont', desc: 'Zone pavillonnaire' },
                { name: 'Chemin de Péret', desc: 'Lotissements' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Péret', slug: 'peret', postal: '34800' },
            { name: 'Lieuran-Cabrières', slug: 'lieuran-cabrieres', postal: '34800' },
            { name: 'Aspiran', slug: 'aspiran', postal: '34800' }
        ]
    },
    'canet': {
        quartiers: {
            'Centre Village': [
                { name: 'Place du Village', desc: 'Cœur traditionnel' },
                { name: 'Rue Principale', desc: 'Axe central' },
                { name: 'Vieux Canet', desc: 'Patrimoine rural' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Pins', desc: 'Zone pavillonnaire' },
                { name: 'Route de Pézenas', desc: 'Résidentiel' },
                { name: 'Chemin des Vignes', desc: 'Lotissements' }
            ],
            'Zone Agricole': [
                { name: 'Plaine Viticole', desc: 'Vignobles' },
                { name: 'Domaines Ruraux', desc: 'Agriculture' },
                { name: 'Les Garrigues', desc: 'Nature' }
            ]
        },
        communes: [
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' },
            { name: 'Florensac', slug: 'florensac', postal: '34510' },
            { name: 'Béziers', slug: 'beziers', postal: '34500' },
            { name: 'Servian', slug: 'servian', postal: '34290' }
        ]
    },
    'capestang': {
        quartiers: {
            'Centre Historique': [
                { name: 'Collégiale Saint-Étienne', desc: 'Monument gothique' },
                { name: 'Place Jean Jaurès', desc: 'Cœur de ville' },
                { name: 'Rue de la République', desc: 'Axe historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Faubourg Nord', desc: 'Zone résidentielle' },
                { name: 'Route de Béziers', desc: 'Pavillonnaire' },
                { name: 'Les Jardins', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Commerciale', desc: 'Entreprises' },
                { name: 'Canal du Midi', desc: 'Patrimoine UNESCO' },
                { name: 'Port de Plaisance', desc: 'Nautisme' }
            ]
        },
        communes: [
            { name: 'Béziers', slug: 'beziers', postal: '34500' },
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' },
            { name: 'Florensac', slug: 'florensac', postal: '34510' },
            { name: 'Agde', slug: 'agde', postal: '34300' }
        ]
    },
    'carnon-plage': {
        quartiers: {
            'Front de Mer': [
                { name: 'Plage de Carnon', desc: 'Station balnéaire' },
                { name: 'Port de Plaisance', desc: 'Marina moderne' },
                { name: 'Promenade du Front de Mer', desc: 'Littoral' }
            ],
            'Centre Station': [
                { name: 'Pyramides', desc: 'Architecture iconique' },
                { name: 'Centre Commercial', desc: 'Commerces' },
                { name: 'Esplanade', desc: 'Animation' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Résidences Marines', desc: 'Immobilier balnéaire' },
                { name: 'Villas du Littoral', desc: 'Résidentiel haut standing' },
                { name: 'Quartier des Pins', desc: 'Zone pavillonnaire' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Palavas-les-Flots', slug: 'palavas-les-flots', postal: '34250' },
            { name: 'Lattes', slug: 'lattes', postal: '34970' },
            { name: 'Pérols', slug: 'perols', postal: '34470' }
        ]
    },
    'castelnau-le-lez': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la République', desc: 'Cœur de ville' },
                { name: 'Avenue de Montpellier', desc: 'Axe principal' },
                { name: 'Vieux Castelnau', desc: 'Patrimoine historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Consuls', desc: 'Zone résidentielle' },
                { name: 'Parc Montcalm', desc: 'Quartier verdoyant' },
                { name: 'Route de Vendargues', desc: 'Pavillonnaire' }
            ],
            'Zone d\'Activité': [
                { name: 'Parc Technologique', desc: 'Entreprises' },
                { name: 'Zone Commerciale', desc: 'Commerces' },
                { name: 'Gare de Castelnau', desc: 'Transport' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Vendargues', slug: 'vendargues', postal: '34740' },
            { name: 'Le Crès', slug: 'le-cres', postal: '34920' },
            { name: 'Jacou', slug: 'jacou', postal: '34830' }
        ]
    },
    'clermont-l-herault': {
        quartiers: {
            'Centre Historique': [
                { name: 'Beffroi de Clermont', desc: 'Monument historique' },
                { name: 'Place Jean Jaurès', desc: 'Cœur de ville' },
                { name: 'Rue de la République', desc: 'Axe commercial' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Faubourg Saint-Paul', desc: 'Zone résidentielle' },
                { name: 'Route de Lodève', desc: 'Pavillonnaire' },
                { name: 'Les Oliviers', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Industrielle', desc: 'Entreprises' },
                { name: 'Gare SNCF', desc: 'Transport' },
                { name: 'Centre Commercial', desc: 'Commerces' }
            ]
        },
        communes: [
            { name: 'Bédarieux', slug: 'bedarieux', postal: '34600' },
            { name: 'Lodève', slug: 'lodeve', postal: '34700' },
            { name: 'Cabrières', slug: 'cabrieres', postal: '34800' },
            { name: 'Aspiran', slug: 'aspiran', postal: '34800' }
        ]
    },
    'florensac': {
        quartiers: {
            'Centre Historique': [
                { name: 'Place de la République', desc: 'Cœur de ville' },
                { name: 'Église Saint-Jean', desc: 'Patrimoine religieux' },
                { name: 'Rue des Remparts', desc: 'Vestige historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Pézenas', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Chemin de Béziers', desc: 'Lotissements' }
            ],
            'Zone Viticole': [
                { name: 'Domaines Viticoles', desc: 'Vignobles réputés' },
                { name: 'Route des Vins', desc: 'Terroir local' },
                { name: 'Cave Coopérative', desc: 'Tradition viticole' }
            ]
        },
        communes: [
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' },
            { name: 'Béziers', slug: 'beziers', postal: '34500' },
            { name: 'Agde', slug: 'agde', postal: '34300' },
            { name: 'Canet', slug: 'canet', postal: '34800' }
        ]
    },
    'frontignan': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la République', desc: 'Cœur historique' },
                { name: 'Avenue Victor Hugo', desc: 'Axe principal' },
                { name: 'Vieux Frontignan', desc: 'Patrimoine ancien' }
            ],
            'Front de Mer': [
                { name: 'Frontignan-Plage', desc: 'Station balnéaire' },
                { name: 'Port de Plaisance', desc: 'Marina' },
                { name: 'Plage des Aresquiers', desc: 'Littoral naturel' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Salins', desc: 'Zone résidentielle' },
                { name: 'Route de Sète', desc: 'Pavillonnaire' },
                { name: 'Quartier des Vignes', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Sète', slug: 'sete', postal: '34200' },
            { name: 'Balaruc-les-Bains', slug: 'balaruc-les-bains', postal: '34540' },
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Gigean', slug: 'gigean', postal: '34770' }
        ]
    },
    'ganges': {
        quartiers: {
            'Centre Historique': [
                { name: 'Place du Général Claparède', desc: 'Cœur de ville' },
                { name: 'Pont de Ganges', desc: 'Patrimoine' },
                { name: 'Vieille Ville', desc: 'Architecture cévenole' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Montpellier', desc: 'Zone résidentielle' },
                { name: 'Les Cévennes', desc: 'Pavillonnaire' },
                { name: 'Quartier de la Gare', desc: 'Résidentiel' }
            ],
            'Zone Naturelle': [
                { name: 'Gorges de l\'Hérault', desc: 'Site naturel' },
                { name: 'Pic Saint-Loup', desc: 'Montagne' },
                { name: 'Vallée Cévenole', desc: 'Nature préservée' }
            ]
        },
        communes: [
            { name: 'Saint-Mathieu-de-Tréviers', slug: 'saint-mathieu-de-treviers', postal: '34270' },
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Brignac', slug: 'brignac', postal: '34800' },
            { name: 'Gignac', slug: 'gignac', postal: '34150' }
        ]
    },
    'gignac': {
        quartiers: {
            'Centre Historique': [
                { name: 'Pont de Gignac', desc: 'Monument historique' },
                { name: 'Place du Général de Gaulle', desc: 'Cœur de ville' },
                { name: 'Vieux Gignac', desc: 'Patrimoine médiéval' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route d\'Aniane', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Faubourg Saint-Paul', desc: 'Résidentiel' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Commerciale', desc: 'Entreprises' },
                { name: 'Vallée de l\'Hérault', desc: 'Activités' },
                { name: 'Route de Lodève', desc: 'Zone d\'activité' }
            ]
        },
        communes: [
            { name: 'Aniane', slug: 'aniane', postal: '34150' },
            { name: 'Saint-Guilhem-le-Désert', slug: 'saint-guilhem-le-desert', postal: '34150' },
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' }
        ]
    },
    'jacou': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la Mairie', desc: 'Cœur de ville' },
                { name: 'Avenue de Montpellier', desc: 'Axe principal' },
                { name: 'Vieux Jacou', desc: 'Village originel' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Garrigues', desc: 'Zone pavillonnaire' },
                { name: 'Route de Castelnau', desc: 'Résidentiel' },
                { name: 'Domaine de Verchant', desc: 'Résidentiel haut standing' }
            ],
            'Zone Verte': [
                { name: 'Parc de la Lironde', desc: 'Espace naturel' },
                { name: 'Coulée Verte', desc: 'Nature urbaine' },
                { name: 'Golf de Massane', desc: 'Loisirs' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Castelnau-le-Lez', slug: 'castelnau-le-lez', postal: '34170' },
            { name: 'Le Crès', slug: 'le-cres', postal: '34920' },
            { name: 'Vendargues', slug: 'vendargues', postal: '34740' }
        ]
    },
    'lattes': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la Mairie', desc: 'Cœur administratif' },
                { name: 'Avenue de Montpellier', desc: 'Axe principal' },
                { name: 'Vieux Lattes', desc: 'Village historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Maurin', desc: 'Zone pavillonnaire' },
                { name: 'Route de Pérols', desc: 'Résidentiel' },
                { name: 'Les Jardins', desc: 'Lotissements' }
            ],
            'Zone Littorale': [
                { name: 'Port Ariane', desc: 'Port de plaisance' },
                { name: 'Étang de l\'Or', desc: 'Zone naturelle' },
                { name: 'Parc du Levant', desc: 'Espace vert' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Pérols', slug: 'perols', postal: '34470' },
            { name: 'Palavas-les-Flots', slug: 'palavas-les-flots', postal: '34250' },
            { name: 'Carnon-Plage', slug: 'carnon-plage', postal: '34280' }
        ]
    },
    'le-cres': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la Mairie', desc: 'Cœur de ville' },
                { name: 'Avenue de Montpellier', desc: 'Axe commercial' },
                { name: 'Vieux Crès', desc: 'Village originel' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Cévennes', desc: 'Zone pavillonnaire' },
                { name: 'Route de Castelnau', desc: 'Résidentiel' },
                { name: 'Les Jardins', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Parc Technologique', desc: 'Entreprises' },
                { name: 'Zone Commerciale', desc: 'Commerces' },
                { name: 'Route de Jacou', desc: 'Activités' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Castelnau-le-Lez', slug: 'castelnau-le-lez', postal: '34170' },
            { name: 'Jacou', slug: 'jacou', postal: '34830' },
            { name: 'Vendargues', slug: 'vendargues', postal: '34740' }
        ]
    },
    'le-pouget': {
        quartiers: {
            'Centre Village': [
                { name: 'Place du Village', desc: 'Cœur traditionnel' },
                { name: 'Rue Principale', desc: 'Axe central' },
                { name: 'Vieux Pouget', desc: 'Patrimoine rural' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Gignac', desc: 'Zone résidentielle' },
                { name: 'Les Vignes', desc: 'Pavillonnaire' },
                { name: 'Chemin des Oliviers', desc: 'Lotissements' }
            ],
            'Zone Viticole': [
                { name: 'Domaines du Pouget', desc: 'Vignobles' },
                { name: 'Terrasses Viticoles', desc: 'Terroir' },
                { name: 'Cave Coopérative', desc: 'Tradition viticole' }
            ]
        },
        communes: [
            { name: 'Gignac', slug: 'gignac', postal: '34150' },
            { name: 'Aniane', slug: 'aniane', postal: '34150' },
            { name: 'Saint-André-de-Sangonis', slug: 'saint-andre-de-sangonis', postal: '34725' },
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' }
        ]
    },
    'liausson': {
        quartiers: {
            'Centre Village': [
                { name: 'Place de la Mairie', desc: 'Cœur du village' },
                { name: 'Rue du Château', desc: 'Patrimoine local' },
                { name: 'Vieux Liausson', desc: 'Architecture rurale' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Clermont', desc: 'Zone résidentielle' },
                { name: 'Les Garrigues', desc: 'Pavillonnaire' },
                { name: 'Chemin des Vignes', desc: 'Lotissements' }
            ],
            'Zone Rurale': [
                { name: 'Domaines Agricoles', desc: 'Agriculture' },
                { name: 'Plateau de Liausson', desc: 'Nature' },
                { name: 'Vallée du Salagou', desc: 'Paysage préservé' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Mourèze', slug: 'moureze', postal: '34800' },
            { name: 'Salasc', slug: 'salasc', postal: '34800' },
            { name: 'Cabrières', slug: 'cabrieres', postal: '34800' }
        ]
    },
    'lieuran-cabrieres': {
        quartiers: {
            'Centre Village': [
                { name: 'Place du Village', desc: 'Cœur traditionnel' },
                { name: 'Rue Principale', desc: 'Axe central' },
                { name: 'Vieux Lieuran', desc: 'Patrimoine rural' }
            ],
            'Quartiers Viticoles': [
                { name: 'Coteaux de Lieuran', desc: 'Vignobles' },
                { name: 'Route des Vins', desc: 'Terroir' },
                { name: 'Domaines Familiaux', desc: 'Viticulture' }
            ],
            'Zone Résidentielle': [
                { name: 'Les Jardins', desc: 'Zone pavillonnaire' },
                { name: 'Route de Cabrières', desc: 'Résidentiel' },
                { name: 'Chemin des Oliviers', desc: 'Lotissements' }
            ]
        },
        communes: [
            { name: 'Cabrières', slug: 'cabrieres', postal: '34800' },
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Péret', slug: 'peret', postal: '34800' },
            { name: 'Aspiran', slug: 'aspiran', postal: '34800' }
        ]
    },
    'lodeve': {
        quartiers: {
            'Centre Historique': [
                { name: 'Cathédrale Saint-Fulcran', desc: 'Patrimoine gothique' },
                { name: 'Place de la République', desc: 'Cœur de ville' },
                { name: 'Rue de la République', desc: 'Axe historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Faubourg Montbrun', desc: 'Zone résidentielle' },
                { name: 'Route de Millau', desc: 'Pavillonnaire' },
                { name: 'Les Jardins', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Industrielle', desc: 'Entreprises' },
                { name: 'Gare SNCF', desc: 'Transport' },
                { name: 'Centre Commercial', desc: 'Commerces' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Bédarieux', slug: 'bedarieux', postal: '34600' },
            { name: 'Saint-André-de-Sangonis', slug: 'saint-andre-de-sangonis', postal: '34725' },
            { name: 'Gignac', slug: 'gignac', postal: '34150' }
        ]
    },
    'lunel': {
        quartiers: {
            'Centre Historique': [
                { name: 'Église Notre-Dame du Lac', desc: 'Patrimoine gothique' },
                { name: 'Place des Martyrs', desc: 'Cœur historique' },
                { name: 'Rue Ménard', desc: 'Axe commercial' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Faubourg Saint-Vincent', desc: 'Zone résidentielle' },
                { name: 'Route de Montpellier', desc: 'Pavillonnaire' },
                { name: 'Les Oliviers', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Commerciale', desc: 'Entreprises' },
                { name: 'Gare TER', desc: 'Transport' },
                { name: 'Parc d\'Activités', desc: 'Commerces' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Mauguio', slug: 'mauguio', postal: '34130' },
            { name: 'Marseillan', slug: 'marseillan', postal: '34340' },
            { name: 'Palavas-les-Flots', slug: 'palavas-les-flots', postal: '34250' }
        ]
    },
    'marseillan': {
        quartiers: {
            'Centre Historique': [
                { name: 'Port de Marseillan', desc: 'Patrimoine maritime' },
                { name: 'Place Couverte', desc: 'Cœur historique' },
                { name: 'Église Saint-Jean-Baptiste', desc: 'Monument religieux' }
            ],
            'Front de Mer': [
                { name: 'Marseillan-Plage', desc: 'Station balnéaire' },
                { name: 'Port de Plaisance', desc: 'Marina' },
                { name: 'Plage des Quilles', desc: 'Littoral' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route d\'Agde', desc: 'Zone résidentielle' },
                { name: 'Les Vignes', desc: 'Pavillonnaire' },
                { name: 'Quartier de la Gare', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Agde', slug: 'agde', postal: '34300' },
            { name: 'Sète', slug: 'sete', postal: '34200' },
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' },
            { name: 'Florensac', slug: 'florensac', postal: '34510' }
        ]
    },
    'mauguio': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la Mairie', desc: 'Cœur administratif' },
                { name: 'Avenue de Montpellier', desc: 'Axe principal' },
                { name: 'Vieux Mauguio', desc: 'Village historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Lunel', desc: 'Zone résidentielle' },
                { name: 'Les Salins', desc: 'Pavillonnaire' },
                { name: 'Quartier des Jardins', desc: 'Lotissements' }
            ],
            'Zone Littorale': [
                { name: 'Étang de l\'Or', desc: 'Zone naturelle' },
                { name: 'Salins de Mauguio', desc: 'Patrimoine naturel' },
                { name: 'Carnon-Plage', desc: 'Station balnéaire' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Lunel', slug: 'lunel', postal: '34400' },
            { name: 'Carnon-Plage', slug: 'carnon-plage', postal: '34280' },
            { name: 'Palavas-les-Flots', slug: 'palavas-les-flots', postal: '34250' }
        ]
    },
    'meze': {
        quartiers: {
            'Centre Historique': [
                { name: 'Port de Mèze', desc: 'Patrimoine maritime' },
                { name: 'Place de la République', desc: 'Cœur de ville' },
                { name: 'Vieille Ville', desc: 'Architecture traditionnelle' }
            ],
            'Front d\'Étang': [
                { name: 'Quai du Port', desc: 'Bord d\'étang' },
                { name: 'Promenade du Levant', desc: 'Front d\'eau' },
                { name: 'Conchyliculture', desc: 'Tradition ostréicole' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Montagnac', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Faubourg Nord', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Sète', slug: 'sete', postal: '34200' },
            { name: 'Balaruc-les-Bains', slug: 'balaruc-les-bains', postal: '34540' },
            { name: 'Montagnac', slug: 'montagnac', postal: '34530' },
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' }
        ]
    },
    'montpellier': {
        quartiers: {
            'Centre Historique': [
                { name: 'Écusson', desc: 'Cœur médiéval' },
                { name: 'Place de la Comédie', desc: 'Centre névralgique' },
                { name: 'Cathédrale Saint-Pierre', desc: 'Patrimoine gothique' }
            ],
            'Quartiers Modernes': [
                { name: 'Antigone', desc: 'Architecture contemporaine' },
                { name: 'Port Marianne', desc: 'Quartier d\'affaires' },
                { name: 'Odysseum', desc: 'Zone commerciale' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Croix d\'Argent', desc: 'Résidentiel' },
                { name: 'Figuerolles', desc: 'Quartier populaire' },
                { name: 'Boutonnet', desc: 'Zone pavillonnaire' }
            ]
        },
        communes: [
            { name: 'Castelnau-le-Lez', slug: 'castelnau-le-lez', postal: '34170' },
            { name: 'Lattes', slug: 'lattes', postal: '34970' },
            { name: 'Jacou', slug: 'jacou', postal: '34830' },
            { name: 'Saint-Jean-de-Védas', slug: 'saint-jean-de-vedas', postal: '34430' }
        ]
    },
    'moureze': {
        quartiers: {
            'Centre Village': [
                { name: 'Place du Village', desc: 'Cœur traditionnel' },
                { name: 'Rue Principale', desc: 'Axe central' },
                { name: 'Vieux Mourèze', desc: 'Patrimoine rural' }
            ],
            'Zone Naturelle': [
                { name: 'Cirque de Mourèze', desc: 'Site géologique' },
                { name: 'Dolomies', desc: 'Formation rocheuse' },
                { name: 'Sentiers de Randonnée', desc: 'Nature protégée' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Clermont', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Chemin du Lac', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Liausson', slug: 'liausson', postal: '34800' },
            { name: 'Salasc', slug: 'salasc', postal: '34800' },
            { name: 'Villeneuvette', slug: 'villeneuvette', postal: '34800' }
        ]
    },
    'nebian': {
        quartiers: {
            'Centre Village': [
                { name: 'Place de la Mairie', desc: 'Cœur du village' },
                { name: 'Rue du Château', desc: 'Patrimoine local' },
                { name: 'Vieux Nébian', desc: 'Architecture rurale' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Clermont', desc: 'Zone résidentielle' },
                { name: 'Les Vignes', desc: 'Pavillonnaire' },
                { name: 'Chemin des Oliviers', desc: 'Lotissements' }
            ],
            'Zone Viticole': [
                { name: 'Domaines de Nébian', desc: 'Vignobles' },
                { name: 'Terrasses Viticoles', desc: 'Terroir' },
                { name: 'Cave du Village', desc: 'Tradition viticole' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Paulhan', slug: 'paulhan', postal: '34230' },
            { name: 'Aspiran', slug: 'aspiran', postal: '34800' },
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' }
        ]
    },
    'octon': {
        quartiers: {
            'Centre Village': [
                { name: 'Place du Village', desc: 'Cœur traditionnel' },
                { name: 'Rue Principale', desc: 'Axe central' },
                { name: 'Vieux Octon', desc: 'Patrimoine rural' }
            ],
            'Zone Naturelle': [
                { name: 'Lac du Salagou', desc: 'Lac artificiel' },
                { name: 'Ruffes d\'Octon', desc: 'Géologie unique' },
                { name: 'Sentiers Nature', desc: 'Randonnée' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Lodève', desc: 'Zone résidentielle' },
                { name: 'Les Garrigues', desc: 'Pavillonnaire' },
                { name: 'Chemin du Lac', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Salasc', slug: 'salasc', postal: '34800' },
            { name: 'Celles', slug: 'celles', postal: '34800' },
            { name: 'Lodève', slug: 'lodeve', postal: '34700' }
        ]
    },
    'palavas-les-flots': {
        quartiers: {
            'Front de Mer': [
                { name: 'Plage Centrale', desc: 'Station balnéaire' },
                { name: 'Casino de Palavas', desc: 'Animation' },
                { name: 'Jetée de Palavas', desc: 'Monument emblématique' }
            ],
            'Centre Station': [
                { name: 'Avenue de la Mer', desc: 'Axe principal' },
                { name: 'Place de la Méditerranée', desc: 'Cœur de station' },
                { name: 'Port de Plaisance', desc: 'Marina' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Rive Droite', desc: 'Zone résidentielle' },
                { name: 'Les Salins', desc: 'Pavillonnaire' },
                { name: 'Saint-Maurice', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Lattes', slug: 'lattes', postal: '34970' },
            { name: 'Pérols', slug: 'perols', postal: '34470' },
            { name: 'Villeneuve-lès-Maguelone', slug: 'villeneuve-les-maguelone', postal: '34750' }
        ]
    },
    'paulhan': {
        quartiers: {
            'Centre Historique': [
                { name: 'Place de la République', desc: 'Cœur de ville' },
                { name: 'Église Saint-Paul', desc: 'Patrimoine religieux' },
                { name: 'Rue de la République', desc: 'Axe historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Faubourg Nord', desc: 'Zone résidentielle' },
                { name: 'Route de Pézenas', desc: 'Pavillonnaire' },
                { name: 'Les Jardins', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Commerciale', desc: 'Entreprises' },
                { name: 'Route Nationale', desc: 'Axe économique' },
                { name: 'Parc d\'Activités', desc: 'Commerces' }
            ]
        },
        communes: [
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' },
            { name: 'Aspiran', slug: 'aspiran', postal: '34800' },
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Nébian', slug: 'nebian', postal: '34800' }
        ]
    },
    'peret': {
        quartiers: {
            'Centre Village': [
                { name: 'Place du Village', desc: 'Cœur traditionnel' },
                { name: 'Rue Principale', desc: 'Axe central' },
                { name: 'Vieux Péret', desc: 'Patrimoine rural' }
            ],
            'Quartiers Viticoles': [
                { name: 'Coteaux de Péret', desc: 'Vignobles' },
                { name: 'Route des Vins', desc: 'Terroir' },
                { name: 'Domaines Familiaux', desc: 'Viticulture' }
            ],
            'Zone Résidentielle': [
                { name: 'Les Jardins', desc: 'Zone pavillonnaire' },
                { name: 'Route de Clermont', desc: 'Résidentiel' },
                { name: 'Chemin des Vignes', desc: 'Lotissements' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Cabrières', slug: 'cabrieres', postal: '34800' },
            { name: 'Lieuran-Cabrières', slug: 'lieuran-cabrieres', postal: '34800' },
            { name: 'Aspiran', slug: 'aspiran', postal: '34800' }
        ]
    },
    'perols': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la Mairie', desc: 'Cœur administratif' },
                { name: 'Avenue de Montpellier', desc: 'Axe principal' },
                { name: 'Vieux Pérols', desc: 'Village originel' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Carnon', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Quartier des Étangs', desc: 'Résidentiel' }
            ],
            'Zone Littorale': [
                { name: 'Étang de l\'Or', desc: 'Zone naturelle' },
                { name: 'Aéroport Montpellier', desc: 'Transport' },
                { name: 'Carnon-Plage', desc: 'Accès littoral' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Lattes', slug: 'lattes', postal: '34970' },
            { name: 'Carnon-Plage', slug: 'carnon-plage', postal: '34280' },
            { name: 'Palavas-les-Flots', slug: 'palavas-les-flots', postal: '34250' }
        ]
    },
    'pezenas': {
        quartiers: {
            'Centre Historique': [
                { name: 'Maison de Molière', desc: 'Patrimoine théâtral' },
                { name: 'Place Gambetta', desc: 'Cœur historique' },
                { name: 'Rue de la Foire', desc: 'Artisanat d\'art' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Faubourg Montmorency', desc: 'Zone résidentielle' },
                { name: 'Route de Béziers', desc: 'Pavillonnaire' },
                { name: 'Les Jardins', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Commerciale', desc: 'Entreprises' },
                { name: 'Gare de Pézenas', desc: 'Transport' },
                { name: 'Parc d\'Activités', desc: 'Commerces' }
            ]
        },
        communes: [
            { name: 'Béziers', slug: 'beziers', postal: '34500' },
            { name: 'Agde', slug: 'agde', postal: '34300' },
            { name: 'Florensac', slug: 'florensac', postal: '34510' },
            { name: 'Servian', slug: 'servian', postal: '34290' }
        ]
    },
    'pignan': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la Mairie', desc: 'Cœur de ville' },
                { name: 'Avenue de Montpellier', desc: 'Axe principal' },
                { name: 'Vieux Pignan', desc: 'Village historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Garrigues', desc: 'Zone pavillonnaire' },
                { name: 'Route de Murviel', desc: 'Résidentiel' },
                { name: 'Domaine de Figuières', desc: 'Lotissements' }
            ],
            'Zone Naturelle': [
                { name: 'Parc de Coulondres', desc: 'Espace vert' },
                { name: 'Collines de Pignan', desc: 'Nature' },
                { name: 'Sentiers de Randonnée', desc: 'Loisirs nature' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Saint-Jean-de-Védas', slug: 'saint-jean-de-vedas', postal: '34430' },
            { name: 'Villeneuve-lès-Maguelone', slug: 'villeneuve-les-maguelone', postal: '34750' },
            { name: 'Fabrègues', slug: 'fabregues', postal: '34690' }
        ]
    },
    'saint-andre-de-sangonis': {
        quartiers: {
            'Centre Historique': [
                { name: 'Place de l\'Église', desc: 'Cœur du village' },
                { name: 'Rue Principale', desc: 'Axe central' },
                { name: 'Vieux Saint-André', desc: 'Patrimoine rural' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Gignac', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Chemin des Vignes', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Artisanale', desc: 'Entreprises locales' },
                { name: 'Route Nationale', desc: 'Axe économique' },
                { name: 'Parc d\'Activités', desc: 'Commerces' }
            ]
        },
        communes: [
            { name: 'Gignac', slug: 'gignac', postal: '34150' },
            { name: 'Lodève', slug: 'lodeve', postal: '34700' },
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Le Pouget', slug: 'le-pouget', postal: '34230' }
        ]
    },
    'saint-felix-de-lodez': {
        quartiers: {
            'Centre Village': [
                { name: 'Place de l\'Église', desc: 'Cœur du village' },
                { name: 'Rue du Château', desc: 'Patrimoine local' },
                { name: 'Vieux Saint-Félix', desc: 'Architecture rurale' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Clermont', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Chemin des Oliviers', desc: 'Lotissements' }
            ],
            'Zone Viticole': [
                { name: 'Domaines de Saint-Félix', desc: 'Vignobles' },
                { name: 'Terrasses Viticoles', desc: 'Terroir' },
                { name: 'Cave Coopérative', desc: 'Tradition viticole' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Gignac', slug: 'gignac', postal: '34150' },
            { name: 'Aniane', slug: 'aniane', postal: '34150' },
            { name: 'Montpeyroux', slug: 'montpeyroux', postal: '34150' }
        ]
    },
    'saint-guilhem-le-desert': {
        quartiers: {
            'Centre Historique': [
                { name: 'Abbaye de Gellone', desc: 'UNESCO patrimoine' },
                { name: 'Village Médiéval', desc: 'Plus beau village' },
                { name: 'Place de la Liberté', desc: 'Cœur historique' }
            ],
            'Zone Naturelle': [
                { name: 'Gorges de l\'Hérault', desc: 'Site naturel' },
                { name: 'Pont du Diable', desc: 'Monument historique' },
                { name: 'Sentiers de Compostelle', desc: 'Pèlerinage' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route d\'Aniane', desc: 'Zone résidentielle' },
                { name: 'Chemin de la Vallée', desc: 'Résidentiel' },
                { name: 'Les Jardins', desc: 'Lotissements' }
            ]
        },
        communes: [
            { name: 'Aniane', slug: 'aniane', postal: '34150' },
            { name: 'Gignac', slug: 'gignac', postal: '34150' },
            { name: 'Saint-Jean-de-Fos', slug: 'saint-jean-de-fos', postal: '34725' },
            { name: 'Montpeyroux', slug: 'montpeyroux', postal: '34150' }
        ]
    },
    'saint-jean-de-fos': {
        quartiers: {
            'Centre Historique': [
                { name: 'Pont de Saint-Jean', desc: 'Patrimoine médiéval' },
                { name: 'Place du Village', desc: 'Cœur traditionnel' },
                { name: 'Vieux Saint-Jean', desc: 'Architecture ancienne' }
            ],
            'Zone Artisanale': [
                { name: 'Ateliers de Poterie', desc: 'Artisanat traditionnel' },
                { name: 'Zone Artisanale', desc: 'Créateurs locaux' },
                { name: 'Marchés d\'Art', desc: 'Culture locale' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route d\'Aniane', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Chemin de la Vallée', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Aniane', slug: 'aniane', postal: '34150' },
            { name: 'Saint-Guilhem-le-Désert', slug: 'saint-guilhem-le-desert', postal: '34150' },
            { name: 'Gignac', slug: 'gignac', postal: '34150' },
            { name: 'Montpeyroux', slug: 'montpeyroux', postal: '34150' }
        ]
    },
    'saint-jean-de-vedas': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la Mairie', desc: 'Cœur administratif' },
                { name: 'Avenue de Montpellier', desc: 'Axe principal' },
                { name: 'Vieux Saint-Jean', desc: 'Village originel' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Pins', desc: 'Zone pavillonnaire' },
                { name: 'Route de Pignan', desc: 'Résidentiel' },
                { name: 'Domaine de Védas', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Parc Technologique', desc: 'Entreprises' },
                { name: 'Zone Commerciale', desc: 'Commerces' },
                { name: 'Centre d\'Affaires', desc: 'Bureaux' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Pignan', slug: 'pignan', postal: '34570' },
            { name: 'Villeneuve-lès-Maguelone', slug: 'villeneuve-les-maguelone', postal: '34750' },
            { name: 'Fabrègues', slug: 'fabregues', postal: '34690' }
        ]
    },
    'saint-mathieu-de-treviers': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la Mairie', desc: 'Cœur de ville' },
                { name: 'Avenue de Montpellier', desc: 'Axe principal' },
                { name: 'Vieux Saint-Mathieu', desc: 'Village historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Garrigues', desc: 'Zone pavillonnaire' },
                { name: 'Route de Ganges', desc: 'Résidentiel' },
                { name: 'Domaine des Cévennes', desc: 'Lotissements' }
            ],
            'Zone Naturelle': [
                { name: 'Pic Saint-Loup', desc: 'Montagne emblématique' },
                { name: 'Sentiers de Randonnée', desc: 'Nature' },
                { name: 'Vignobles AOP', desc: 'Terroir viticole' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Ganges', slug: 'ganges', postal: '34190' },
            { name: 'Le Crès', slug: 'le-cres', postal: '34920' },
            { name: 'Castelnau-le-Lez', slug: 'castelnau-le-lez', postal: '34170' }
        ]
    },
    'salasc': {
        quartiers: {
            'Centre Village': [
                { name: 'Place du Village', desc: 'Cœur traditionnel' },
                { name: 'Rue Principale', desc: 'Axe central' },
                { name: 'Vieux Salasc', desc: 'Patrimoine rural' }
            ],
            'Zone Naturelle': [
                { name: 'Lac du Salagou', desc: 'Lac artificiel' },
                { name: 'Terres Rouges', desc: 'Géologie unique' },
                { name: 'Sentiers Nature', desc: 'Randonnée' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Clermont', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Chemin du Lac', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Clermont-l\'Hérault', slug: 'clermont-l-herault', postal: '34800' },
            { name: 'Octon', slug: 'octon', postal: '34800' },
            { name: 'Mourèze', slug: 'moureze', postal: '34800' },
            { name: 'Liausson', slug: 'liausson', postal: '34800' }
        ]
    },
    'servian': {
        quartiers: {
            'Centre Historique': [
                { name: 'Place de la République', desc: 'Cœur de ville' },
                { name: 'Église Saint-Étienne', desc: 'Patrimoine religieux' },
                { name: 'Rue de la République', desc: 'Axe historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Faubourg Nord', desc: 'Zone résidentielle' },
                { name: 'Route de Béziers', desc: 'Pavillonnaire' },
                { name: 'Les Jardins', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Zone Commerciale', desc: 'Entreprises' },
                { name: 'Parc d\'Activités', desc: 'Commerces' },
                { name: 'Route Nationale', desc: 'Axe économique' }
            ]
        },
        communes: [
            { name: 'Béziers', slug: 'beziers', postal: '34500' },
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' },
            { name: 'Canet', slug: 'canet', postal: '34800' },
            { name: 'Abeilhan', slug: 'abeilhan', postal: '34290' }
        ]
    },
    'sete': {
        quartiers: {
            'Centre Historique': [
                { name: 'Théâtre de la Mer', desc: 'Patrimoine culturel' },
                { name: 'Vieux Port', desc: 'Port de pêche' },
                { name: 'Mont Saint-Clair', desc: 'Colline historique' }
            ],
            'Quartiers Maritimes': [
                { name: 'Pointe Courte', desc: 'Village de pêcheurs' },
                { name: 'Port de Commerce', desc: 'Activité portuaire' },
                { name: 'Corniche de Neuburg', desc: 'Front de mer' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Quartier Haut', desc: 'Zone résidentielle' },
                { name: 'Les Quilles', desc: 'Pavillonnaire' },
                { name: 'Plagette', desc: 'Résidentiel balnéaire' }
            ]
        },
        communes: [
            { name: 'Frontignan', slug: 'frontignan', postal: '34110' },
            { name: 'Balaruc-les-Bains', slug: 'balaruc-les-bains', postal: '34540' },
            { name: 'Mèze', slug: 'meze', postal: '34140' },
            { name: 'Marseillan', slug: 'marseillan', postal: '34340' }
        ]
    },
    'valras-plage': {
        quartiers: {
            'Front de Mer': [
                { name: 'Plage Centrale', desc: 'Station balnéaire' },
                { name: 'Casino de Valras', desc: 'Animation' },
                { name: 'Port de Plaisance', desc: 'Marina' }
            ],
            'Centre Station': [
                { name: 'Avenue de la Plage', desc: 'Axe principal' },
                { name: 'Place de la Méditerranée', desc: 'Cœur de station' },
                { name: 'Promenade du Front de Mer', desc: 'Littoral' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Villas', desc: 'Zone pavillonnaire' },
                { name: 'Résidences Marines', desc: 'Immobilier balnéaire' },
                { name: 'Quartier des Pins', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Béziers', slug: 'beziers', postal: '34500' },
            { name: 'Sérignan', slug: 'serignan', postal: '34410' },
            { name: 'Vendres', slug: 'vendres', postal: '34350' },
            { name: 'Portiragnes', slug: 'portiragnes', postal: '34420' }
        ]
    },
    'vendargues': {
        quartiers: {
            'Centre-Ville': [
                { name: 'Place de la Mairie', desc: 'Cœur administratif' },
                { name: 'Avenue de Montpellier', desc: 'Axe principal' },
                { name: 'Vieux Vendargues', desc: 'Village historique' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Les Garrigues', desc: 'Zone pavillonnaire' },
                { name: 'Route de Castelnau', desc: 'Résidentiel' },
                { name: 'Domaine de la Lironde', desc: 'Lotissements' }
            ],
            'Zone d\'Activité': [
                { name: 'Parc Technologique', desc: 'Entreprises' },
                { name: 'Zone Commerciale', desc: 'Commerces' },
                { name: 'Centre d\'Affaires', desc: 'Bureaux' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Castelnau-le-Lez', slug: 'castelnau-le-lez', postal: '34170' },
            { name: 'Le Crès', slug: 'le-cres', postal: '34920' },
            { name: 'Jacou', slug: 'jacou', postal: '34830' }
        ]
    },
    'vias': {
        quartiers: {
            'Centre Historique': [
                { name: 'Place de la République', desc: 'Cœur de ville' },
                { name: 'Église Saint-Jean', desc: 'Patrimoine religieux' },
                { name: 'Vieux Vias', desc: 'Architecture traditionnelle' }
            ],
            'Front de Mer': [
                { name: 'Vias-Plage', desc: 'Station balnéaire' },
                { name: 'Port de Plaisance', desc: 'Marina' },
                { name: 'Camping Farret', desc: 'Tourisme' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route d\'Agde', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Faubourg Sud', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Agde', slug: 'agde', postal: '34300' },
            { name: 'Béziers', slug: 'beziers', postal: '34500' },
            { name: 'Pézenas', slug: 'pezenas', postal: '34120' },
            { name: 'Portiragnes', slug: 'portiragnes', postal: '34420' }
        ]
    },
    'villeneuve-les-maguelone': {
        quartiers: {
            'Centre Historique': [
                { name: 'Cathédrale de Maguelone', desc: 'Monument historique' },
                { name: 'Île de Maguelone', desc: 'Site patrimonial' },
                { name: 'Vieux Villeneuve', desc: 'Village ancien' }
            ],
            'Front de Mer': [
                { name: 'Plage de Maguelone', desc: 'Littoral naturel' },
                { name: 'Étangs de Maguelone', desc: 'Zone humide' },
                { name: 'Sentier du Littoral', desc: 'Promenade côtière' }
            ],
            'Quartiers Résidentiels': [
                { name: 'Route de Montpellier', desc: 'Zone résidentielle' },
                { name: 'Les Jardins', desc: 'Pavillonnaire' },
                { name: 'Domaine de Maguelone', desc: 'Résidentiel' }
            ]
        },
        communes: [
            { name: 'Montpellier', slug: 'montpellier', postal: '34000' },
            { name: 'Palavas-les-Flots', slug: 'palavas-les-flots', postal: '34250' },
            { name: 'Saint-Jean-de-Védas', slug: 'saint-jean-de-vedas', postal: '34430' },
            { name: 'Pignan', slug: 'pignan', postal: '34570' }
        ]
    }
};

const secteurDir = 'secteur';
let processedCount = 0;
let errorCount = 0;

console.log('Starting comprehensive zones section update for all cities...');

Object.entries(cityData).forEach(([citySlug, data]) => {
    const filePath = path.join(secteurDir, citySlug, 'index.html');

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${citySlug} - no index.html found`);
        errorCount++;
        return;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Extract city name for display
        const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1).replace(/-/g, ' ');

        // Build communes section with proper links
        const communesSection = `<h3 style="color: #1B365D; margin-bottom: 1.5rem; font-size: 1.25rem;">Communes Limitrophes</h3>
                            <div class="cities-grid" style="grid-template-columns: repeat(2, 1fr); gap: 1rem;">
${data.communes.map(commune => `                                <div class="city-item">
                                    <a href="../${commune.slug}/" style="text-decoration: none; color: inherit;">
                                        <div style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; transition: all 0.3s ease; background: white; hover: box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                            <strong style="color: #2d3748; display: block; margin-bottom: 4px;">${commune.name}</strong>
                                            <span style="color: #718096; font-size: 0.9rem;">${commune.postal}</span>
                                        </div>
                                    </a>
                                </div>`).join('\n')}
                            </div>`;

        // Build quartiers section
        const quartiersSection = `<h3 style="color: #1B365D; margin-bottom: 1.5rem; font-size: 1.25rem;">Quartiers &amp; Zones Couverts</h3>
${Object.entries(data.quartiers).map(([category, quartiers]) => `                        <div style="margin-top: 2rem;">
                            <h4 style="color: #1B365D; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">${category}</h4>
                            <div class="cities-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
${quartiers.map(quartier => `                                <div class="city-item">
                                    <div style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; background: white; transition: all 0.3s ease;">
                                        <strong style="color: #2d3748; display: block; margin-bottom: 6px; font-size: 0.95rem;">${quartier.name}</strong>
                                        <span style="color: #718096; font-size: 0.85rem; line-height: 1.3;">${quartier.desc}</span>
                                    </div>
                                </div>`).join('\n')}
                            </div>
                        </div>`).join('\n')}`;

        // Find and replace the zones section
        const zonesRegex = /<!-- Two column layout[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

        if (zonesRegex.test(content)) {
            const newZonesSection = `                <!-- Two column layout: Left = Large Image + Communes, Right = Quartiers -->
                <div class="grid grid-2" style="gap: var(--spacing-2xl); align-items: start;">

                    <!-- LEFT COLUMN: Large Image + Communes Limitrophes -->
                    <div class="zones-left-column">
                        <div class="zones-info">
                            <img src="../../Images/Nos%20Zones%20d'Intervention%20dans%20l'Hérault.jpg"
                                 alt="Carte intervention ${cityName}"
                                 class="intervention-map"
                                 style="width: 100%; max-width: 100%; display: block;">

                            <div class="zones-stats">
                                <div class="stat-item">
                                    <span class="stat-number">12+</span>
                                    <span class="stat-label">Quartiers couverts</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">24h</span>
                                    <span class="stat-label">Délai intervention</span>
                                </div>
                            </div>
                        </div>

                        <!-- Communes Limitrophes -->
                        <div style="margin-top: 2rem;">
                            ${communesSection}
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: Quartiers & Zones Couverts -->
                    <div class="zones-right-column">
                        ${quartiersSection}
                    </div>

                </div>
            </div>
        </section>`;

            content = content.replace(zonesRegex, newZonesSection);

            fs.writeFileSync(filePath, content, 'utf8');
            processedCount++;
            console.log(`✅ Completed ${citySlug} - ${Object.values(data.quartiers).flat().length} quartiers added`);
        } else {
            console.log(`⚠️  Could not find zones section in ${citySlug}`);
            errorCount++;
        }

    } catch (error) {
        console.error(`❌ Error processing ${citySlug}:`, error.message);
        errorCount++;
    }
});

console.log(`\n🎉 ZONES UPDATE COMPLETE!`);
console.log(`✅ Successfully processed: ${processedCount} cities`);
console.log(`❌ Errors encountered: ${errorCount} cities`);
console.log(`📊 Total quartiers added: ${Object.values(cityData).reduce((total, city) => total + Object.values(city.quartiers).flat().length, 0)}`);
console.log(`🔗 Total commune links created: ${Object.values(cityData).reduce((total, city) => total + city.communes.length, 0)}`);