CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  grade INTEGER,
  class_num INTEGER,
  student_num INTEGER,
  gender TEXT,
  birth_date TEXT,
  created_at TEXT DEFAULT (CURRENT_TIMESTAMP::TEXT)
);

CREATE TABLE IF NOT EXISTS continents (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  population BIGINT,
  area_km2 BIGINT,
  country_count INTEGER
);

CREATE TABLE IF NOT EXISTS countries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  continent_id BIGINT REFERENCES continents(id),
  flag_image_url TEXT,
  map_image_url TEXT,
  capital TEXT,
  population BIGINT,
  area_km2 BIGINT,
  language TEXT,
  description TEXT,
  is_featured INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_countries (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  country_id BIGINT REFERENCES countries(id),
  added_at TEXT DEFAULT (CURRENT_TIMESTAMP::TEXT),
  immigration_passed INTEGER DEFAULT 0,
  immigration_passed_at TEXT
);

CREATE TABLE IF NOT EXISTS travel_info (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  country_id BIGINT REFERENCES countries(id),
  flag_image_url TEXT,
  map_image_url TEXT,
  user_note TEXT,
  created_at TEXT DEFAULT (CURRENT_TIMESTAMP::TEXT),
  updated_at TEXT DEFAULT (CURRENT_TIMESTAMP::TEXT)
);

CREATE TABLE IF NOT EXISTS workbooks (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  country_id BIGINT REFERENCES countries(id),
  overview TEXT,
  map_note TEXT,
  flag_note TEXT,
  traditional_clothing TEXT,
  traditional_food TEXT,
  traditional_house TEXT,
  completed INTEGER DEFAULT 0,
  completed_at TEXT
);

CREATE TABLE IF NOT EXISTS stamps (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  country_id BIGINT REFERENCES countries(id),
  created_at TEXT DEFAULT (CURRENT_TIMESTAMP::TEXT)
);
