CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  grade INTEGER,
  class_num INTEGER,
  student_num INTEGER,
  gender TEXT,
  birth_date TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS continents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  population INTEGER,
  area_km2 INTEGER,
  country_count INTEGER
);

CREATE TABLE IF NOT EXISTS countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  continent_id INTEGER REFERENCES continents(id),
  flag_image_url TEXT,
  map_image_url TEXT,
  capital TEXT,
  population INTEGER,
  area_km2 INTEGER,
  language TEXT,
  description TEXT,
  is_featured INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  country_id INTEGER REFERENCES countries(id),
  added_at TEXT DEFAULT (datetime('now')),
  immigration_passed INTEGER DEFAULT 0,
  immigration_passed_at TEXT
);

CREATE TABLE IF NOT EXISTS travel_info (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  country_id INTEGER REFERENCES countries(id),
  flag_image_url TEXT,
  map_image_url TEXT,
  user_note TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workbooks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  country_id INTEGER REFERENCES countries(id),
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
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  country_id INTEGER REFERENCES countries(id),
  created_at TEXT DEFAULT (datetime('now'))
);
