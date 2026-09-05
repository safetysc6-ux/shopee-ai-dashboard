CREATE INDEX IF NOT EXISTS idx_trend_snapshots_date
ON trend_snapshots(snapshot_date DESC);

CREATE INDEX IF NOT EXISTS idx_trend_products_queue
ON trend_products(queue, updated_at DESC);
