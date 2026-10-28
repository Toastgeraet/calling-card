# calling-card

Persönliche Website von Tobias Bergmann – Steckbrief, digitale Visitenkarte und Showcase
für Referenzprojekte. Zielgruppe: Freelance-Anfragen und Recruiting.

- **Technik:** reines HTML, CSS und JavaScript – keine Frameworks, kein Build-Schritt
- **Hosting:** GitHub Pages unter <https://tobiasbergmann.dev>
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
├── CNAME               # Custom Domain für GitHub Pages
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
3. Die Seite ist danach unter <https://tobiasbergmann.dev> erreichbar
   (`toastgeraet.github.io/calling-card/` leitet dorthin weiter).

### Custom Domain `tobiasbergmann.dev`

Die Datei `CNAME` im Repo-Root enthält die Domain. DNS-Einträge bei INWX:

| Name  | Typ   | Wert                                                           |
|-------|-------|----------------------------------------------------------------|
| (leer)| A     | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| (leer)| AAAA  | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| www   | CNAME | `toastgeraet.github.io`                                        |

Außerdem die Domain unter **GitHub → Settings (Account) → Pages → Verified domains** verifizieren
(TXT-Eintrag `_github-pages-challenge-toastgeraet`) und in den Repo-Einstellungen unter
**Settings → Pages** *Enforce HTTPS* aktivieren. `.dev` ist nur per HTTPS erreichbar – bis GitHub
das Zertifikat ausgestellt hat, lädt die Seite nicht.

## Offene Punkte / Platzhalter

- [ ] Postfach für `kontakt@tobiasbergmann.dev` einrichten (z. B. mailbox.org; MX-, SPF- und DKIM-Einträge bei INWX) – bis dahin kommen Mails nicht an; danach den Anbieter in `datenschutz.html` ergänzen (TODO-Kommentar)
- [ ] Verfügbarkeitsstatus in der Visitenkarte pflegen
- [ ] Weitere Referenzprojekte, Screenshots und Live-Demos ergänzen
- [ ] Open-Graph-Bild (`og:image`) ergänzen
- [ ] Optional: englische Version

## Grundsatz

Keine privaten Daten (private E-Mail, Geburtsdatum o. Ä.) im Repository oder auf der Website ablegen –
auch nicht in Kommentaren. Das Repo ist öffentlich einsehbar. Einzige Ausnahme sind die gesetzlich
vorgeschriebenen Angaben (Anschrift, Telefon) in `impressum.html` und `datenschutz.html`; beide
Seiten sind per `noindex` von Suchmaschinen ausgeschlossen.
