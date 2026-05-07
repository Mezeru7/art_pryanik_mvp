USE art_pryanik_db;

SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE product_images;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS=1;

INSERT INTO users (first_name, last_name, email, password_hash, role, created_at) VALUES
  ('Админ', 'Сайта', 'admin@artpryanik.ru', '$2a$10$5YNoxUoRgE3UfHnfxfvrj.dqooI1LSYDHrrno9RuVivHCO5xcVRhi', 'admin', NOW());

INSERT INTO categories (name) VALUES
  ('Праздники'),
  ('Узоры'),
  ('Цветы'),
  ('Персонажи');

INSERT INTO products (title, description, price, category_id, created_at) VALUES
(
  'Пряник "Сердце с цветами"',
  'Ручная роспись с цветочным узором делает каждый пряник уникальным.',
  350.00,
  (SELECT id FROM categories WHERE name = 'Цветы'),
  NOW()
),
(
  'Пряник "Сердце с голубым кружевом"',
  'Ручная роспись с нежным голубым кружевным узором придаёт каждому прянику утончённость и индивидуальность.\n\nИдеален для трогательных подарков и особых моментов, наполненных теплом.',
  320.00,
  (SELECT id FROM categories WHERE name = 'Цветы'),
  NOW()
),
(
  'Пряник "Цыплёнок в скорлупе"',
  'Забавный сюжет с цыплёнком в расписной скорлупе создаёт ощущение весеннего уюта и радости.\n\nОтличный выбор для подарка с улыбкой и добрым настроением.',
  300.00,
  (SELECT id FROM categories WHERE name = 'Праздники'),
  NOW()
),
(
  'Набор пряников "23 февраля"',
  'Праздничный набор с тематической росписью, посвящённый силе, мужеству и вниманию к важным датам.\n\nСоздан для тёплых поздравлений и особых мужских подарков.',
  700.00,
  (SELECT id FROM categories WHERE name = 'Праздники'),
  NOW()
),
(
  'Пряник "Пиксельный герой Стив"',
  'Яркий дизайн в стиле пиксельной графики вдохновлён культовым игровым персонажем.\n\nПонравится любителям игр и станет необычным сладким подарком.',
  280.00,
  (SELECT id FROM categories WHERE name = 'Персонажи'),
  NOW()
),
(
  'Пряник "Пиксельный крипер"',
  'Узнаваемый пиксельный образ добавляет прянику игривый и современный характер.\n\nИдеален для фанатов игр и оригинальных тематических сюрпризов.',
  280.00,
  (SELECT id FROM categories WHERE name = 'Персонажи'),
  NOW()
),
(
  'Пряник "Сани новогодние"',
  'Праздничная роспись с новогодними санями передаёт атмосферу зимней сказки и ожидания чуда.\n\nПрекрасный вариант для тёплых зимних подарков и праздничного стола.',
  450.00,
  (SELECT id FROM categories WHERE name = 'Праздники'),
  NOW()
),
(
  'Пряник "Кружевной узор (зелёный)"',
  'Изящная ручная роспись в зелёных тонах создаёт ощущение гармонии и природной свежести.\n\nПодходит для элегантных подарков с особым вниманием к деталям.',
  260.00,
  (SELECT id FROM categories WHERE name = 'Узоры'),
  NOW()
),
(
  'Пряник "Кружевной узор (голубой)"',
  'Нежный голубой орнамент придаёт прянику лёгкость и утончённый праздничный стиль.\n\nОтличный выбор для спокойных, душевных подарков.',
  260.00,
  (SELECT id FROM categories WHERE name = 'Узоры'),
  NOW()
),
(
  'Пряник "Сердце с бабочками"',
  'Воздушный дизайн с бабочками символизирует лёгкость, радость и тёплые чувства.\n\nСоздан для самых искренних и запоминающихся подарков.',
  350.00,
  (SELECT id FROM categories WHERE name = 'Цветы'),
  NOW()
);

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/heart_flowers.png'   FROM products WHERE title = 'Пряник "Сердце с цветами"';

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/heart_blue.png'      FROM products WHERE title = 'Пряник "Сердце с голубым кружевом"';

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/chicken_egg.png'     FROM products WHERE title = 'Пряник "Цыплёнок в скорлупе"';

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/feb23.png'           FROM products WHERE title = 'Набор пряников "23 февраля"';

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/steve.png'           FROM products WHERE title = 'Пряник "Пиксельный герой Стив"';

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/creeper.png'         FROM products WHERE title = 'Пряник "Пиксельный крипер"';

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/sleigh.png'          FROM products WHERE title = 'Пряник "Сани новогодние"';

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/circle_green.png'    FROM products WHERE title = 'Пряник "Кружевной узор (зелёный)"';

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/circle_blue.png'     FROM products WHERE title = 'Пряник "Кружевной узор (голубой)"';

INSERT INTO product_images (product_id, image_url)
SELECT id, '/assets/images/heart_butterfly.png' FROM products WHERE title = 'Пряник "Сердце с бабочками"';
