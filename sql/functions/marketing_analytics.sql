-- ============================================
-- CUSTOM SQL FUNCTIONS FOR MARKETING ANALYTICS
-- Demonstrates advanced SQL and business logic
-- ============================================

-- FUNCTION 1: Calculate ROAS and CAC by Channel
CREATE OR REPLACE FUNCTION calculate_channel_metrics(
  p_start_date DATE,
  p_end_date DATE
)
RETURNS TABLE (
  channel TEXT,
  total_spend NUMERIC,
  total_revenue NUMERIC,
  total_conversions BIGINT,
  roas NUMERIC,
  cac NUMERIC,
  ctr NUMERIC,
  conversion_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.channel::TEXT,
    SUM(dp.spend)::NUMERIC as total_spend,
    SUM(dp.revenue)::NUMERIC as total_revenue,
    SUM(dp.conversions)::BIGINT as total_conversions,
    ROUND(SUM(dp.revenue) / NULLIF(SUM(dp.spend), 0), 2)::NUMERIC as roas,
    ROUND(SUM(dp.spend) / NULLIF(SUM(dp.conversions), 0), 2)::NUMERIC as cac,
    ROUND((SUM(dp.clicks)::NUMERIC / NULLIF(SUM(dp.impressions), 0) * 100), 2)::NUMERIC as ctr,
    ROUND((SUM(dp.conversions)::NUMERIC / NULLIF(SUM(dp.clicks), 0) * 100), 2)::NUMERIC as conversion_rate
  FROM campaigns c
  JOIN daily_performance dp ON c.campaign_id = dp.campaign_id
  WHERE dp.date BETWEEN p_start_date AND p_end_date
  GROUP BY c.channel
  ORDER BY roas DESC;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 2: Calculate Customer Lifetime Value (LTV)
CREATE OR REPLACE FUNCTION calculate_customer_ltv(
  p_customer_id INTEGER
)
RETURNS NUMERIC AS $$
DECLARE
  total_value NUMERIC;
BEGIN
  SELECT COALESCE(SUM(order_value), 0)
  INTO total_value
  FROM transactions
  WHERE customer_id = p_customer_id;
  
  RETURN total_value;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 3: Cohort Analysis by Acquisition Month
CREATE OR REPLACE FUNCTION cohort_retention_analysis(
  p_cohort_month DATE
)
RETURNS TABLE (
  cohort_month DATE,
  customers_acquired BIGINT,
  month_0_revenue NUMERIC,
  month_1_revenue NUMERIC,
  month_2_revenue NUMERIC,
  month_3_revenue NUMERIC,
  retention_rate_month_1 NUMERIC,
  retention_rate_month_2 NUMERIC,
  retention_rate_month_3 NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH cohort AS (
    SELECT customer_id, DATE_TRUNC('month', acquisition_date) as cohort_date
    FROM customers
    WHERE DATE_TRUNC('month', acquisition_date) = DATE_TRUNC('month', p_cohort_month)
  ),
  monthly_revenue AS (
    SELECT 
      c.customer_id,
      DATE_TRUNC('month', t.transaction_date) as transaction_month,
      SUM(t.order_value) as revenue
    FROM cohort c
    JOIN transactions t ON c.customer_id = t.customer_id
    GROUP BY c.customer_id, DATE_TRUNC('month', t.transaction_date)
  )
  SELECT
    DATE_TRUNC('month', p_cohort_month)::DATE as cohort_month,
    COUNT(DISTINCT cohort.customer_id)::BIGINT as customers_acquired,
    COALESCE(SUM(CASE WHEN transaction_month = DATE_TRUNC('month', p_cohort_month) THEN revenue END), 0)::NUMERIC as month_0_revenue,
    COALESCE(SUM(CASE WHEN transaction_month = DATE_TRUNC('month', p_cohort_month) + INTERVAL '1 month' THEN revenue END), 0)::NUMERIC as month_1_revenue,
    COALESCE(SUM(CASE WHEN transaction_month = DATE_TRUNC('month', p_cohort_month) + INTERVAL '2 months' THEN revenue END), 0)::NUMERIC as month_2_revenue,
    COALESCE(SUM(CASE WHEN transaction_month = DATE_TRUNC('month', p_cohort_month) + INTERVAL '3 months' THEN revenue END), 0)::NUMERIC as month_3_revenue,
    ROUND((COUNT(DISTINCT CASE WHEN transaction_month = DATE_TRUNC('month', p_cohort_month) + INTERVAL '1 month' THEN monthly_revenue.customer_id END)::NUMERIC / 
      NULLIF(COUNT(DISTINCT cohort.customer_id), 0) * 100), 2)::NUMERIC as retention_rate_month_1,
    ROUND((COUNT(DISTINCT CASE WHEN transaction_month = DATE_TRUNC('month', p_cohort_month) + INTERVAL '2 months' THEN monthly_revenue.customer_id END)::NUMERIC / 
      NULLIF(COUNT(DISTINCT cohort.customer_id), 0) * 100), 2)::NUMERIC as retention_rate_month_2,
    ROUND((COUNT(DISTINCT CASE WHEN transaction_month = DATE_TRUNC('month', p_cohort_month) + INTERVAL '3 months' THEN monthly_revenue.customer_id END)::NUMERIC / 
      NULLIF(COUNT(DISTINCT cohort.customer_id), 0) * 100), 2)::NUMERIC as retention_rate_month_3
  FROM cohort
  LEFT JOIN monthly_revenue ON cohort.customer_id = monthly_revenue.customer_id
  GROUP BY DATE_TRUNC('month', p_cohort_month);
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 4: Marketing Attribution Model Comparison
CREATE OR REPLACE FUNCTION attribution_model_comparison(
  p_start_date DATE,
  p_end_date DATE
)
RETURNS TABLE (
  channel TEXT,
  first_touch_conversions BIGINT,
  last_touch_conversions BIGINT,
  linear_conversions NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH customer_journeys AS (
    SELECT 
      cu.customer_id,
      ARRAY_AGG(c.channel ORDER BY cu.acquisition_date) as channel_path,
      (ARRAY_AGG(c.channel ORDER BY cu.acquisition_date))[1] as first_touch_channel,
      (ARRAY_AGG(c.channel ORDER BY cu.acquisition_date DESC))[1] as last_touch_channel,
      COUNT(*) as touchpoints
    FROM customers cu
    JOIN campaigns c ON cu.campaign_id = c.campaign_id
    WHERE cu.acquisition_date BETWEEN p_start_date AND p_end_date
    GROUP BY cu.customer_id
  )
  SELECT 
    channels.channel::TEXT,
    COUNT(*) FILTER (WHERE first_touch_channel = channels.channel)::BIGINT as first_touch_conversions,
    COUNT(*) FILTER (WHERE last_touch_channel = channels.channel)::BIGINT as last_touch_conversions,
    SUM(1.0 / touchpoints) FILTER (WHERE channels.channel = ANY(channel_path))::NUMERIC as linear_conversions
  FROM customer_journeys
  CROSS JOIN (SELECT DISTINCT channel FROM campaigns) as channels
  GROUP BY channels.channel
  ORDER BY last_touch_conversions DESC;
END;
$$ LANGUAGE plpgsql;

-- Add function comments
COMMENT ON FUNCTION calculate_channel_metrics IS 'Calculate key marketing metrics (ROAS, CAC, CTR, conversion rate) by channel for date range';
COMMENT ON FUNCTION calculate_customer_ltv IS 'Calculate total lifetime value for a specific customer';
COMMENT ON FUNCTION cohort_retention_analysis IS 'Analyze revenue and retention by acquisition cohort month';
COMMENT ON FUNCTION attribution_model_comparison IS 'Compare first-touch, last-touch, and linear attribution models';