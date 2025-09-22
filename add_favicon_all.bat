@echo off
echo Adding favicon to all HTML pages...

:: Main page (already done, but included for completeness)
echo Processing index.html

:: Services pages
for %%f in (services\*\index.html) do (
    echo Processing %%f
    powershell -Command "(Get-Content '%%f' -Raw -Encoding UTF8) -replace '(<link rel=\"stylesheet\" href=\"../../assets/css/main\.css\">)', '    <!-- Favicon -->`r`n    <link rel=\"icon\" type=\"image/png\" href=\"../../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"shortcut icon\" href=\"../../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"apple-touch-icon\" href=\"../../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n`r`n    <link rel=\"stylesheet\" href=\"../../assets/css/main.css\">' | Set-Content '%%f' -Encoding UTF8"
)

:: Secteur pages (level 2)
for %%f in (secteur\*\index.html) do (
    echo Processing %%f
    powershell -Command "(Get-Content '%%f' -Raw -Encoding UTF8) -replace '(<link rel=\"stylesheet\" href=\"../../assets/css/main\.css\">)', '    <!-- Favicon -->`r`n    <link rel=\"icon\" type=\"image/png\" href=\"../../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"shortcut icon\" href=\"../../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"apple-touch-icon\" href=\"../../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n`r`n    <link rel=\"stylesheet\" href=\"../../assets/css/main.css\">' | Set-Content '%%f' -Encoding UTF8"
)

:: Devis pages
for %%f in (devis-gratuit\index.html) do (
    echo Processing %%f
    powershell -Command "(Get-Content '%%f' -Raw -Encoding UTF8) -replace '(<link rel=\"stylesheet\" href=\"../assets/css/main\.css\">)', '    <!-- Favicon -->`r`n    <link rel=\"icon\" type=\"image/png\" href=\"../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"shortcut icon\" href=\"../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"apple-touch-icon\" href=\"../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n`r`n    <link rel=\"stylesheet\" href=\"../assets/css/main.css\">' | Set-Content '%%f' -Encoding UTF8"
)

:: Devis merci page
for %%f in (devis-gratuit\merci\index.html) do (
    echo Processing %%f
    powershell -Command "(Get-Content '%%f' -Raw -Encoding UTF8) -replace '(<link rel=\"stylesheet\" href=\"../../assets/css/main\.css\">)', '    <!-- Favicon -->`r`n    <link rel=\"icon\" type=\"image/png\" href=\"../../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"shortcut icon\" href=\"../../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"apple-touch-icon\" href=\"../../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n`r`n    <link rel=\"stylesheet\" href=\"../../assets/css/main.css\">' | Set-Content '%%f' -Encoding UTF8"
)

:: Contact page
for %%f in (contact\index.html) do (
    echo Processing %%f
    powershell -Command "(Get-Content '%%f' -Raw -Encoding UTF8) -replace '(<link rel=\"stylesheet\" href=\"../assets/css/main\.css\">)', '    <!-- Favicon -->`r`n    <link rel=\"icon\" type=\"image/png\" href=\"../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"shortcut icon\" href=\"../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n    <link rel=\"apple-touch-icon\" href=\"../images/Expert-Menuiserie-Herault-Favicon.png\">`r`n`r`n    <link rel=\"stylesheet\" href=\"../assets/css/main.css\">' | Set-Content '%%f' -Encoding UTF8"
)

echo Done! Favicon added to all pages.
pause