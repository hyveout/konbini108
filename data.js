// Konbini 108 — Product catalog & member data
// Every product carries a `tags: [...]` array — one entry per member who likes it.
// The match algorithm sums a member's tag hits across all cart items; highest wins.

// Cache-bust version — bump this when member photos are updated so browsers
// fetch fresh copies instead of serving old cached placeholders.
const _PV = '?v=2';

window.MEMBERS = [
  { id: 'mizuki',  name: 'MIZUKI',  jp: 'ミズキ',   color: '#FF3D7F', photo: 'assets/members/mizuki.jpg'  + _PV },
  { id: 'neo',     name: 'NEO',     jp: 'ネオ',     color: '#A78BFA', photo: 'assets/members/neo.jpg'     + _PV },
  { id: 'reia',    name: 'REIA',    jp: 'レイア',   color: '#FB7185', photo: 'assets/members/reia.jpg'    + _PV },
  { id: 'ryota',   name: 'RYOTA',   jp: 'リョウタ', color: '#FFD60A', photo: 'assets/members/ryota.jpg'   + _PV },
  { id: 'souma',   name: 'SOUMA',   jp: 'ソウマ',   color: '#34D399', photo: 'assets/members/souma.jpg'   + _PV },
  { id: 'takeru',  name: 'TAKERU',  jp: 'タケル',   color: '#2DD4BF', photo: 'assets/members/takeru.jpg'  + _PV },
  { id: 'tsubasa', name: 'TSUBASA', jp: 'ツバサ',   color: '#E63946', photo: 'assets/members/tsubasa.jpg' + _PV },
  { id: 'yuga',    name: 'YUGA',    jp: 'ユウガ',   color: '#60A5FA', photo: 'assets/members/yuga.jpg'    + _PV },
];

// Categories grouped by real konbini logic.
window.CATEGORIES = [
  { id: 'rice',       en: 'RICE & ONIGIRI',   jp: 'おにぎり・ごはん',  icon: '\u{1F359}' },
  { id: 'bento',      en: 'BENTO & BOWLS',    jp: 'べんとう・丼',      icon: '\u{1F371}' },
  { id: 'deli',       en: 'DELI & PROTEIN',   jp: 'デリ・プロテイン',  icon: '\u{1F957}' },
  { id: 'hotfood',    en: 'HOT FOOD',         jp: 'ホットスナック',    icon: '\u{1F357}' },
  { id: 'noodles',    en: 'NOODLES',          jp: 'めん',              icon: '\u{1F35C}' },
  { id: 'bakery',     en: 'BAKERY',           jp: 'パン',              icon: '\u{1F35E}' },
  { id: 'snacks',     en: 'SNACKS',           jp: 'おかし',            icon: '\u{1F36B}' },
  { id: 'sweets',     en: 'SWEETS & JELLY',   jp: 'スイーツ',          icon: '\u{1F368}' },
  { id: 'drinks',     en: 'DRINKS',           jp: 'のみもの',          icon: '\u{1F964}' },
  { id: 'dairy',      en: 'DAIRY',            jp: '乳製品',            icon: '\u{1F95B}' },
  { id: 'pantry',     en: 'PANTRY & CANNED',  jp: 'かんづめ・その他',  icon: '\u{1F96B}' },
  { id: 'household',  en: 'DAILY GOODS',      jp: '日用品',            icon: '\u{1F9FB}' },
];

// PRODUCTS — every unique favorite from the members' authoritative lists.
// `tags: [...]` = every member who scores a point when this item is in the cart.
// Empty `tags: []` = background inventory (no match value, keeps the store feeling stocked).
window.PRODUCTS = [
  // ============ RICE & ONIGIRI ============
  { id:'r01', cat:'rice', en:'RICE BALL',             jp:'おにぎり',              price:158, tags:['mizuki'],           emoji:'\u{1F359}' },
  { id:'r02', cat:'rice', en:'SALMON RICE BALL',      jp:'鮭ごはん',              price:198, tags:[],                   emoji:'\u{1F363}' },
  { id:'r03', cat:'rice', en:'SALMON / TUNA MAYO',    jp:'おにぎり (鮭・ツナマヨ)', price:168, tags:['neo'],              emoji:'\u{1F363}' },
  { id:'r04', cat:'rice', en:'SALTED RICE BALL',      jp:'塩むすび',              price:138, tags:['ryota'],            emoji:'\u{1F35A}' },
  { id:'r05', cat:'rice', en:'RICE BALL W/ EGG+SOY',  jp:'卵醤油のおにぎり',      price:168, tags:['takeru'],           emoji:'\u{1F359}\u{1F95A}' },
  { id:'r06', cat:'rice', en:'SPICY COD RICE BALL',   jp:'明太子おにぎり',        price:188, tags:['souma'],            emoji:'\u{1F359}\u{1F41F}' },
  { id:'r07', cat:'rice', en:'GRILLED RICE BALL',     jp:'焼おにぎり',            price:158, tags:['souma'],            emoji:'\u{1F359}' },

  // ============ BENTO & BOWLS ============
  { id:'b01', cat:'bento', en:'BEEF RICE BOWL',       jp:'牛丼',                  price:498, tags:['reia'],             emoji:'\u{1F35A}' },
  { id:'b02', cat:'bento', en:'CHICKEN & EGG BOWL',   jp:'親子丼',                price:528, tags:['reia'],             emoji:'\u{1F414}\u{1F95A}' },
  { id:'b03', cat:'bento', en:'DUMPLING BOWL',        jp:'餃子丼',                price:498, tags:[],                   emoji:'\u{1F95F}' },

  // ============ DELI & PROTEIN ============
  { id:'e01', cat:'deli', en:'CHICKEN BREAST',        jp:'サラダチキン',          price:328, tags:['mizuki','neo','takeru'], emoji:'\u{1F357}' },
  { id:'e02', cat:'deli', en:'BOILED EGG',            jp:'ゆで卵',                price:98,  tags:['neo','ryota'],       emoji:'\u{1F95A}' },
  { id:'e03', cat:'deli', en:'SALAD',                 jp:'サラダ',                price:298, tags:['mizuki','tsubasa'], emoji:'\u{1F957}' },
  { id:'e04', cat:'deli', en:'POTATO SALAD',          jp:'ポテトサラダ',          price:198, tags:['ryota'],            emoji:'\u{1F954}' },
  { id:'e05', cat:'deli', en:'VEGETABLE STICKS',      jp:'野菜スティック',        price:198, tags:[],                   emoji:'\u{1F955}' },
  { id:'e06', cat:'deli', en:'PROSCIUTTO',            jp:'生ハム',                price:398, tags:['souma'],            emoji:'\u{1F356}' },

  // ============ HOT FOOD ============
  { id:'h01', cat:'hotfood', en:'FRIED CHICKEN',      jp:'揚げ鶏',                price:298, tags:['neo','takeru','tsubasa'], emoji:'\u{1F357}' },
  { id:'h02', cat:'hotfood', en:'CROQUETTE',          jp:'コロッケ',              price:158, tags:['ryota'],            emoji:'\u{1F954}' },
  { id:'h03', cat:'hotfood', en:'CORN DOG',           jp:'アメリカンドッグ',      price:198, tags:['reia','tsubasa'],   emoji:'\u{1F32D}' },
  { id:'h04', cat:'hotfood', en:'FRIED CHICKEN SKEWER',jp:'唐揚げ棒',             price:218, tags:['ryota'],            emoji:'\u{1F356}' },
  { id:'h05', cat:'hotfood', en:'CHICKEN GIZZARDS',   jp:'砂ずりポン酢',          price:298, tags:['yuga'],             emoji:'\u{1F357}' },
  { id:'h06', cat:'hotfood', en:'STEAMED MEAT BUN',   jp:'肉まん',                price:198, tags:['neo'],              emoji:'\u{1F959}' },

  // ============ NOODLES ============
  { id:'n01', cat:'noodles', en:'INSTANT CUP NOODLES',jp:'カップラーメン',        price:238, tags:['mizuki','tsubasa'], emoji:'\u{1F35C}' },
  { id:'n02', cat:'noodles', en:'SOBA NOODLES',       jp:'そば',                  price:398, tags:['mizuki'],           emoji:'\u{1F35C}' },

  // ============ BAKERY ============
  { id:'k01', cat:'bakery', en:'MELON BREAD',         jp:'メロンパン',            price:198, tags:['takeru'],           emoji:'\u{1F35E}\u{1F348}' },
  { id:'k02', cat:'bakery', en:'BREAD',               jp:'パン',                  price:158, tags:['tsubasa'],          emoji:'\u{1F35E}' },

  // ============ SNACKS ============
  { id:'s01', cat:'snacks', en:'GUMMY CANDY',         jp:'グミ',                  price:158, tags:['neo'],              emoji:'\u{1F36C}' },
  { id:'s02', cat:'snacks', en:'CHEWING GUM',         jp:'ガム',                  price:120, tags:['neo'],              emoji:'\u{1F36C}' },
  { id:'s03', cat:'snacks', en:'PEANUT RICE CRACKER', jp:'ピーナッツ入りお煎餅',  price:198, tags:['takeru'],           emoji:'\u{1F95C}' },
  { id:'s04', cat:'snacks', en:'SEAWEED RICE CRACKER',jp:'焼おにぎりに海苔の煎餅', price:198, tags:[],                   emoji:'\u{1F33F}' },
  { id:'s05', cat:'snacks', en:'SHRIMP RICE CRACKER', jp:'えびせん',              price:198, tags:['takeru'],           emoji:'\u{1F364}' },
  { id:'s07', cat:'snacks', en:'CHOCOLATE BAR',       jp:'チョコレートバー',      price:158, tags:['ryota'],            emoji:'\u{1F36B}' },
  { id:'s08', cat:'snacks', en:'BREATH MINTS',        jp:'清涼タブレット',        price:180, tags:['yuga'],             emoji:'\u2744\uFE0F' },
  { id:'s09', cat:'snacks', en:'DRIED KELP SNACK',    jp:'おしゃぶり昆布',        price:198, tags:['yuga'],             emoji:'\u{1F33F}' },

  // ============ SWEETS & JELLY ============
  { id:'w01', cat:'sweets', en:'DORAYAKI',            jp:'どら焼き (小豆パンケーキ)',price:188, tags:['mizuki'],           emoji:'\u{1F95E}' },
  { id:'w02', cat:'sweets', en:'ALMOND JELLY',        jp:'杏仁豆腐',              price:198, tags:['reia'],             emoji:'\u{1F36E}' },
  { id:'w03', cat:'sweets', en:'ICE CREAM',           jp:'アイスクリーム',        price:268, tags:['reia','takeru'],    emoji:'\u{1F366}' },
  { id:'w04', cat:'sweets', en:'COFFEE JELLY',        jp:'コーヒーゼリー',        price:188, tags:['reia'],             emoji:'\u{1F36E}' },
  { id:'w05', cat:'sweets', en:'COOKIES',             jp:'クッキー',              price:228, tags:['reia'],             emoji:'\u{1F36A}' },
  { id:'w06', cat:'sweets', en:'SHERBET',             jp:'シャーベットアイス',    price:238, tags:['reia'],             emoji:'\u{1F366}' },
  { id:'w08', cat:'sweets', en:'CHOCOLATE JELLY',     jp:'チョコレートゼリー',    price:178, tags:['reia'],             emoji:'\u{1F36E}' },
  { id:'w09', cat:'sweets', en:'RICE DUMPLINGS',      jp:'団子',                  price:198, tags:['souma'],            emoji:'\u{1F95F}' },
  { id:'w10', cat:'sweets', en:'MANDARIN JELLY',      jp:'みかんゼリー',          price:158, tags:['yuga'],             emoji:'\u{1F34A}' },
  { id:'w11', cat:'sweets', en:'CHOCO BANANA',        jp:'チョコバナナ',          price:280, tags:['yuga'],             emoji:'\u{1F34C}' },
  { id:'w12', cat:'sweets', en:'STRAWBERRY POCKY',    jp:'ポッキー',              price:178, tags:[],                   emoji:'\u{1F353}' },

  // ============ DRINKS ============
  { id:'d01', cat:'drinks', en:'BLACK COFFEE',        jp:'ブラックコーヒー',      price:130, tags:['neo'],              emoji:'\u2615' },
  { id:'d02', cat:'drinks', en:'CAFÉ LATTE',          jp:'カフェラテ',            price:180, tags:['yuga'],             emoji:'\u2615' },
  { id:'d03', cat:'drinks', en:'PROTEIN DRINK',       jp:'プロテイン',            price:220, tags:['mizuki','souma'],   emoji:'\u{1F4AA}' },
  { id:'d04', cat:'drinks', en:'BOTTLED WATER',       jp:'水',                    price:110, tags:['mizuki','tsubasa','yuga'], emoji:'\u{1F4A7}' },
  { id:'d05', cat:'drinks', en:'ENERGY DRINK',        jp:'エナジードリンク',      price:248, tags:['mizuki','takeru'],  emoji:'\u26A1' },
  { id:'d06', cat:'drinks', en:'ORANGE JUICE',        jp:'オレンジジュース',      price:158, tags:['yuga'],             emoji:'\u{1F34A}' },
  { id:'d07', cat:'drinks', en:'VEGETABLE JUICE',     jp:'野菜ジュース',          price:158, tags:['ryota','souma'],    emoji:'\u{1F345}' },
  { id:'d08', cat:'drinks', en:'GREEN TEA',           jp:'お茶',                  price:138, tags:['takeru'],           emoji:'\u{1F375}' },
  { id:'d09', cat:'drinks', en:'BLACK TEA',           jp:'紅茶',                  price:158, tags:['takeru'],           emoji:'\u2615' },
  { id:'d10', cat:'drinks', en:'COLA',                jp:'コーラ',                price:158, tags:['reia','tsubasa'],  emoji:'\u{1F964}' },
  { id:'d11', cat:'drinks', en:'SMOOTHIE',            jp:'スムージー',            price:298, tags:['ryota'],            emoji:'\u{1F95B}' },
  { id:'d12', cat:'drinks', en:'ENERGY JELLY',        jp:'エナジーゼリー',        price:198, tags:['ryota'],            emoji:'\u26A1' },

  // ============ DAIRY ============
  { id:'y01', cat:'dairy', en:'YOGURT',               jp:'ヨーグルト',            price:158, tags:['neo','souma'],      emoji:'\u{1F95B}' },
  { id:'y02', cat:'dairy', en:'DRINKABLE YOGURT',     jp:'ヨーグルトドリンク',    price:168, tags:['souma'],            emoji:'\u{1F95B}' },
  { id:'y03', cat:'dairy', en:'PROBIOTIC DRINK',      jp:'乳酸菌飲料',            price:148, tags:['souma','tsubasa'], emoji:'\u{1F95B}' },
  { id:'y04', cat:'dairy', en:'ALOE YOGURT',          jp:'アロエヨーグルト',      price:198, tags:['yuga'],             emoji:'\u{1F95B}' },

  // ============ PANTRY & CANNED ============
  { id:'p01', cat:'pantry', en:'FERMENTED SOYBEANS',  jp:'納豆',                  price:128, tags:['ryota'],            emoji:'\u{1FAD8}' },
  { id:'p02', cat:'pantry', en:'CANNED MACKEREL',     jp:'さば缶',                price:288, tags:['neo'],              emoji:'\u{1F41F}' },

  // ============ DAILY GOODS ============
  { id:'g01', cat:'household', en:'HAIR TIE',         jp:'髪ゴム',                price:180, tags:['souma'],            emoji:'\u{1F380}' },
  { id:'g02', cat:'household', en:'RAZOR',            jp:'剃刀',                  price:298, tags:['souma'],            emoji:'\u{1FA92}' },
  { id:'g03', cat:'household', en:'TOILET PAPER',     jp:'トイレットペーパー',    price:398, tags:['tsubasa'],          emoji:'\u{1F9FB}' },
  { id:'g04', cat:'household', en:'BOX OF TISSUES',   jp:'ティッシュボックス',    price:298, tags:['tsubasa'],          emoji:'\u{1F92E}' },
  { id:'g05', cat:'household', en:'MANGA',            jp:'マンガ',                price:580, tags:['mizuki'],           emoji:'\u{1F4D6}' },
];

// Flavor lines for receipt footer
window.FLAVOR_LINES = [
  'THANK YOU FOR YOUR PATRONAGE !!',
  'PLEASE COME AGAIN \u2661',
  'HAVE A NICE DAY \u266A',
  'KONBINI 108 LOVES YOU',
  'OPEN 24 HOURS / 365 DAYS',
];

window.STORE_BRANCHES = ['SHIBUYA', 'SHINJUKU', 'HARAJUKU', 'NAKANO', 'KOENJI', 'SHIMOKITA'];
