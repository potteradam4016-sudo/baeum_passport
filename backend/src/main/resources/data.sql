INSERT INTO continents (id, name, color, population, area_km2, country_count)
VALUES
  (1, U&'\C544\C2DC\C544', '#4f75d6', 4700000000, 44580000, 49),
  (2, U&'\C720\B7FD', '#4f75d6', 740000000, 10180000, 44),
  (3, U&'\C544\D504\B9AC\CE74', '#4f75d6', 1400000000, 30370000, 54),
  (4, U&'\BD81\C544\BA54\B9AC\CE74', '#4f75d6', 600000000, 24710000, 23),
  (5, U&'\B0A8\C544\BA54\B9AC\CE74', '#4f75d6', 440000000, 17840000, 12),
  (6, U&'\C624\C138\C544\B2C8\C544', '#4f75d6', 45000000, 8520000, 14)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  color = EXCLUDED.color,
  population = EXCLUDED.population,
  area_km2 = EXCLUDED.area_km2,
  country_count = EXCLUDED.country_count;

INSERT INTO countries (
  id, name, continent_id, flag_image_url, population, area_km2, is_featured, color
)
VALUES
  (1, U&'\B300\D55C\BBFC\AD6D', 1, 'https://flagcdn.com/w320/kr.png', 51000000, 100000, 1, '#3156a3'),
  (2, U&'\C77C\BCF8', 1, 'https://flagcdn.com/w320/jp.png', 120000000, 370000, 1, '#b43b4a'),
  (3, U&'\C911\AD6D', 1, 'https://flagcdn.com/w320/cn.png', 1400000000, 9600000, 1, '#c7473d'),
  (4, U&'\C601\AD6D', 2, 'https://flagcdn.com/w320/gb.png', 68000000, 240000, 1, '#3953a4'),
  (5, U&'\D504\B791\C2A4', 2, 'https://flagcdn.com/w320/fr.png', 68000000, 640000, 1, '#4267b2'),
  (6, U&'\B3C5\C77C', 2, 'https://flagcdn.com/w320/de.png', 84000000, 350000, 1, '#7a6536'),
  (7, U&'\C774\C9D1\D2B8', 3, 'https://flagcdn.com/w320/eg.png', 110000000, 1000000, 1, '#c5912d'),
  (8, U&'\BBF8\AD6D', 4, 'https://flagcdn.com/w320/us.png', 330000000, 9830000, 1, '#b43b4a'),
  (9, U&'\BA55\C2DC\CF54', 4, 'https://flagcdn.com/w320/mx.png', 130000000, 1960000, 1, '#288657'),
  (10, U&'\BE0C\B77C\C9C8', 5, 'https://flagcdn.com/w320/br.png', 210000000, 8510000, 1, '#1e9b57'),
  (11, U&'\D638\C8FC', 6, 'https://flagcdn.com/w320/au.png', 26000000, 7690000, 1, '#1c8d8a')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  continent_id = EXCLUDED.continent_id,
  flag_image_url = EXCLUDED.flag_image_url,
  population = EXCLUDED.population,
  area_km2 = EXCLUDED.area_km2,
  is_featured = EXCLUDED.is_featured,
  color = EXCLUDED.color;

SELECT setval('continents_id_seq', (SELECT MAX(id) FROM continents));
SELECT setval('countries_id_seq', (SELECT MAX(id) FROM countries));
