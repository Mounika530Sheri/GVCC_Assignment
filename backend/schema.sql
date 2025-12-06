PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT,
  short_desc TEXT,
  long_desc TEXT,
  price REAL,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (name, category, short_desc, long_desc, price, image_url) VALUES
('Noise-Cancelling Headphones', 'Electronics', 'Wireless over-ear headphones', 'High-fidelity audio with active noise cancellation and 30-hour battery life.', 99.99, '/images/headphones.jpg'),
('Stainless Steel Water Bottle', 'Home', 'Keeps your drink cold or hot', 'Double-wall insulated bottle, 750ml capacity, leak-proof cap.', 19.50, '/images/bottle.jpg'),
('Modern Desk Lamp', 'Home', 'LED lamp with adjustable arm', 'Dimmable LED, touch controls, and USB charging port.', 29.99, '/images/lamp.jpg'),
('Paperback Notebook Set', 'Books', 'Set of 3 ruled notebooks', 'A5 size, 100 pages each, recycled paper.', 12.00, '/images/notebooks.jpg'),
('Portable Bluetooth Speaker', 'Electronics', 'Compact speaker with powerful sound', 'IPX5 water-resistant, 10-hour playback.', 49.90, '/images/speaker.jpg');