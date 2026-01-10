# Abigail Spencer - Data Analytics Portfolio

[![Live Site](https://img.shields.io/badge/Live-abigailspencer.dev-blue)](https://abigailspencer.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5)](https://linkedin.com/in/abigailspencer90)

Professional portfolio showcasing data analytics, SQL, and visualization skills for transitioning from federal geospatial intelligence work to private sector senior data analyst roles.

## 🎯 Overview

This portfolio demonstrates end-to-end data analytics capabilities through real-world marketing analytics projects, following industry-standard workflows:

1. **Acquire** - Database design and data collection
2. **Clean** - Data validation and transformation
3. **Analyze & Model** - Statistical analysis and predictive modeling
4. **Insights & Actions** - Business intelligence and recommendations

## 🚀 Featured Project: Multi-Channel Marketing Analytics

A comprehensive marketing campaign analysis system demonstrating skills required for senior marketing analytics roles at e-commerce companies.

### Business Problem
Evaluate marketing effectiveness across 5 channels (paid search, social, display, email, affiliate) to optimize ROAS, reduce CAC, and improve customer LTV through data-driven attribution modeling.

### Technical Implementation

**Database & Backend:**
- PostgreSQL 15+ (Supabase) with normalized relational schema
- Custom PL/pgSQL functions for ROAS, CAC, cohort analysis, and attribution modeling
- Row-level security for safe public data access
- Indexed queries optimized for performance

## 🔧 Backend Infrastructure

This website's analytics and ML features are powered by a separate data pipeline:
- **Repository:** [portfolio-analytics-pipeline](https://github.com/spencer-navy/portfolio-analytics-pipeline)
- **Features:** Automated ETL, user segmentation, recommendation engine
- **Stack:** Python, Docker, MongoDB, Redis, scikit-learn

**Data Analysis:**
- Python (pandas, scipy) for statistical analysis
- Marketing mix modeling and multi-touch attribution
- Customer segmentation and LTV calculation
- A/B test statistical significance testing

**Visualization & Frontend:**
- Tableau Public for executive dashboards
- Next.js/React for interactive web components
- Python (plotly/matplotlib) for analytical charts
- JavaScript (D3.js/Chart.js) for custom visualizations

### Key Metrics Analyzed
- **ROAS** (Return on Ad Spend) by channel
- **CAC** (Customer Acquisition Cost)
- **LTV** (Customer Lifetime Value)
- **CTR** (Click-Through Rate)
- **Conversion Rate**
- Cohort retention rates
- Attribution model comparisons (first-touch, last-touch, linear)

### SQL Capabilities Demonstrated

See [`sql/`](./sql/) directory for production-ready examples:

**Custom Functions:**
- `calculate_channel_metrics()` - Marketing performance aggregations
- `calculate_customer_ltv()` - Customer value calculation
- `cohort_retention_analysis()` - Monthly cohort tracking
- `attribution_model_comparison()` - Multi-touch attribution

**Advanced SQL Techniques:**
- Window functions for running totals and moving averages
- Common Table Expressions (CTEs) for multi-step analysis
- Statistical aggregations and percentiles
- Time-series analysis with date functions
- Complex JOINs and subqueries

## 🛠 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Recharts / D3.js

**Backend & Database:**
- PostgreSQL 15+
- Supabase (Database + Auto-generated REST API)
- PL/pgSQL for stored procedures

**Data Analysis:**
- Python 3.11+
  - pandas
  - numpy
  - scipy
  - scikit-learn
  - matplotlib
  - plotly

**Visualization:**
- Tableau Public
- Python visualization libraries
- JavaScript charting libraries

**Deployment:**
- Vercel (Frontend)
- Supabase (Database)

## 📊 Project Structure
```
abigailspencer.dev/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility functions and API clients
│   └── supabase.js        # Database client configuration
├── sql/                    # SQL documentation
│   ├── README.md          # SQL capabilities overview
│   ├── schema.sql         # Database schema with indexes
│   ├── security.sql       # Row-level security policies
│   ├── functions/         # Custom PL/pgSQL functions
│   └── queries/           # Complex analytical queries
├── public/                 # Static assets
└── scripts/               # Data generation and import scripts
```

## 🎓 Skills Demonstrated

**Data Analytics:**
- Marketing performance analysis
- Customer segmentation
- Cohort analysis and retention metrics
- A/B testing and statistical significance
- Attribution modeling
- Predictive analytics

**SQL & Database:**
- Relational database design
- Complex queries with JOINs, CTEs, window functions
- Custom functions and stored procedures
- Performance optimization with indexes
- Data security with RLS policies

**Programming:**
- Python for data manipulation and analysis
- JavaScript/TypeScript for web development
- API integration and data fetching
- Version control with Git

**Visualization & Communication:**
- Dashboard design for executive audiences
- Interactive data visualizations
- Clear documentation and technical writing
- Translating technical insights to business recommendations

## 🔗 Links

- **Live Site:** [abigailspencer.dev](https://abigailspencer.dev)
- **LinkedIn:** [Your LinkedIn](https://linkedin.com/in/abigailspencer90)
- **GitHub:** [Your GitHub](https://github.com/spencer-navy/portfolio)

## 📫 Contact

Interested in discussing data analytics opportunities? Reach out via [LinkedIn](https://linkedin.com/in/abigailspencer90) or [email](mailto:abigailspencer.dev@gmail.co..

---

## 💼 About

This portfolio was created by Abigail Spencer, a Geospatial Data Lead with 5+ years of experience in data analytics, SQL, Python, and production ML deployments. Currently transitioning from federal intelligence work to senior data analyst roles in e-commerce and technology companies.

**Professional Background:**
- National Geospatial-Intelligence Agency - Geospatial Data Lead for overhead satellite imagery
- Experience managing petabytes of data for AI/ML programs
- Strong background in Python, SQL, MLOps
- TS//SCI and CI Poly security clearances

**Education:**
- B.S. Criminal Justice (Completed)
- B.S. Data Science (In Progress - Dec 2026)
- Planning M.S. ML Engineering (Starting Jan 2027)

---

## 🔧 Development Setup

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/spencer-navy/portfolio.git
cd abigailspencer.dev
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📚 Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.