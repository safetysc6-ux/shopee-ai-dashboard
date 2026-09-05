CREATE TABLE IF NOT EXISTS trend_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT DEFAULT '',
  price REAL DEFAULT 0,
  url TEXT DEFAULT '',
  commission REAL DEFAULT 0,
  queue INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trend_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id TEXT NOT NULL,
  snapshot_date TEXT NOT NULL,
  sales REAL DEFAULT 0,
  reviews REAL DEFAULT 0,
  videos REAL DEFAULT 0,
  captured_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(product_id, snapshot_date),
  FOREIGN KEY(product_id) REFERENCES trend_products(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_trend_snapshots_product_date
ON trend_snapshots(product_id, snapshot_date DESC);
