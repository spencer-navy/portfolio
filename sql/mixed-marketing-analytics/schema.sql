-- ============================================
-- MARKETING ANALYTICS DATABASE SCHEMA
-- Portfolio Project: Multi-Channel Campaign Analysis
-- Author: Abigail Spencer
-- Database: PostgreSQL 15+ (Supabase)
-- ============================================

-- ============================================
-- TABLE DEFINITIONS
-- ============================================

-- 1. CAMPAIGNS TABLE
CREATE TABLE campaigns (
  campaign_id SERIAL PRIMARY KEY,
  campaign_name VARCHAR(255) NOT NULL,
  channel VARCHAR(50) NOT NULL CHECK (channel IN ('paid_search', 'social', 'display', 'email', 'affiliate')),
  start_date DATE NOT NULL,
  end_date DATE,
  budget DECIMAL(12, 2) NOT NULL,
  target_audience VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. DAILY PERFORMANCE TABLE
CREATE TABLE daily_performance (
  performance_id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  campaign_id INTEGER REFERENCES campaigns(campaign_id) ON DELETE CASCADE,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  spend DECIMAL(10, 2) NOT NULL DEFAULT 0,
  revenue DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(date, campaign_id)
);

-- 3. CUSTOMERS TABLE
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  acquisition_date DATE NOT NULL,
  campaign_id INTEGER REFERENCES campaigns(campaign_id),
  channel VARCHAR(50) NOT NULL,
  first_order_value DECIMAL(10, 2) NOT NULL,
  customer_segment VARCHAR(50) CHECK (customer_segment IN ('high_value', 'medium_value', 'low_value', 'at_risk')),
  email_hash VARCHAR(64),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. TRANSACTIONS TABLE
CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(customer_id) ON DELETE CASCADE,
  transaction_date DATE NOT NULL,
  order_value DECIMAL(10, 2) NOT NULL,
  products_purchased INTEGER NOT NULL DEFAULT 1,
  discount_applied DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. AB TESTS TABLE
CREATE TABLE ab_tests (
  test_id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES campaigns(campaign_id),
  test_name VARCHAR(255) NOT NULL,
  variant VARCHAR(50) NOT NULL CHECK (variant IN ('control', 'variant_a', 'variant_b', 'variant_c')),
  start_date DATE NOT NULL,
  end_date DATE,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  statistical_significance BOOLEAN DEFAULT FALSE,
  p_value DECIMAL(5, 4),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_daily_perf_date ON daily_performance(date);
CREATE INDEX idx_daily_perf_campaign ON daily_performance(campaign_id);
CREATE INDEX idx_campaigns_channel ON campaigns(channel);
CREATE INDEX idx_customers_acquisition ON customers(acquisition_date);
CREATE INDEX idx_customers_campaign ON customers(campaign_id);
CREATE INDEX idx_transactions_customer ON transactions(customer_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_ab_tests_campaign ON ab_tests(campaign_id);

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE campaigns IS 'Marketing campaign master table tracking all campaigns across channels';
COMMENT ON TABLE daily_performance IS 'Daily aggregated metrics for each campaign';
COMMENT ON TABLE customers IS 'Customer acquisition records with first touch attribution';
COMMENT ON TABLE transactions IS 'All customer transactions for LTV calculation';
COMMENT ON TABLE ab_tests IS 'A/B test results for campaign optimization';

COMMENT ON COLUMN customers.email_hash IS 'SHA-256 hash of email for privacy-safe deduplication';
COMMENT ON COLUMN ab_tests.p_value IS 'Statistical significance p-value from two-proportion z-test';