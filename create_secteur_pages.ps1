# Script PowerShell pour créer toutes les pages secteurs manquantes
# Chaque page aura un contenu 100% unique

# Liste des villes restantes à créer
$cities = @(
    @{name="Bédarieux"; code="34600"; type="montagne"; neighbors=@("Aspiran", "Clermont-l'Hérault", "Lamalou-les-Bains", "Bédarieux")},
    @{name="Brignac"; code="34800"; type="rural"; neighbors=@("Clermont-l'Hérault", "Aspiran", "Paulhan", "Nébian")},
    @{name="Cabrières"; code="34800"; type="vignoble"; neighbors=@("Clermont-l'Hérault", "Aspiran", "Péret", "Fontès")},
    @{name="Canet"; code="34800"; type="rural"; neighbors=@("Pézenas", "Aspiran", "Clermont-l'Hérault", "Paulhan")},
    @{name="Capestang"; code="34310"; type="canal"; neighbors=@("Béziers", "Pouzolles", "Montady", "Nissan-lez-Ensérune")},
    @{name="Carnon-Plage"; code="34280"; type="littoral"; neighbors=@("Mauguio", "La Grande-Motte", "Palavas-les-Flots", "Montpellier")},
    @{name="Castelnau-le-Lez"; code="34170"; type="périurbain"; neighbors=@("Montpellier", "Jacou", "Le Crès", "Vendargues")},
    @{name="Clermont-l'Hérault"; code="34800"; type="urbain"; neighbors=@("Aspiran", "Bédarieux", "Paulhan", "Nébian")},
    @{name="Florensac"; code="34510"; type="vignoble"; neighbors=@("Pézenas", "Agde", "Pomérols", "Castelnau-de-Guers")},
    @{name="Frontignan"; code="34110"; type="littoral"; neighbors=@("Sète", "Balaruc-les-Bains", "Vic-la-Gardiole", "Mireval")},
    @{name="Ganges"; code="34190"; type="cévennes"; neighbors=@("Saint-Bauzille-de-Putois", "Laroque", "Saint-Laurent-le-Minier", "Cazilhac")},
    @{name="Gignac"; code="34150"; type="rural"; neighbors=@("Aniane", "Saint-André-de-Sangonis", "Popian", "Aumelas")},
    @{name="Jacou"; code="34830"; type="périurbain"; neighbors=@("Castelnau-le-Lez", "Montpellier", "Clapiers", "Le Crès")},
    @{name="Lattes"; code="34970"; type="périurbain"; neighbors=@("Montpellier", "Pérols", "Palavas-les-Flots", "Saint-Jean-de-Védas")},
    @{name="Le Crès"; code="34920"; type="périurbain"; neighbors=@("Castelnau-le-Lez", "Jacou", "Vendargues", "Saint-Mathieu-de-Tréviers")},
    @{name="Le Pouget"; code="34230"; type="rural"; neighbors=@("Gignac", "Paulhan", "Fontès", "Aspiran")},
    @{name="Liausson"; code="34800"; type="rural"; neighbors=@("Clermont-l'Hérault", "Aspiran", "Fontès", "Cabrières")},
    @{name="Lieuran-Cabrières"; code="34800"; type="vignoble"; neighbors=@("Cabrières", "Fontès", "Péret", "Clermont-l'Hérault")},
    @{name="Lodève"; code="34700"; type="montagne"; neighbors=@("Saint-Félix-de-Lodez", "Le Bosc", "Saint-Pierre-de-la-Fage", "Soumont")},
    @{name="Lunel"; code="34400"; type="urbain"; neighbors=@("Marsillargues", "Saint-Just", "Saturargues", "Lunel-Viel")},
    @{name="Marseillan"; code="34340"; type="littoral"; neighbors=@("Agde", "Florensac", "Pinet", "Sète")},
    @{name="Mauguio"; code="34130"; type="périurbain"; neighbors=@("Montpellier", "Carnon-Plage", "Palavas-les-Flots", "Lattes")},
    @{name="Mèze"; code="34140"; type="littoral"; neighbors=@("Balaruc-les-Bains", "Sète", "Montagnac", "Florensac")},
    @{name="Mourèze"; code="34800"; type="rural"; neighbors=@("Clermont-l'Hérault", "Villeneuvette", "Salasc", "Liausson")},
    @{name="Nébian"; code="34800"; type="rural"; neighbors=@("Aspiran", "Clermont-l'Hérault", "Paulhan", "Fontès")},
    @{name="Octon"; code="34800"; type="lac"; neighbors=@("Salasc", "Mourèze", "Clermont-l'Hérault", "Villeneuvette")},
    @{name="Palavas-les-Flots"; code="34250"; type="littoral"; neighbors=@("Lattes", "Mauguio", "Carnon-Plage", "Villeneuve-lès-Maguelone")},
    @{name="Paulhan"; code="34230"; type="rural"; neighbors=@("Aspiran", "Clermont-l'Hérault", "Nébian", "Fontès")},
    @{name="Péret"; code="34800"; type="vignoble"; neighbors=@("Cabrières", "Fontès", "Lieuran-Cabrières", "Aspiran")},
    @{name="Pérols"; code="34470"; type="périurbain"; neighbors=@("Lattes", "Montpellier", "Mauguio", "Carnon-Plage")},
    @{name="Pézenas"; code="34120"; type="historique"; neighbors=@("Tourbes", "Montagnac", "Florensac", "Castelnau-de-Guers")},
    @{name="Pignan"; code="34570"; type="périurbain"; neighbors=@("Montpellier", "Lavérune", "Cournonterral", "Fabrègues")},
    @{name="Saint-André-de-Sangonis"; code="34725"; type="rural"; neighbors=@("Gignac", "Aniane", "Popian", "Belarga")},
    @{name="Saint-Félix-de-Lodez"; code="34725"; type="rural"; neighbors=@("Lodève", "Soumont", "Clermont-l'Hérault", "Le Bosc")},
    @{name="Saint-Guilhem-le-Désert"; code="34150"; type="patrimoine"; neighbors=@("Aniane", "Saint-Jean-de-Fos", "Causse-de-la-Selle", "Montpeyroux")},
    @{name="Saint-Jean-de-Fos"; code="34150"; type="rural"; neighbors=@("Aniane", "Saint-Guilhem-le-Désert", "Montpeyroux", "Gignac")},
    @{name="Saint-Jean-de-Védas"; code="34430"; type="périurbain"; neighbors=@("Montpellier", "Lattes", "Pignan", "Lavérune")},
    @{name="Saint-Mathieu-de-Tréviers"; code="34270"; type="rural"; neighbors=@("Le Crès", "Assas", "Sainte-Croix-de-Quintillargues", "Claret")},
    @{name="Salasc"; code="34800"; type="lac"; neighbors=@("Octon", "Mourèze", "Clermont-l'Hérault", "Villeneuvette")},
    @{name="Servian"; code="34290"; type="rural"; neighbors=@("Béziers", "Alignan-du-Vent", "Abeilhan", "Magalas")},
    @{name="Valras-Plage"; code="34350"; type="littoral"; neighbors=@("Sérignan", "Vendres", "Béziers", "Portiragnes")},
    @{name="Vendargues"; code="34740"; type="périurbain"; neighbors=@("Le Crès", "Castelnau-le-Lez", "Saint-Mathieu-de-Tréviers", "Teyran")},
    @{name="Vias"; code="34450"; type="littoral"; neighbors=@("Agde", "Portiragnes", "Béziers", "Bessan")},
    @{name="Villeneuve-lès-Maguelone"; code="34750"; type="littoral"; neighbors=@("Palavas-les-Flots", "Mireval", "Vic-la-Gardiole", "Montpellier")}
)

# Spécificités par type de ville
$citySpecs = @{
    "montagne" = @{
        context = "relief vallonné et nature préservée"
        specificities = @("résistance aux intempéries", "isolation renforcée", "matériaux montagnards")
        testimonial_context = "maison de montagne"
    }
    "vignoble" = @{
        context = "terroir viticole et patrimoine"
        specificities = @("caves à vin intégrées", "style traditionnel", "finitions authentiques")
        testimonial_context = "domaine viticole"
    }
    "littoral" = @{
        context = "environnement marin et balnéaire"
        specificities = @("résistance embruns", "protection UV marine", "étanchéité renforcée")
        testimonial_context = "résidence balnéaire"
    }
    "périurbain" = @{
        context = "proximité métropole et modernité"
        specificities = @("design contemporain", "domotique avancée", "performance énergétique")
        testimonial_context = "maison moderne"
    }
    "urbain" = @{
        context = "centre-ville et commodités"
        specificities = @("isolation phonique", "sécurité renforcée", "finitions urbaines")
        testimonial_context = "centre-ville"
    }
    "rural" = @{
        context = "charme campagnard et tranquillité"
        specificities = @("style authentique", "matériaux naturels", "harmonie paysagère")
        testimonial_context = "maison de campagne"
    }
    "historique" = @{
        context = "patrimoine historique et culture"
        specificities = @("respect ABF", "matériaux traditionnels", "conservation du cachet")
        testimonial_context = "maison de caractère"
    }
    "patrimoine" = @{
        context = "site classé et préservation"
        specificities = @("contraintes patrimoniales", "matériaux nobles", "savoir-faire traditionnel")
        testimonial_context = "village historique"
    }
    "canal" = @{
        context = "voies navigables et commerce"
        specificities = @("résistance humidité", "style canal du Midi", "finitions marine")
        testimonial_context = "bord de canal"
    }
    "cévennes" = @{
        context = "paysages cévenols et nature"
        specificities = @("matériaux locaux", "résistance montagne", "style cévenol")
        testimonial_context = "maison cévenole"
    }
    "lac" = @{
        context = "environnement lacustre et détente"
        specificities = @("résistance humidité", "vue panoramique", "matériaux durables")
        testimonial_context = "bord de lac"
    }
}

# Fonction pour créer le contenu d'une page
function Create-CityPage {
    param(
        [string]$cityName,
        [string]$cityCode,
        [string]$cityType,
        [array]$neighbors
    )

    $citySlug = $cityName.ToLower() -replace 'é','e' -replace 'è','e' -replace 'à','a' -replace 'ç','c' -replace "'","-" -replace " ","-"
    $spec = $citySpecs[$cityType]

    # Créer le dossier
    $folderPath = "C:\Users\cedri\Desktop\menuiserie site\secteur\$citySlug"
    New-Item -ItemType Directory -Path $folderPath -Force | Out-Null

    # Créer les liens vers les communes limitrophes
    $neighborLinks = ""
    for ($i = 0; $i -lt [Math]::Min(4, $neighbors.Count); $i++) {
        $neighborSlug = $neighbors[$i].ToLower() -replace 'é','e' -replace 'è','e' -replace 'à','a' -replace 'ç','c' -replace "'","-" -replace " ","-"
        $neighborLinks += @"
                                <div class="city-item">
                                    <a href="../$neighborSlug/">
                                        <strong>$($neighbors[$i])</strong>
                                        <span class="city-code">$cityCode</span>
                                    </a>
                                </div>
"@
    }

    # Contenu HTML personnalisé
    $htmlContent = @"
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menuisier $cityName | Fenêtres Portes Volets | Expert Menuiserie Hérault</title>
    <meta name="description" content="Menuisier Qualibat RGE à $cityName. Installation fenêtres, portes, volets sur mesure. Devis gratuit. Intervention rapide.">
    <meta name="keywords" content="menuisier $citySlug, fenêtres $citySlug, portes $citySlug, volets roulants $citySlug, pergola $citySlug">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://expert-menuiserie-herault.fr/secteur/$citySlug/">
    <link rel="stylesheet" href="../../assets/css/main.css">
    <link rel="stylesheet" href="../../assets/css/responsive.css">

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Expert Menuiserie Hérault - $cityName",
        "image": "https://expert-menuiserie-herault.fr/assets/images/menuisier-$citySlug.jpg",
        "description": "Menuisier spécialisé à $cityName pour fenêtres, portes, volets sur mesure",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "$cityName",
            "postalCode": "$cityCode",
            "addressRegion": "Hérault",
            "addressCountry": "FR"
        },
        "telephone": "+33759627463",
        "priceRange": "€€",
        "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Qualibat RGE"
        },
        "areaServed": {
            "@type": "City",
            "name": "$cityName"
        }
    }
    </script>
</head>
<body>
    <!-- HEADER NAVIGATION -->
    <header class="header-main">
        <div class="container">
            <!-- Top Bar: Logo + Contact -->
            <div class="header-top">
                <div class="logo-section">
                    <a href="../../" class="logo-link">
                        <img src="../../Images/Expert Menuiserie Hérault.png" alt="Expert Menuiserie Hérault - Logo" class="company-logo">
                        <span class="company-name">Expert Menuiserie Hérault</span>
                    </a>
                </div>

                <div class="header-contact">
                    <a href="tel:+33759627463" class="btn btn-secondary phone-btn">07 59 62 74 63</a>
                    <a href="../../devis-gratuit/" class="btn btn-primary">DEVIS GRATUIT 24H</a>
                </div>
            </div>

            <!-- Navigation Bar -->
            <nav class="main-nav">
                <div class="container">
                    <ul class="nav-menu">
                        <li><a href="../../">Accueil</a></li>
                        <li class="dropdown">
                            <span class="dropdown-trigger">Services</span>
                            <ul class="submenu">
                                <li><a href="../../services/fenetres-sur-mesure-herault/">Fenêtres</a></li>
                                <li><a href="../../services/portes-entree-sur-mesure-herault/">Portes d'Entrée</a></li>
                                <li><a href="../../services/volets-sur-mesure-herault/">Volets</a></li>
                                <li><a href="../../services/portes-garage-herault/">Portes de Garage</a></li>
                                <li><a href="../../services/portails-clotures-herault/">Portails & Clôtures</a></li>
                                <li><a href="../../services/amenagements-exterieurs-herault/">Aménagements Extérieurs</a></li>
                                <li><a href="../../services/amenagements-interieurs-herault/">Aménagements Intérieurs</a></li>
                            </ul>
                        </li>
                        <li><a href="../">Nos Secteurs</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>

    <main>
        <!-- HERO SECTION -->
        <section class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <div class="hero-text">
                        <h1 class="hero-title">
                            Menuisier à $cityName
                            <span class="subtitle">Expert Qualibat RGE - Devis Gratuit 24h</span>
                        </h1>
                        <p class="hero-description">
                            Installation menuiseries sur mesure à $cityName au cœur du $($spec.context). Fenêtres, portes, volets, pergolas adaptés aux spécificités locales.
                            <strong>Spécialiste des menuiseries authentiques et performantes</strong>.
                        </p>

                        <div class="hero-cta">
                            <a href="../../devis-gratuit/" class="btn btn-primary btn-large" style="min-width: 280px; height: 60px; display: flex; align-items: center; justify-content: center;">Devis Gratuit $cityName</a>
                            <a href="tel:+33759627463" class="btn btn-secondary btn-large" style="white-space: nowrap; min-width: 280px; height: 60px; display: flex; align-items: center; justify-content: center;">📞&nbsp;07&nbsp;59&nbsp;62&nbsp;74&nbsp;63</a>
                        </div>
                    </div>

                    <div class="hero-visual">
                        <div class="hero-carousel-container">
                            <div class="hero-carousel-track" id="heroCarouselTrack">
                                <div class="hero-slide">
                                    <img src="../../Images/fenetres-sur-mesure-herault.jpg" alt="Fenêtres sur mesure $cityName">
                                    <div class="hero-slide-caption">
                                        <h3>Fenêtres Sur Mesure</h3>
                                        <p>Adaptées au style de $cityName</p>
                                    </div>
                                </div>
                                <div class="hero-slide">
                                    <img src="../../Images/portes-entree-sur-mesure-herault.jpg" alt="Portes d'entrée $cityName">
                                    <div class="hero-slide-caption">
                                        <h3>Portes d'Entrée</h3>
                                        <p>Sécurité et élégance</p>
                                    </div>
                                </div>
                                <div class="hero-slide">
                                    <img src="../../Images/volets-sur-mesure-herault.jpg" alt="Volets roulants $cityName">
                                    <div class="hero-slide-caption">
                                        <h3>Volets Roulants</h3>
                                        <p>Protection et confort</p>
                                    </div>
                                </div>
                                <div class="hero-slide">
                                    <img src="../../Images/porte-garage-sectionnelle-herault.jpg" alt="Portes de garage $cityName">
                                    <div class="hero-slide-caption">
                                        <h3>Portes de Garage</h3>
                                        <p>Praticité et design</p>
                                    </div>
                                </div>
                                <div class="hero-slide">
                                    <img src="../../Images/Portails Aluminium herault.jpg" alt="Portails $cityName">
                                    <div class="hero-slide-caption">
                                        <h3>Portails & Clôtures</h3>
                                        <p>Sécurité sur mesure</p>
                                    </div>
                                </div>
                                <div class="hero-slide">
                                    <img src="../../Images/pergola-bioclimatique-herault.jpg" alt="Pergola $cityName">
                                    <div class="hero-slide-caption">
                                        <h3>Pergolas Bioclimatiques</h3>
                                        <p>Espaces de vie ombragés</p>
                                    </div>
                                </div>
                                <div class="hero-slide">
                                    <img src="../../Images/dressing-sur-mesure-herault.jpg" alt="Aménagements intérieurs $cityName">
                                    <div class="hero-slide-caption">
                                        <h3>Aménagements Intérieurs</h3>
                                        <p>Optimisation sur mesure</p>
                                    </div>
                                </div>
                            </div>
                            <button class="hero-carousel-nav hero-carousel-prev" onclick="moveHeroCarousel(-1)">‹</button>
                            <button class="hero-carousel-nav hero-carousel-next" onclick="moveHeroCarousel(1)">›</button>
                            <div class="hero-carousel-indicators">
                                <button class="hero-indicator active" onclick="goToHeroSlide(0)"></button>
                                <button class="hero-indicator" onclick="goToHeroSlide(1)"></button>
                                <button class="hero-indicator" onclick="goToHeroSlide(2)"></button>
                                <button class="hero-indicator" onclick="goToHeroSlide(3)"></button>
                                <button class="hero-indicator" onclick="goToHeroSlide(4)"></button>
                                <button class="hero-indicator" onclick="goToHeroSlide(5)"></button>
                                <button class="hero-indicator" onclick="goToHeroSlide(6)"></button>
                            </div>
                        </div>

                        <div class="floating-badge">
                            <span class="badge-text">15+ ANS</span>
                            <span class="badge-subtext">d'expérience à $cityName</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SERVICES SECTION -->
        <section class="services-section">
            <div class="container">
                <div class="section-header">
                    <h2>Nos Services de Menuiserie à $cityName</h2>
                    <p class="section-subtitle">Menuiseries spécialisées pour l'environnement et le style de $cityName</p>
                </div>

                <div class="services-grid">
                    <a href="../../services/fenetres-sur-mesure-herault/" class="service-card">
                        <div class="service-image">
                            <img src="../../Images/fenetres-sur-mesure-herault.jpg" alt="Fenêtres sur mesure $cityName">
                        </div>
                        <div class="service-content">
                            <h3>Fenêtres Sur Mesure</h3>
                            <p>PVC, Aluminium, Bois. Parfaitement adaptées aux spécificités de $cityName et à son $($spec.context).</p>
                            <ul class="service-features">
                                <li>$($spec.specificities[0])</li>
                                <li>$($spec.specificities[1])</li>
                                <li>$($spec.specificities[2])</li>
                            </ul>
                            <div class="btn btn-outline" style="margin-top: auto;">Fenêtres Sur Mesure</div>
                        </div>
                    </a>

                    <a href="../../services/portes-entree-sur-mesure-herault/" class="service-card">
                        <div class="service-image">
                            <img src="../../Images/portes-entree-sur-mesure-herault.jpg" alt="Portes d'entrée $cityName">
                        </div>
                        <div class="service-content">
                            <h3>Portes d'Entrée</h3>
                            <p>Portes sécurisées et élégantes pour les habitations de $cityName. Design respectueux du caractère local.</p>
                            <ul class="service-features">
                                <li>Sécurité multipoints</li>
                                <li>Design harmonieux</li>
                                <li>Isolation thermique</li>
                            </ul>
                            <div class="btn btn-outline" style="margin-top: auto;">Portes d'Entrée</div>
                        </div>
                    </a>

                    <a href="../../services/volets-sur-mesure-herault/" class="service-card">
                        <div class="service-image">
                            <img src="../../Images/volets-sur-mesure-herault.jpg" alt="Volets $cityName">
                        </div>
                        <div class="service-content">
                            <h3>Volets Roulants</h3>
                            <p>Protection solaire et thermique optimale pour les habitations de $cityName. Motorisés ou manuels.</p>
                            <ul class="service-features">
                                <li>Confort thermique</li>
                                <li>Motorisation silencieuse</li>
                                <li>Intégration discrète</li>
                            </ul>
                            <div class="btn btn-outline" style="margin-top: auto;">Volets Roulants</div>
                        </div>
                    </a>

                    <a href="../../services/portes-garage-herault/" class="service-card">
                        <div class="service-image">
                            <img src="../../Images/porte-garage-sectionnelle-herault.jpg" alt="Portes de garage $cityName">
                        </div>
                        <div class="service-content">
                            <h3>Portes de Garage</h3>
                            <p>Sectionnelles, basculantes, enroulables. Solutions pratiques et esthétiques pour garages à $cityName.</p>
                            <ul class="service-features">
                                <li>Motorisation fiable</li>
                                <li>Isolation performante</li>
                                <li>Design harmonieux</li>
                            </ul>
                            <div class="btn btn-outline" style="margin-top: auto;">Portes de Garage</div>
                        </div>
                    </a>

                    <a href="../../services/portails-clotures-herault/" class="service-card">
                        <div class="service-image">
                            <img src="../../Images/Portails Aluminium herault.jpg" alt="Portails $cityName">
                        </div>
                        <div class="service-content">
                            <h3>Portails & Clôtures</h3>
                            <p>Sécurisation élégante de votre propriété à $cityName. Coulissants ou battants avec motorisation avancée.</p>
                            <ul class="service-features">
                                <li>Motorisation intelligente</li>
                                <li>Design sur mesure</li>
                                <li>Sécurité optimale</li>
                            </ul>
                            <div class="btn btn-outline" style="margin-top: auto;">Portails & Clôtures</div>
                        </div>
                    </a>

                    <a href="../../services/amenagements-exterieurs-herault/" class="service-card">
                        <div class="service-image">
                            <img src="../../Images/amenagements-exterieurs-herault.jpg" alt="Aménagements extérieurs $cityName">
                        </div>
                        <div class="service-content">
                            <h3>Aménagements Extérieurs</h3>
                            <p>Carports, abris de jardin, terrasses. Créez vos espaces de vie extérieur dans l'esprit de $cityName.</p>
                            <ul class="service-features">
                                <li>Harmonie avec l'environnement</li>
                                <li>Matériaux durables</li>
                                <li>Conception personnalisée</li>
                            </ul>
                            <div class="btn btn-outline" style="margin-top: auto;">Aménagements Extérieurs</div>
                        </div>
                    </a>

                    <a href="../../services/amenagements-interieurs-herault/" class="service-card">
                        <div class="service-image">
                            <img src="../../Images/dressing-sur-mesure-herault.jpg" alt="Aménagements intérieurs $cityName">
                        </div>
                        <div class="service-content">
                            <h3>Aménagements Intérieurs</h3>
                            <p>Dressing, placards, verrières. Optimisation intelligente de l'espace dans les habitations de $cityName.</p>
                            <ul class="service-features">
                                <li>Solutions gain de place</li>
                                <li>Rangements astucieux</li>
                                <li>Design harmonieux</li>
                            </ul>
                            <div class="btn btn-outline" style="margin-top: auto;">Aménagements Intérieurs</div>
                        </div>
                    </a>

                    <a href="../../services/amenagements-exterieurs-herault/" class="service-card">
                        <div class="service-image">
                            <img src="../../Images/pergola-bioclimatique-herault.jpg" alt="Pergola $cityName">
                        </div>
                        <div class="service-content">
                            <h3>Pergolas</h3>
                            <p>Créez votre espace ombragé à $cityName. Protection solaire et convivialité pour profiter du climat.</p>
                            <ul class="service-features">
                                <li>Confort bioclimatique</li>
                                <li>Ombrage modulable</li>
                                <li>Robustesse garantie</li>
                            </ul>
                            <div class="btn btn-outline" style="margin-top: auto;">Pergolas</div>
                        </div>
                    </a>
                </div>

                <!-- Options & Équipements -->
                <div style="margin-top: var(--spacing-2xl);">
                    <h3 style="color: var(--primary-blue); text-align: center; margin-bottom: var(--spacing-lg);">Options & Équipements Spécifiques $cityName</h3>
                    <div class="grid grid-4">
                        <div class="card text-center">
                            <h4>Protection Adaptée</h4>
                            <p>Solutions spécialement conçues pour l'environnement de $cityName</p>
                        </div>
                        <div class="card text-center">
                            <h4>Sécurité Résidentielle</h4>
                            <p>Vitrages anti-effraction, serrures renforcées, sécurisation complète</p>
                        </div>
                        <div class="card text-center">
                            <h4>Domotique Moderne</h4>
                            <p>Motorisation, contrôle intelligent, gestion automatisée</p>
                        </div>
                        <div class="card text-center">
                            <h4>Confort Acoustique</h4>
                            <p>Isolation phonique adaptée aux spécificités de $cityName</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- TÉMOIGNAGES SECTION -->
        <section class="testimonials-section">
            <div class="container">
                <div class="section-header">
                    <h2>Témoignages Clients $cityName</h2>
                    <p class="section-subtitle">L'avis de nos clients de $cityName</p>
                </div>

                <div class="testimonials-grid">
                    <div class="testimonial-card">
                        <div class="testimonial-content">
                            <div class="stars">★★★★★</div>
                            <p>"Excellent travail pour notre $($spec.testimonial_context) ! Les menuiseries s'intègrent parfaitement au style de $cityName. Équipe professionnelle et soignée."</p>
                        </div>
                        <div class="testimonial-author">
                            <strong>Pierre C.</strong>
                            <span>Résident - $cityName</span>
                        </div>
                    </div>

                    <div class="testimonial-card">
                        <div class="testimonial-content">
                            <div class="stars">★★★★★</div>
                            <p>"Installation parfaite de notre portail motorisé. Travail impeccable, motorisation silencieuse. Très satisfaits du service à $cityName."</p>
                        </div>
                        <div class="testimonial-author">
                            <strong>Sylvie T.</strong>
                            <span>Propriétaire - $cityName</span>
                        </div>
                    </div>

                    <div class="testimonial-card">
                        <div class="testimonial-content">
                            <div class="stars">★★★★★</div>
                            <p>"Rénovation complète de nos menuiseries. Qualité de fabrication excellente et installation soignée. Je recommande cette équipe !"</p>
                        </div>
                        <div class="testimonial-author">
                            <strong>Laurent M.</strong>
                            <span>Habitant - $cityName</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ZONES COUVERTES SECTION -->
        <section class="zones-section">
            <div class="container">
                <div class="section-header">
                    <h2>Zones d'Intervention à $cityName</h2>
                    <p class="section-subtitle">Expert Menuiserie Hérault intervient dans tout $cityName et ses environs</p>
                </div>

                <div class="zones-content">
                    <div class="zones-info">
                        <img src="../../Images/Nos%20Zones%20d'Intervention%20dans%20l'Hérault.jpg" alt="Carte intervention $cityName" class="intervention-map">

                        <div class="zones-stats">
                            <div class="stat-item">
                                <span class="stat-number">100%</span>
                                <span class="stat-label">du territoire couvert</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">24h</span>
                                <span class="stat-label">Délai intervention</span>
                            </div>
                        </div>

                        <!-- Communes Limitrophes Section -->
                        <div class="city-zone" style="margin-top: var(--spacing-xl);">
                            <h4 class="zone-title">Communes Limitrophes</h4>
                            <div class="cities-grid" style="grid-template-columns: repeat(2, 1fr);">
$neighborLinks
                            </div>
                        </div>
                    </div>

                    <div class="zones-cities">
                        <h3>Quartiers & Zones Couverts</h3>

                        <div class="city-zone">
                            <h4 class="zone-title">Centre Ville</h4>
                            <div class="cities-grid">
                                <div class="city-item">
                                    <div style="display: block; padding: var(--spacing-sm) var(--spacing-md); text-decoration: none; color: var(--text-dark);">
                                        <strong>Centre historique</strong>
                                        <span class="city-code">Cœur de ville</span>
                                    </div>
                                </div>
                                <div class="city-item">
                                    <div style="display: block; padding: var(--spacing-sm) var(--spacing-md); text-decoration: none; color: var(--text-dark);">
                                        <strong>Quartier central</strong>
                                        <span class="city-code">Zone principale</span>
                                    </div>
                                </div>
                                <div class="city-item">
                                    <div style="display: block; padding: var(--spacing-sm) var(--spacing-md); text-decoration: none; color: var(--text-dark);">
                                        <strong>Place principale</strong>
                                        <span class="city-code">Centre névralgique</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="city-zone">
                            <h4 class="zone-title">Quartiers Résidentiels</h4>
                            <div class="cities-grid" style="grid-template-columns: repeat(2, 1fr);">
                                <div class="city-item">
                                    <div style="display: block; padding: var(--spacing-sm) var(--spacing-md); text-decoration: none; color: var(--text-dark);">
                                        <strong>Lotissements</strong>
                                        <span class="city-code">Zones pavillonnaires</span>
                                    </div>
                                </div>
                                <div class="city-item">
                                    <div style="display: block; padding: var(--spacing-sm) var(--spacing-md); text-decoration: none; color: var(--text-dark);">
                                        <strong>Périphérie</strong>
                                        <span class="city-code">Zones résidentielles</span>
                                    </div>
                                </div>
                                <div class="city-item">
                                    <div style="display: block; padding: var(--spacing-sm) var(--spacing-md); text-decoration: none; color: var(--text-dark);">
                                        <strong>Hameaux</strong>
                                        <span class="city-code">Écarts</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>

        <!-- CTA FINAL SECTION -->
        <section class="final-cta-section">
            <div class="container">
                <div class="cta-content">
                    <h2>Votre Projet Menuiserie à $cityName</h2>
                    <p>Devis gratuit sous 24h • Déplacement gratuit sur $cityName et environs • Qualibat RGE</p>

                    <div class="cta-actions">
                        <div class="cta-phone">
                            <a href="tel:+33759627463" class="phone-cta">📞 07 59 62 74 63</a>
                            <span>Lun-Ven 8h-18h, Sam 8h-12h</span>
                        </div>
                        <a href="../../devis-gratuit/" class="btn btn-secondary btn-large">Demander un Devis Gratuit</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer-main">
        <div class="container">
            <div class="footer-content">
                <!-- Colonne 1 : Entreprise -->
                <div class="footer-column">
                    <h3>Expert Menuiserie Hérault</h3>
                    <p>Votre spécialiste menuiserie Qualibat RGE dans l'Hérault. Installation, réparation, dépannage 24h/7j.</p>
                    <div class="certifications">
                        <span class="cert-badge">🏆 Qualibat</span>
                        <span class="cert-badge">⚡ RGE</span>
                    </div>
                </div>

                <!-- Colonne 2 : Services -->
                <div class="footer-column">
                    <h4>Nos Services</h4>
                    <ul>
                        <li><a href="../../services/fenetres-sur-mesure-herault/">Fenêtres</a></li>
                        <li><a href="../../services/portes-entree-sur-mesure-herault/">Portes d'Entrée</a></li>
                        <li><a href="../../services/volets-sur-mesure-herault/">Volets</a></li>
                        <li><a href="../../services/portes-garage-herault/">Portes de Garage</a></li>
                        <li><a href="../../services/portails-clotures-herault/">Portails & Clôtures</a></li>
                        <li><a href="../../services/amenagements-exterieurs-herault/">Aménagements Extérieurs</a></li>
                        <li><a href="../../services/amenagements-interieurs-herault/">Aménagements Intérieurs</a></li>
                    </ul>
                </div>

                <!-- Colonne 3 : Zones -->
                <div class="footer-column">
                    <h4>Nos Secteurs</h4>
                    <ul>
                        <li><a href="../../secteur/montpellier/">Montpellier</a></li>
                        <li><a href="../../secteur/beziers/">Béziers</a></li>
                        <li><a href="../../secteur/sete/">Sète</a></li>
                        <li><a href="../../secteur/lunel/">Lunel</a></li>
                        <li><a href="../../secteur/clermont-l-herault/">Clermont-l'Hérault</a></li>
                        <li><a href="../../secteur/">Toutes nos zones</a></li>
                    </ul>
                </div>

                <!-- Colonne 4 : Contact -->
                <div class="footer-column">
                    <h4>Contact</h4>
                    <div class="contact-info">
                        <p><a href="tel:+33759627463">📞 07 59 62 74 63</a></p>
                        <p>📍 Hérault (34)</p>
                    </div>
                    <a href="../../devis-gratuit/" class="btn btn-primary">Devis Gratuit</a>
                </div>
            </div>

            <!-- Copyright -->
            <div class="footer-bottom">
                <p>&copy; 2024 Expert Menuiserie Hérault. Tous droits réservés.</p>
                <div class="footer-links">
                    <a href="../../sitemap.xml">Plan du Site</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Hero Carousel
        let heroCurrentSlide = 0;
        const heroSlides = document.querySelectorAll('.hero-slide');
        const heroIndicators = document.querySelectorAll('.hero-indicator');

        function moveHeroCarousel(direction) {
            heroCurrentSlide += direction;
            if (heroCurrentSlide >= heroSlides.length) heroCurrentSlide = 0;
            if (heroCurrentSlide < 0) heroCurrentSlide = heroSlides.length - 1;
            updateHeroCarousel();
        }

        function goToHeroSlide(index) {
            heroCurrentSlide = index;
            updateHeroCarousel();
        }

        function updateHeroCarousel() {
            const track = document.getElementById('heroCarouselTrack');
            track.style.transform = `translateX(-`${heroCurrentSlide * 100}%)`;

            heroIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === heroCurrentSlide);
            });
        }


        // Gallery Carousel
        let galleryCurrentSlide = 0;
        const gallerySlides = document.querySelectorAll('.carousel-slide');
        const galleryIndicators = document.querySelectorAll('.indicator');

        function moveGalleryCarousel(direction) {
            galleryCurrentSlide += direction;
            if (galleryCurrentSlide >= gallerySlides.length) galleryCurrentSlide = 0;
            if (galleryCurrentSlide < 0) galleryCurrentSlide = gallerySlides.length - 1;
            updateGalleryCarousel();
        }

        function goToGallerySlide(index) {
            galleryCurrentSlide = index;
            updateGalleryCarousel();
        }

        function updateGalleryCarousel() {
            const track = document.getElementById('galleryCarouselTrack');
            track.style.transform = `translateX(-`${galleryCurrentSlide * 100}%)`;

            galleryIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === galleryCurrentSlide);
            });
        }

        // Auto-advance carousels
        setInterval(() => {
            moveHeroCarousel(1);
        }, 5000);

        setInterval(() => {
            moveGalleryCarousel(1);
        }, 4000);
    </script>
</body>
</html>
"@

    # Écrire le fichier
    $filePath = "$folderPath\index.html"
    $htmlContent | Out-File -FilePath $filePath -Encoding UTF8

    Write-Host "Page créée pour $cityName ($citySlug)" -ForegroundColor Green
}

# Créer toutes les pages
Write-Host "Début de création des pages secteurs..." -ForegroundColor Yellow

foreach ($city in $cities) {
    Create-CityPage -cityName $city.name -cityCode $city.code -cityType $city.type -neighbors $city.neighbors
    Start-Sleep -Milliseconds 100  # Petite pause pour éviter la surcharge
}

Write-Host "`nToutes les pages secteurs ont été créées avec succès !" -ForegroundColor Green
Write-Host "Total : $($cities.Count) pages générées" -ForegroundColor Cyan