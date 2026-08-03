-- ============================================================
-- HouseConnect Kenya — Admin Platform Settings Table
-- ============================================================
-- Stores platform-wide configuration (commission, docs, etc.)
-- ============================================================

CREATE TABLE IF NOT EXISTS platform_settings (
  id                INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  commission_rate   INTEGER DEFAULT 10,
  min_payout        INTEGER DEFAULT 1000,
  allowed_documents TEXT[] DEFAULT '{id_card, good_conduct, reference_letter, medical_report, other}',
  maintenance_mode  BOOLEAN DEFAULT false,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default row if empty
INSERT INTO platform_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;
