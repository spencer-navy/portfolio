# Marketing Analytics SQL Documentation

This directory contains production-ready SQL for the marketing analytics portfolio project, demonstrating advanced PostgreSQL capabilities for data analysis and business intelligence.

## Database Schema

**Normalized relational design** optimized for:
- Multi-channel marketing campaign tracking (paid search, social, display, email, affiliate)
- Customer acquisition attribution and segmentation
- Transaction history for lifetime value calculation
- A/B test result analysis
- Real-time performance metrics aggregation

See `schema.sql` for complete DDL with indexes and constraints.

## Custom Functions

Advanced PostgreSQL functions showcasing complex business logic:

### `calculate_channel_metrics(start_date, end_date)`
Calculates comprehensive marketing performance metrics by channel:
- **ROAS** (Return on Ad Spend)
- **CAC** (Customer Acquisition Cost)
- **CTR** (Click-Through Rate)
- **Conversion Rate**

**Use case:** Daily performance dashboards, budget optimization

### `calculate_customer_ltv(customer_id)`
Computes total lifetime value for individual customers across all transactions.

**Use case:** Customer segmentation, retention analysis

### `cohort_retention_analysis(cohort_month)`
Monthly cohort analysis tracking:
- Customer acquisition by cohort
- Revenue by month (0-3 months post-acquisition)
- Retention rates over time

**Use case:** Product-market fit assessment, retention optimization

### `attribution_model_comparison(start_date, end_date)`
Compares three attribution models:
- **First-touch attribution**
- **Last-touch attribution**
- **Linear attribution**

**Use case:** Marketing mix optimization, channel investment decisions

## Query Examples

The `queries/` directory contains complex analytical queries demonstrating:
- Window functions for running totals and rankings
- Common Table Expressions (CTEs) for multi-step analysis
- Statistical aggregations for A/B test significance
- Time-series analysis with date functions
- Self-joins for customer journey mapping

## Technologies

- **Database:** PostgreSQL 15+ (via Supabase)
- **Query Language:** SQL (ANSI standard with PostgreSQL extensions)
- **Functions:** PL/pgSQL for stored procedures
- **Access:** REST API via Supabase client library

## Performance Considerations

- Indexed foreign keys for fast joins
- Composite unique constraints on time-series data
- Materialized views for expensive aggregations (future enhancement)
- Row-level security policies for safe public access