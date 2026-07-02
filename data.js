// Konbini 108 — Product catalog & member data
// Products are drawn from each member's real favorite-item list.
// Each product carries a hidden `tag` pointing to the member it belongs to.

window.MEMBERS = [
  { id: 'mizuki',  name: 'MIZUKI',  jp: 'ミズキ',   color: '#FF3D7F' },
  { id: 'neo',     name: 'NEO',     jp: 'ネオ',     color: '#A78BFA' },
  { id: 'reia',    name: 'REIA',    jp: 'レイア',   color: '#FB7185' },
  { id: 'ryota',   name: 'RYOTA',   jp: 'リョウタ', color: '#FFD60A' },
  { id: 'souma',   name: 'SOUMA',   jp: 'ソウマ',   color: '#34D399' },
  { id: 'takeru',  name: 'TAKERU',  jp: 'タケル',   color: '#2DD4BF' },
  { id: 'tsubasa', name: 'TSUBASA', jp: 'ツバサ',   color: '#E63946' },
  { id: 'yuga',    name: 'YUGA',    jp: 'ユウガ',   color: '#60A5FA' },
];

// Categories consolidated from members' favorites
window.CATEGORIES = [
  { id: 'onigiri',    en: 'RICE',        jp: 'おにぎり・ごはん', icon: '\u{1F359}' },
  { id: 'drinks',     en: 'DRINKS',      jp: 'のみもの',        icon: '\u{1F964}' },
  { id: 'snacks',     en: 'SNACKS',      jp: 'おかし',          icon: '\u{1F35F}' },
  { id: 'sweets',     en: 'SWEETS',      jp: 'スイーツ',        icon: '\u{1F36C}' },
  { id: 'hotfood',    en: 'HOT FOOD',    jp: 'ホットスナック',  icon: '\u{1F35C}' },
  { id: 'bento',      en: 'BENTO',       jp: 'べんとう',        icon: '\u{1F371}' },
  { id: 'dairy',      en: 'DAIRY',       jp: '乳製品',          icon: '\u{1F95B}' },
  { id: 'household',  en: 'HOUSEHOLD',   jp: 'ざっか',          icon: '\u{1F9FB}' },
];

// PRODUCTS — mostly drawn from the members' favorite lists.
// Each has a hidden `tag: 'memberid'` used for the match algorithm.
window.PRODUCTS = [
  // ===== RICE / ONIGIRI =====
  { id:'p01', cat:'onigiri', en:'ONIGIRI',                  jp:'おにぎり',              price:158, tag:'mizuki',  c1:'#0F1419', c2:'#F4E9D8', emoji:'\u{1F359}' },
  { id:'p02', cat:'onigiri', en:'SALMON / TUNA MAYO',       jp:'おにぎり (鮭・ツナマヨ)', price:168, tag:'mizuki',  c1:'#FB923C', c2:'#FFE4E6', emoji:'\u{1F35A}' },
  { id:'p03', cat:'onigiri', en:'SALTED RICE BALL',         jp:'塩むすび',              price:138, tag:'ryota',   c1:'#F4E9D8', c2:'#FEF3C7', emoji:'\u{1F35A}' },
  { id:'p04', cat:'onigiri', en:'RICE BALL W/ EGG & SOY',   jp:'卵醤油のおにぎり',      price:168, tag:'takeru',  c1:'#FCD34D', c2:'#FEF3C7', emoji:'\u{1F359}' },
  { id:'p05', cat:'onigiri', en:'SALMON RICE BALL',         jp:'鮭ごはん',              price:198, tag:'neo',     c1:'#FB923C', c2:'#FFEDD5', emoji:'\u{1F363}' },
  { id:'p06', cat:'onigiri', en:'SPICY COD RICE BALL',      jp:'明太子おにぎり',        price:188, tag:'souma',   c1:'#E63946', c2:'#FECACA', emoji:'\u{1F35A}' },
  { id:'p07', cat:'onigiri', en:'FERMENTED SOYBEANS',       jp:'納豆',                  price:128, tag:'ryota',   c1:'#92400E', c2:'#FEF3C7', emoji:'\u{1FAD8}' },

  // ===== DRINKS =====
  { id:'p10', cat:'drinks', en:'BLACK COFFEE',              jp:'ブラックコーヒー',      price:130, tag:'neo',     c1:'#0F1419', c2:'#FCD34D', emoji:'\u2615' },
  { id:'p11', cat:'drinks', en:'CAFÉ LATTE',                jp:'カフェラテ',            price:180, tag:'yuga',    c1:'#92400E', c2:'#FEF3C7', emoji:'\u2615' },
  { id:'p12', cat:'drinks', en:'PROTEIN DRINK',             jp:'プロテイン',            price:220, tag:'mizuki',  c1:'#FF3D7F', c2:'#FFE4E6', emoji:'\u{1F4AA}' },
  { id:'p13', cat:'drinks', en:'BOTTLED WATER',             jp:'水',                    price:110, tag:'mizuki',  c1:'#60A5FA', c2:'#DBEAFE', emoji:'\u{1F4A7}' },
  { id:'p14', cat:'drinks', en:'ENERGY DRINK',              jp:'エナジードリンク',      price:248, tag:'mizuki',  c1:'#FF3D7F', c2:'#0F1419', emoji:'\u26A1' },
  { id:'p15', cat:'drinks', en:'ORANGE JUICE',              jp:'オレンジジュース',      price:158, tag:'yuga',    c1:'#FB923C', c2:'#FFEDD5', emoji:'\u{1F34A}' },
  { id:'p16', cat:'drinks', en:'VEGETABLE JUICE',           jp:'野菜ジュース',          price:158, tag:'ryota',   c1:'#16A34A', c2:'#DCFCE7', emoji:'\u{1F345}' },
  { id:'p17', cat:'drinks', en:'GREEN TEA',                 jp:'お茶',                  price:138, tag:'takeru',  c1:'#16A34A', c2:'#F0FDF4', emoji:'\u{1F375}' },
  { id:'p18', cat:'drinks', en:'BLACK TEA',                 jp:'紅茶',                  price:158, tag:'takeru',  c1:'#92400E', c2:'#FEF3C7', emoji:'\u{1F375}' },
  { id:'p19', cat:'drinks', en:'COLA',                      jp:'コーラ',                price:158, tag:'takeru',  c1:'#0F1419', c2:'#E63946', emoji:'\u{1F964}' },
  { id:'p20', cat:'drinks', en:'SMOOTHIE',                  jp:'スムージー',            price:298, tag:'ryota',   c1:'#FB7185', c2:'#FFE4E6', emoji:'\u{1F95B}' },
  { id:'p21', cat:'drinks', en:'PROBIOTIC DRINK',           jp:'乳酸菌飲料',            price:148, tag:'souma',   c1:'#F4E9D8', c2:'#FEF3C7', emoji:'\u{1F95B}' },
  { id:'p22', cat:'drinks', en:'DRINKABLE YOGURT',          jp:'ヨーグルトドリンク',    price:168, tag:'ryota',   c1:'#F4E9D8', c2:'#FFE4E6', emoji:'\u{1F95B}' },

  // ===== SNACKS =====
  { id:'p30', cat:'snacks', en:'GUMMY CANDY',               jp:'グミ',                  price:158, tag:'neo',     c1:'#FB7185', c2:'#FFE4E6', emoji:'\u{1F36C}' },
  { id:'p31', cat:'snacks', en:'CHEWING GUM',               jp:'ガム',                  price:120, tag:'neo',     c1:'#60A5FA', c2:'#DBEAFE', emoji:'\u{1F36C}' },
  { id:'p32', cat:'snacks', en:'PEANUT RICE CRACKER',       jp:'ピーナッツ入りお煎餅',  price:198, tag:'souma',   c1:'#F59E0B', c2:'#FEF3C7', emoji:'\u{1F950}' },
  { id:'p33', cat:'snacks', en:'RICE CRACKERS',             jp:'おこげ煎餅',            price:228, tag:'souma',   c1:'#92400E', c2:'#FEF3C7', emoji:'\u{1F358}' },
  { id:'p34', cat:'snacks', en:'SHRIMP RICE CRACKERS',      jp:'えびせん',              price:198, tag:'takeru',  c1:'#FB923C', c2:'#FFEDD5', emoji:'\u{1F364}' },
  { id:'p35', cat:'snacks', en:'BOX OF TISSUES SNACK',      jp:'袋菓子',                price:158, tag:'yuga',    c1:'#FB7185', c2:'#FFE4E6', emoji:'\u{1F36B}' },
  { id:'p36', cat:'snacks', en:'BREATH MINTS',              jp:'清涼タブレット',        price:180, tag:'yuga',    c1:'#60A5FA', c2:'#DBEAFE', emoji:'\u2744\uFE0F' },
  { id:'p37', cat:'snacks', en:'INSTANT CUP NOODLES',       jp:'カップラーメン',        price:238, tag:'mizuki',  c1:'#E63946', c2:'#FEE2E2', emoji:'\u{1F35C}' },

  // ===== SWEETS =====
  { id:'p40', cat:'sweets', en:'DORAYAKI',                  jp:'どら焼き',              price:188, tag:'mizuki',  c1:'#92400E', c2:'#FEF3C7', emoji:'\u{1F950}' },
  { id:'p41', cat:'sweets', en:'CHOCOLATE CANDY',           jp:'チョコレート菓子',      price:198, tag:'yuga',    c1:'#78350F', c2:'#FEF3C7', emoji:'\u{1F36B}' },
  { id:'p42', cat:'sweets', en:'CHOCOLATE-COVERED BANANA',  jp:'チョコバナナ',          price:280, tag:'yuga',    c1:'#FBBF24', c2:'#FEF3C7', emoji:'\u{1F34C}' },
  { id:'p43', cat:'sweets', en:'ALMOND JELLY',              jp:'杏仁豆腐',              price:198, tag:'reia',    c1:'#F4E9D8', c2:'#FFE4E6', emoji:'\u{1F368}' },
  { id:'p44', cat:'sweets', en:'ICE CREAM',                 jp:'アイスクリーム',        price:268, tag:'reia',    c1:'#FB7185', c2:'#FFE4E6', emoji:'\u{1F366}' },
  { id:'p45', cat:'sweets', en:'CHOCOLATE JELLY',           jp:'チョコレートゼリー',    price:178, tag:'reia',    c1:'#78350F', c2:'#FEF3C7', emoji:'\u{1F36E}' },
  { id:'p46', cat:'sweets', en:'MANDARIN ORANGE JELLY',     jp:'みかんゼリー',          price:158, tag:'yuga',    c1:'#FB923C', c2:'#FFEDD5', emoji:'\u{1F34A}' },
  { id:'p47', cat:'sweets', en:'COFFEE JELLY',              jp:'コーヒーゼリー',        price:188, tag:'reia',    c1:'#0F1419', c2:'#FCD34D', emoji:'\u{1F36E}' },
  { id:'p48', cat:'sweets', en:'COOKIES',                   jp:'クッキー',              price:228, tag:'reia',    c1:'#F59E0B', c2:'#FEF3C7', emoji:'\u{1F36A}' },
  { id:'p49', cat:'sweets', en:'SHERBET',                   jp:'シャーベットアイス',    price:238, tag:'reia',    c1:'#FB7185', c2:'#FFE4E6', emoji:'\u{1F366}' },
  { id:'p50', cat:'sweets', en:'ENERGY JELLY',              jp:'エナジーゼリー',        price:198, tag:'ryota',   c1:'#FFD60A', c2:'#FEF3C7', emoji:'\u{1F36E}' },
  { id:'p51', cat:'sweets', en:'RICE DUMPLINGS',            jp:'団子',                  price:198, tag:'ryota',   c1:'#FB7185', c2:'#F0FDF4', emoji:'\u{1F361}' },
  { id:'p52', cat:'sweets', en:'MELON BREAD',               jp:'メロンパン',            price:198, tag:'takeru',  c1:'#34D399', c2:'#F0FDF4', emoji:'\u{1F35E}' },
  { id:'p53', cat:'sweets', en:'BREAD',                     jp:'パン',                  price:158, tag:'tsubasa', c1:'#F59E0B', c2:'#FEF3C7', emoji:'\u{1F35E}' },
  { id:'p54', cat:'sweets', en:'STEAMED MEAT BUN',          jp:'肉まん',                price:198, tag:'neo',     c1:'#F4E9D8', c2:'#FEF3C7', emoji:'\u{1F361}' },
  { id:'p55', cat:'sweets', en:'STRAWBERRY POCKY',          jp:'いちごポッキー',        price:178, tag:'reia',    c1:'#FB7185', c2:'#FFE4E6', emoji:'\u{1F353}' },

  // ===== HOT FOOD =====
  { id:'p60', cat:'hotfood', en:'FRIED CHICKEN',            jp:'チキン',                price:298, tag:'tsubasa', c1:'#F59E0B', c2:'#FEF3C7', emoji:'\u{1F357}' },
  { id:'p61', cat:'hotfood', en:'CHICKEN BREAST',           jp:'サラダチキン',          price:328, tag:'neo',     c1:'#F4E9D8', c2:'#FEF3C7', emoji:'\u{1F35F}' },
  { id:'p62', cat:'hotfood', en:'CORN DOG',                 jp:'アメリカンドッグ',      price:198, tag:'reia',    c1:'#F59E0B', c2:'#FEF3C7', emoji:'\u{1F32D}' },
  { id:'p63', cat:'hotfood', en:'FRIED MEAT',               jp:'揚げ物のお肉',          price:328, tag:'takeru',  c1:'#92400E', c2:'#FEF3C7', emoji:'\u{1F356}' },
  { id:'p64', cat:'hotfood', en:'FRIED CHICKEN SKEWER',     jp:'唐揚げ棒',              price:218, tag:'ryota',   c1:'#F59E0B', c2:'#FEF3C7', emoji:'\u{1F361}' },
  { id:'p65', cat:'hotfood', en:'CROQUETTE',                jp:'コロッケ',              price:158, tag:'ryota',   c1:'#F59E0B', c2:'#FEF3C7', emoji:'\u{1F954}' },
  { id:'p66', cat:'hotfood', en:'CHICKEN GIZZARDS',         jp:'砂ずりポン酢',          price:298, tag:'yuga',    c1:'#78350F', c2:'#FEF3C7', emoji:'\u{1F357}' },
  { id:'p67', cat:'hotfood', en:'PROSCIUTTO',               jp:'生ハム',                price:398, tag:'souma',   c1:'#FB7185', c2:'#FFE4E6', emoji:'\u{1F356}' },

  // ===== BENTO =====
  { id:'p70', cat:'bento', en:'POTATO SALAD',               jp:'ポテトサラダ',          price:198, tag:'ryota',   c1:'#FCD34D', c2:'#FEF3C7', emoji:'\u{1F954}' },
  { id:'p71', cat:'bento', en:'BEEF RICE BOWL',             jp:'牛丼',                  price:498, tag:'reia',    c1:'#92400E', c2:'#FEF3C7', emoji:'\u{1F35A}' },
  { id:'p72', cat:'bento', en:'CHICKEN AND EGG RICE BOWL',  jp:'親子丼',                price:528, tag:'reia',    c1:'#FCD34D', c2:'#FEF3C7', emoji:'\u{1F35B}' },
  { id:'p73', cat:'bento', en:'BOILED EGG',                 jp:'ゆで卵',                price:98,  tag:'neo',     c1:'#FCD34D', c2:'#FEF3C7', emoji:'\u{1F95A}' },
  { id:'p74', cat:'bento', en:'SOBA NOODLES',               jp:'そば',                  price:398, tag:'mizuki',  c1:'#78350F', c2:'#FEF3C7', emoji:'\u{1F35C}' },
  { id:'p75', cat:'bento', en:'HAIR TIE + RAZOR',           jp:'髪ゴム + 剃刀',         price:280, tag:'souma',   c1:'#0F1419', c2:'#F4E9D8', emoji:'\u{1FA92}' },
  { id:'p76', cat:'bento', en:'SALAD',                      jp:'サラダ',                price:298, tag:'tsubasa', c1:'#16A34A', c2:'#DCFCE7', emoji:'\u{1F957}' },
  { id:'p77', cat:'bento', en:'FRIED BREAD',                jp:'揚げパン',              price:198, tag:'neo',     c1:'#F59E0B', c2:'#FEF3C7', emoji:'\u{1F35E}' },
  { id:'p78', cat:'bento', en:'DUMPLINGS',                  jp:'餃子丼',                price:398, tag:'reia',    c1:'#F4E9D8', c2:'#FEF3C7', emoji:'\u{1F95F}' },
  { id:'p79', cat:'bento', en:'SEAWEED SNACK',              jp:'焼おにぎりに海苔の煎餅', price:198, tag:'souma',   c1:'#1E293B', c2:'#F0FDF4', emoji:'\u{1F359}' },

  // ===== DAIRY =====
  { id:'p80', cat:'dairy', en:'YOGURT',                     jp:'ヨーグルト',            price:158, tag:'neo',     c1:'#F4E9D8', c2:'#FFE4E6', emoji:'\u{1F95B}' },
  { id:'p81', cat:'dairy', en:'SEASONED YOGURT',            jp:'アロエヨーグルト',      price:198, tag:'yuga',    c1:'#34D399', c2:'#F0FDF4', emoji:'\u{1F95B}' },

  // ===== HOUSEHOLD =====
  { id:'p90', cat:'household', en:'TOILET PAPER',           jp:'トイレットペーパー',    price:398, tag:'takeru',  c1:'#F4E9D8', c2:'#FEF3C7', emoji:'\u{1F9FB}' },
  { id:'p91', cat:'household', en:'BOX OF TISSUES',         jp:'ティッシュボックス',    price:298, tag:'takeru',  c1:'#60A5FA', c2:'#DBEAFE', emoji:'\u{1F9FB}' },
  { id:'p92', cat:'household', en:'HAIR TIE',               jp:'髪ゴム',                price:180, tag:'souma',   c1:'#0F1419', c2:'#FFE4E6', emoji:'\u{1F380}' },
  { id:'p93', cat:'household', en:'RAZOR',                  jp:'剃刀',                  price:298, tag:'souma',   c1:'#60A5FA', c2:'#DBEAFE', emoji:'\u{1FA92}' },
  { id:'p94', cat:'household', en:'SEASONED DRIED KELP',    jp:'おしゃぶり昆布',        price:198, tag:'yuga',    c1:'#1E293B', c2:'#F0FDF4', emoji:'\u{1F958}' },
];

// Flavor lines for receipt
window.FLAVOR_LINES = [
  'THANK YOU FOR YOUR PATRONAGE !!',
  'PLEASE COME AGAIN \u2661',
  'HAVE A NICE DAY \u266A',
  'KONBINI 108 LOVES YOU',
  'OPEN 24 HOURS / 365 DAYS',
];

window.STORE_BRANCHES = ['SHIBUYA', 'SHINJUKU', 'HARAJUKU', 'NAKANO', 'KOENJI', 'SHIMOKITA'];
