# Миграция kastaventures.com → Cloudflare

## Изходно състояние (заснето 12.08.2026)

| | |
|---|---|
| Регистратор | **Namecheap** (акаунт `Fafloian4o`) — *не* Squarespace |
| В Squarespace | само „свързан" third-party домейн, provider: Namecheap |
| NS при регистратора | `connect1.squarespacedns.com`, `connect2.squarespacedns.com` |
| DNS вътре в зоната | NS1 — `dns1.p04.nsone.net` … `dns4.p04.nsone.net` |
| Хостинг на сайта | Squarespace (`server: Squarespace`) |
| Каноничен адрес сега | `www` (apex прави 301 → www) |
| Поща | **SuperHosting / host.bg** — не се пипа |

## Пълен DNS инвентар преди мигрирането

Снет от authoritative NS (`dig @dns1.p04.nsone.net`). AXFR е забранен, така че
поддомейните са проверени поименно.

| Тип | Име | Стойност | Съдба |
|---|---|---|---|
| A | `@` | `198.185.159.144`, `198.185.159.145`, `198.49.23.144`, `198.49.23.145` | **сменя се** → Cloudflare Pages |
| CNAME | `www` | `ext-sq.squarespace.com` | **сменя се** → 301 към apex |
| MX | `@` | `10 spamexpert01.host.bg`, `10 spamexpert02.host.bg` | **пренася се 1:1** |
| TXT | `@` | `v=spf1 +a +mx +ip4:185.80.2.88 +ip4:185.80.3.88 +include:smtp-out.spf.superhosting.bg +include:berlin.spf.superhosting.bg +include:_spf.superhosting.bg ~all` | **пренася се 1:1** |
| A | `mail` | `185.80.3.74` | **пренася се 1:1** (DNS only, сиво облаче) |
| A | `webmail` | `185.80.3.74` | **пренася се 1:1** (DNS only, сиво облаче) |
| A | `autodiscover` | `185.80.3.74` | **пренася се 1:1** (DNS only, сиво облаче) |

Няма: AAAA, CAA, SRV, DMARC, DKIM, wildcard.

> **DMARC липсва.** Не е част от миграцията, но е добре да се добави след нея.

## Каноничен адрес: apex

Кодът е изцяло apex-базиран — `<link rel="canonical">`, `og:url`, целият
`sitemap.xml` и `robots.txt` сочат `https://kastaventures.com` (74 срещания).
Затова новият сайт остава на apex, а `www` прави 301 към него — обратно на
това, което Squarespace правеше. Индексираните `www` адреси се пренасочват
коректно и Google пренася сигнала.

## Cloudflare

| | |
|---|---|
| Акаунт | `workdobromirjustpablo@gmail.com` — `f942413071538241ceeed8acd935c8f0` |
| Зона | `kastaventures.com`, план Free, DNS Setup: Full |
| Pages проект | `kasta` → **https://kasta-vr0.pages.dev** |
| Нови nameservers | `jack.ns.cloudflare.com`, `natasha.ns.cloudflare.com` |

При добавянето на зоната изключих **„Block training in robots.txt"** — Cloudflare
иначе подменя `robots.txt`, а проектният нарочно пуска GPTBot / ClaudeBot /
PerplexityBot. Managed robots.txt да си остане изключен.

Импортът хвана и 11-те записа. Ръчно свалих проксито на `mail`, `webmail` и
`autodiscover` на **DNS only** — през оранжевото облаче IMAP/SMTP не минават и
пощата щеше да падне.

## Ред на изпълнение

1. `_headers` + `_redirects` за Pages (`vercel.json` не важи там) ✅
2. Билд и деплой на `*.pages.dev` — проверка без домейна ✅
3. Зона в Cloudflare с **всички** записи от таблицата горе
4. Custom domain `kastaventures.com` + `www` към Pages проекта
5. Чак тогава: смяна на NS в Squarespace

Стъпка 5 е последна нарочно — докато NS сочат NS1, старият сайт работи и
миграцията е обратима по всяко време.

## ✅ Миграцията е завършена (12.08.2026)

Делегацията е при Cloudflare, сайтът се отдава от Pages, пощата не е мръднала.

`www` → apex **не** се прави от `_redirects` — Pages match-ва само път, не хост,
затова правилото там мълчеше и `www` връщаше 200 вместо 301. Пренасочването сега
е **Redirect Rule** на ниво зона (`https://www.*` → `https://${1}`, 301, с
включено *Preserve query string*, за да не се губят UTM параметрите от реклами).
При създаването му Cloudflare предупреждава, че `www` уж не е проксиран — фалшива
тревога, записът е на Pages; избира се „Ignore and deploy rule anyway".

## Деплой — автоматичен от GitHub (12.08.2026)

Pages проектът `kasta` е вързан за `DobromirPurvanov/kasta`, клон `main`.
Всяко пушване тръгва само:

| | |
|---|---|
| Build command | `npm run build` (дърпа и `prebuild` → sitemap-а) |
| Build output | `dist` |
| Production branch | `main` |
| Automatic deployments | Enabled |

`.node-version` фиксира Node 22, защото Vite 7 иска `^20.19 \|\| >=22.12`, а
подразбирането на Cloudflare се мени във времето.

Ръчният път остава валиден, ако потрябва:
`npx wrangler pages deploy dist --project-name kasta`

## Поща — одит и поправки (12.08.2026)

Сайтът няма сървърна форма, само `mailto:office@kastaventures.com`, тоест цялата
изходяща поща тръгва от SuperHosting. Това прави поправките по-долу безрискови.

### Поправено

**SPF — махнат `+a`.** Регресия от самата миграция: `+a` оторизира IP-тата от
apex A записа, а те вече сочеха **Cloudflare** (`104.21.63.160`,
`172.67.171.12`) — споделени anycast адреси, които домейнът не контролира.
Преди миграцията сочеха Squarespace. Всичко останало в записа е дума по дума
същото:

```
v=spf1 +mx +ip4:185.80.2.88 +ip4:185.80.3.88 +include:smtp-out.spf.superhosting.bg +include:berlin.spf.superhosting.bg +include:_spf.superhosting.bg ~all
```

**DMARC — добавен.** Липсваше изцяло:

```
_dmarc  TXT  v=DMARC1; p=none; adkim=r; aspf=r; fo=1
```

`p=none` е нарочно — наблюдение без риск за доставимостта. Затягане до
`quarantine`/`reject` има смисъл едва след DKIM и след като се види, че нищо
легитимно не пада.

### Остава (иска външно действие)

- **DKIM липсва.** Ключът се вади от cPanel-а на SuperHosting и се публикува
  като `<selector>._domainkey`. Без него DMARC alignment стъпва само на SPF и
  всяко препращане на писмо чупи проверката.
- **DMARC отчети (`rua=`)** — нарочно не е сложен, за да не залива работеща
  кутия с ежедневен XML. Добавя се веднага щом се посочи кутия за целта.
- `_spf.superhosting.bg` е `v=spf1 -all`, тоест include, който никога не съвпада.
  Оставен нарочно — ако SuperHosting го напълнят с IP-та, ще важи автоматично.

### Останало по сайта (не блокира нищо)

- **Меките 404**. `/* /index.html 200` връща 200 за несъществуващи адреси и
  React Router рисува NotFound от страна на браузъра. Това е присъщо на SPA-то
  (същото беше и на Vercel), но Google може да индексира несъществуващи URL-и.

## Стъпка 5 — ръчна, в Namecheap

Domain List → `kastaventures.com` → **MANAGE** → секция **NAMESERVERS**
(остава на `Custom DNS`). Двете полета се заменят с:

```
jack.ns.cloudflare.com
natasha.ns.cloudflare.com
```

и се натиска зелената отметка вдясно. Старите `connect1/connect2.squarespacedns.com`
отпадат.

След това зоната в Cloudflare минава в `Active` (минути до няколко часа) и чак
тогава Pages пуска закачането на домейна.

## Стъпка 6 — след активацията

Cloudflare Pages → проект `kasta` → Custom domains → добавя се `kastaventures.com`
и после `www.kastaventures.com`. Това подменя четирите Squarespace A записа и
`www` CNAME-а. Чак в този момент посетителят вижда новия сайт.

## Проверка след превключване

```sh
dig +short NS kastaventures.com          # трябва да са Cloudflare
dig +short MX kastaventures.com          # ЗАДЪЛЖИТЕЛНО пак host.bg
dig +short A mail.kastaventures.com      # 185.80.3.74
curl -sI https://kastaventures.com       # 200, server: cloudflare
curl -sI https://www.kastaventures.com   # 301 → apex
```
