#!/bin/bash
#
# Сглобява хиро видеото от официалния филм на E RIDE PRO.
#
# Пуска се само когато хиро кадърът трябва да се смени — иначе готовите файлове
# в `public/videos` са достатъчни. Иска ffmpeg; на този Mac няма системен, затова
# по подразбиране взима `ffmpeg-static` през npx (~80 MB, сваля се еднократно):
#
#   bash scripts/build-hero-video.sh
#   FFMPEG=/път/до/ffmpeg bash scripts/build-hero-video.sh   # ако си имаш свой
#
# Източникът е хиро видеото на производителя (eridepro.nu, Shopify CDN):
# 3840x2160, 67 s, 24 fps, ~97 MB. Сваля се в `.cache/` (извън git).
#
# От целия филм използваме една сцена — прашният склон, 8.02–14.22 s — но
# подредена като A(11.72–14.22) + B(8.02–11.72), защото:
#   * A е четимият кадър (ездачът се спуска и се вижда) и затова е първи —
#     оттам излиза и постерът, докато B започва с почти черна прахова мъгла;
#   * B свършва точно там, където A започва (11.72 s) → повторението на клипа
#     пада върху собствен кадър на филма и е безшевно без никакъв трик.
# Единствената изкуствена връзка е A→B и е покрита с 0.4 s преливане.
#
# Внимание при смяна: файловете задължително получават НОВИ имена (кешът на
# Cloudflare държи /videos/* една седмица), а постерът трябва да остане точно
# първият кадър на широкото видео, иначе смяната постер→видео се вижда.
set -euo pipefail

cd "$(dirname "$0")/.."
CACHE=.cache
SRC=$CACHE/eride-official-film.mp4
SRC_URL=https://cdn.shopify.com/videos/c/o/v/d86493b7b03a4fd7bf3f8f37eb799b86.mp4
OUT=$CACHE/hero
FFMPEG=${FFMPEG:-}

mkdir -p "$OUT"

if [ -z "$FFMPEG" ]; then
  npm ls ffmpeg-static >/dev/null 2>&1 || npm i --no-save ffmpeg-static
  FFMPEG=$(node -p "require('ffmpeg-static')")
fi

if [ ! -f "$SRC" ]; then
  echo "Свалям изходния филм (~97 MB)…"
  curl -sL --fail -A "Mozilla/5.0" "$SRC_URL" -o "$SRC"
fi

# Кадърът е контражур и над него сайтът слага плат от 0.9 надолу — суровият клип
# излизаше на екрана около 20 от 255, тоест почти черен. Затова сенките се вдигат
# тук, а не с CSS филтър върху видеото (филтърът яде кадри на телефон).
# Градацията се прилага върху 4K източника, преди смаляването: така смаляването
# служи и за dithering и прахът не се разслоява на ленти.
GRADE="curves=all='0/0.05 0.25/0.38 0.6/0.68 1/1',eq=saturation=1.06"

# build <име> <crop филтър или ""> <ширина> <височина> <crf>
build() {
  local name=$1 crop=$2 w=$3 h=$4 crf=$5
  # флаговете на scale са първи: в zsh „$h:flags" се тълкува като модификатор
  local vf="$GRADE,${crop:+$crop,}scale=flags=lanczos:w=$w:h=$h"

  "$FFMPEG" -v error -y -ss 11.72 -t 2.50 -i "$SRC" -an -vf "$vf" \
      -c:v libx264 -crf 15 -preset medium -pix_fmt yuv420p "$OUT/$name-a.mp4"
  "$FFMPEG" -v error -y -ss 8.02 -t 3.70 -i "$SRC" -an -vf "$vf" \
      -c:v libx264 -crf 15 -preset medium -pix_fmt yuv420p "$OUT/$name-b.mp4"

  "$FFMPEG" -v error -y -i "$OUT/$name-a.mp4" -i "$OUT/$name-b.mp4" \
      -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.4:offset=2.10,format=yuv420p[v]" \
      -map "[v]" -an -c:v libx264 -crf "$crf" -preset slow -profile:v high -g 48 \
      -movflags +faststart "$OUT/$name.mp4"
  rm "$OUT/$name-a.mp4" "$OUT/$name-b.mp4"
  printf "%-30s %6s KB\n" "$name.mp4" "$(( $(stat -f%z "$OUT/$name.mp4") / 1024 ))"
}

# Широкият кадър — десктоп.
build hero-eride-dust-v2 "" 1600 900 29
# Портретният — телефон. Изрязваме 9:16 около ездача; x=1505 го държи в средата
# през целия клип, а телефонният екран е още по-тесен и реже още по 9% от двете
# страни, тоест центрирането не е излишно.
build hero-eride-dust-v2-portrait "crop=1215:2160:1505:0" 720 1280 32

# Постерът е точно първият кадър на широкото видео — значи минава през същата
# градация. Без нея постерът е тъмен, видеото светло и смяната се вижда.
"$FFMPEG" -v error -y -ss 11.72 -i "$SRC" -frames:v 1 \
    -vf "$GRADE,scale=flags=lanczos:w=1600:h=900" -q:v 3 "$OUT/hero-poster-eride-dust-v2.jpg"
printf "%-30s %6s KB\n" "hero-poster-eride-dust-v2.jpg" "$(( $(stat -f%z "$OUT/hero-poster-eride-dust-v2.jpg") / 1024 ))"

echo
echo "Готово в $OUT. Копирането е ръчно, за да не се презапише живото видео случайно:"
echo "  cp $OUT/*.mp4 public/videos/"
echo "  cp $OUT/hero-poster-eride-dust-v2.jpg public/images/kasta/"
