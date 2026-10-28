# calling-card

Persönliche Website von Tobias Bergmann – Steckbrief, digitale Visitenkarte und Showcase
für Referenzprojekte. Zielgruppe: Freelance-Anfragen und Recruiting.

- **Technik:** reines HTML, CSS und JavaScript – keine Frameworks, kein Build-Schritt
- **Hosting:** GitHub Pages (später mit Custom Domain)
- **Datenschutz:** keine Cookies, kein Tracking, keine externen Ressourcen (System-Schriften statt Google Fonts)

## Struktur

```
.
├── index.html          # Startseite (Hero/Visitenkarte, Profil, Kompetenzen, Leistungen, Projekte, Werdegang, Kontakt)
├── impressum.html      # Platzhalter – vor Livegang ausfüllen
├── datenschutz.html    # Platzhalter – vor Livegang ausfüllen
├── 404.html            # Fehlerseite für GitHub Pages
├── css/style.css       # Styles inkl. Hell/Dunkel-Theme (Design-Tokens in :root)
├── js/main.js          # Theme-Umschalter, Mobile-Navigation, Projektfilter, Scroll-Effekte
├── assets/img/         # Favicon, später Portrait und Projekt-Screenshots
├── robots.txt
└── .nojekyll           # Jekyll-Verarbeitung von GitHub Pages abschalten
```

## Lokal ansehen

Keine Installation nötig – `index.html` direkt im Browser öffnen oder einen kleinen Server starten:

```bash
python3 -m http.server 8000
```

Dann <http://localhost:8000> öffnen.

## Deployment (GitHub Pages)

1. Änderungen auf den Standard-Branch (z. B. `main`) mergen.
2. Im Repository unter **Settings → Pages** als Quelle *Deploy from a branch* wählen,
   Branch `main`, Ordner `/ (root)`.
3. Die Seite ist danach unter `https://<user>.github.io/calling-card/` erreichbar.

### Custom Domain (später)

1. Datei `CNAME` im Repo-Root mit der Domain anlegen (z. B. `www.example.de`).
2. Beim DNS-Anbieter einen `CNAME`-Eintrag auf `<user>.github.io` setzen
   (bzw. `A`/`AAAA`-Einträge für die Apex-Domain gemäß GitHub-Doku).
3. In **Settings → Pages** die Domain eintragen und *Enforce HTTPS* aktivieren.

Hinweis: `404.html` verwendet absolute Pfade (`/css/...`) und sieht daher erst mit Custom Domain
(oder einem User-Pages-Repo) korrekt aus.

## Offene Punkte / Platzhalter

- [ ] Impressum und Datenschutzerklärung vervollständigen (Anschrift, Kontakt)
- [ ] Platzhalter-Adresse `kontakt@example.com` ersetzen (Kontakt-Button in `index.html`, Impressum, Datenschutz)
- [ ] XING-Link im Kontaktbereich eintragen
- [ ] Verfügbarkeitsstatus in der Visitenkarte pflegen
- [ ] Weitere Referenzprojekte, Screenshots und Live-Demos ergänzen
- [ ] Open-Graph-Bild (`og:image`) und `canonical`-URL nach Domain-Umzug setzen
- [ ] Optional: englische Version

## Grundsatz

Keine privaten Daten (Wohnanschrift, private E-Mail, Telefonnummer, Geburtsdatum) im Repository
oder auf der Website ablegen – auch nicht in Kommentaren. Das Repo ist öffentlich einsehbar.
