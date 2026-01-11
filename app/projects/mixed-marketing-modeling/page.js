'use client'

import { useEffect, useState, useRef } from 'react';
import Navigation from '../../../components/Navigation';
import styles from './MarketingMixModeling.module.css';
import { trackPageView, trackEvent } from '@/lib/trackEvent';

export default function MarketingMixModeling() {
    // Track page entry time for "time on page" calculation
    const entryTime = useRef(Date.now());
    
    // Track maximum scroll depth reached (0-100%)
    const [maxScrollDepth, setMaxScrollDepth] = useState(0);
    
    // Track which scroll milestones have been viewed (25%, 50%, 75%, 100%)
    const viewedSections = useRef(new Set());

    // Track page view when component mounts
    useEffect(() => {
        trackPageView({ 
            projectId: 'proj_marketing_01',
            projectTitle: 'Marketing Mix Modeling & Channel Attribution',
            page: 'project-detail'
        });
    }, []);

    // Track scroll depth and section visibility
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
            
            if (scrollDepth > maxScrollDepth) {
                setMaxScrollDepth(scrollDepth);
            }

            const milestones = [25, 50, 75, 100];
            milestones.forEach(milestone => {
                if (scrollDepth >= milestone && !viewedSections.current.has(milestone)) {
                    viewedSections.current.add(milestone);
                    trackEvent('scroll_milestone', {
                        projectId: 'proj_marketing_mmm',
                        milestone: `${milestone}%`,
                        scrollDepth: scrollDepth
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [maxScrollDepth]);

    // Track time on page when user leaves
    useEffect(() => {
        const handleBeforeUnload = () => {
            const timeOnPage = Math.round((Date.now() - entryTime.current) / 1000);
            
            const eventData = {
                eventType: 'page_exit',
                page: window.location.pathname,
                sessionId: sessionStorage.getItem('analytics_session_id'),
                metadata: {
                    projectId: 'proj_marketing_mmm',
                    timeOnPage: timeOnPage,
                    maxScrollDepth: maxScrollDepth
                }
            };
            
            const blob = new Blob([JSON.stringify(eventData)], {
                type: 'application/json'
            });
            
            navigator.sendBeacon('/api/events', blob);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [maxScrollDepth]);

    // Handle CTA button clicks
    const handleCTAClick = (ctaName, ctaUrl) => {
        trackEvent('cta_click', {
            projectId: 'proj_marketing_mmm',
            ctaName: ctaName,
            ctaUrl: ctaUrl,
            timeBeforeClick: Math.round((Date.now() - entryTime.current) / 1000)
        });
    };

    return (
        <>
            <Navigation />
            
            <main className={styles.main}>
                <div className={styles.container}>
                    
                    {/* ===== HERO SECTION ===== */}
                    <section className={styles.hero}>
                        <div className={styles.breadcrumb}>
                            <a href="/projects" className={styles.breadcrumbLink}>Projects</a>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span className={styles.breadcrumbCurrent}>Marketing Mix Modeling & Channel Attribution</span>
                        </div>
                        
                        <h1 className={styles.title}>Marketing Mix Modeling & Channel Attribution</h1>
                        
                        <p className={styles.subtitle}>
                            End-to-end marketing analytics demonstrating database design, feature engineering, statistical modeling, and budget optimization using Python, PostgreSQL, and advanced analytics techniques.
                        </p>
                        
                        <div className={styles.tags}>
                            <span className={styles.tag}>Python</span>
                            <span className={styles.tag}>PostgreSQL</span>
                            <span className={styles.tag}>Statistical Modeling</span>
                            <span className={styles.tag}>Marketing Analytics</span>
                            <span className={styles.tag}>Data Visualization</span>
                        </div>
                    </section>

                    {/* ===== PROJECT OVERVIEW ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Project Overview</h2>
                        
                        <div className={styles.keyMetrics}>
                            <div className={styles.metricCard}>
                                <div className={styles.metricValue}>$533K</div>
                                <div className={styles.metricLabel}>Total Marketing Spend</div>
                                <div className={styles.metricDetail}>Across 25 campaigns (2024)</div>
                            </div>
                            <div className={styles.metricCard}>
                                <div className={styles.metricValue}>$1.9M</div>
                                <div className={styles.metricLabel}>Revenue Generated</div>
                                <div className={styles.metricDetail}>From multi-channel campaigns</div>
                            </div>
                            <div className={styles.metricCard}>
                                <div className={styles.metricValue}>3.60x</div>
                                <div className={styles.metricLabel}>Overall ROAS</div>
                                <div className={styles.metricDetail}>Average across 5 channels</div>
                            </div>
                        </div>

                        <p className={styles.text}>
                            This project demonstrates end-to-end marketing analytics capabilities, from database design and data generation through exploratory analysis and predictive modeling. The goal is to answer: <strong>Which marketing channels deliver the highest incremental ROI, and how should budget be allocated to maximize return on ad spend?</strong>
                        </p>

                        <p className={styles.text}>
                            Using realistic synthetic data spanning 12 months of campaign performance across 5 channels (paid search, social, display, email, affiliate), I'm building a comprehensive Marketing Mix Modeling (MMM) analysis with attribution modeling, customer lifetime value analysis, and budget optimization recommendations.
                        </p>
                    </section>

                    {/* ===== DATA ARCHITECTURE ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Data Architecture & Pipeline</h2>
                        
                        <p className={styles.text}>
                            This project showcases production-ready data engineering and analytics workflows, from PostgreSQL database design through Python-based analysis pipelines.
                        </p>

                        <div className={styles.datasetSpecs}>
                            <h3 className={styles.subsectionTitle}>Database Architecture</h3>
                            
                            <div className={styles.specGrid}>
                                <div className={styles.specItem}>
                                    <strong>Database:</strong> PostgreSQL 15+ (Supabase)
                                </div>
                                <div className={styles.specItem}>
                                    <strong>Tables:</strong> 5 normalized tables
                                </div>
                                <div className={styles.specItem}>
                                    <strong>Records:</strong> 18,887 total records
                                </div>
                                <div className={styles.specItem}>
                                    <strong>Time Period:</strong> Full year 2024
                                </div>
                            </div>

                            <h4 className={styles.subsectionTitle}>Data Pipeline</h4>
                            <ul className={styles.list}>
                                <li><strong>Generation:</strong> Python script creates realistic synthetic marketing data with proper statistical properties (seasonality, carryover effects, diminishing returns)</li>
                                <li><strong>Storage:</strong> PostgreSQL database with foreign key constraints, indexes for performance, and row-level security</li>
                                <li><strong>Access:</strong> Python data acquisition module with Supabase client for queries</li>
                                <li><strong>Analysis:</strong> Jupyter notebooks for reproducible analysis workflows</li>
                            </ul>

                            <h4 className={styles.subsectionTitle}>Database Schema</h4>
                            <pre className={styles.codeBlock}>
{`-- 5 Core Tables

1. campaigns (25 records)
   - campaign_id, campaign_name, channel
   - start_date, end_date, budget
   - target_audience

2. daily_performance (1,544 records)
   - date, campaign_id
   - impressions, clicks, conversions
   - spend, revenue

3. customers (5,000 records)
   - customer_id, acquisition_date
   - campaign_id, channel
   - first_order_value, customer_segment

4. transactions (12,158 records)
   - transaction_id, customer_id
   - transaction_date, order_value
   - products_purchased, discount_applied

5. ab_tests (30 records)
   - test_id, campaign_id, variant
   - impressions, clicks, conversions
   - statistical_significance, p_value`}
                            </pre>

                            <h4 className={styles.subsectionTitle}>Custom SQL Functions</h4>
                            <p className={styles.text}>
                                Built production-ready PostgreSQL functions demonstrating advanced SQL capabilities:
                            </p>
                            <ul className={styles.list}>
                                <li><code>calculate_channel_metrics()</code> - Computes ROAS, CAC, CTR, conversion rate by channel and date range</li>
                                <li><code>calculate_customer_ltv()</code> - Calculates total lifetime value for individual customers</li>
                                <li><code>cohort_retention_analysis()</code> - Tracks cohort retention and revenue over time</li>
                                <li><code>attribution_model_comparison()</code> - Compares first-touch, last-touch, and linear attribution</li>
                            </ul>
                        </div>
                    </section>

                    {/* ===== ANALYSIS WORKFLOW ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Analysis Workflow</h2>
                        
                        <p className={styles.text}>
                            This project follows a structured data science methodology, with each phase documented in dedicated Jupyter notebooks:
                        </p>

                        <div className={styles.mmmSteps}>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>✓</div>
                                <div className={styles.stepContent}>
                                    <h4>01. Data Acquisition</h4>
                                    <p className={styles.text}>
                                        <strong>Status: Complete</strong>
                                    </p>
                                    <ul className={styles.list}>
                                        <li>Connected to PostgreSQL database via Supabase client</li>
                                        <li>Extracted all 5 tables with proper date parsing</li>
                                        <li>Validated data quality (no missing values, consistent foreign keys)</li>
                                        <li>Created enriched datasets joining campaigns with performance metrics</li>
                                        <li>Exported clean CSVs for analysis: 7 datasets ready for modeling</li>
                                    </ul>
                                    <div className={styles.metricHighlight}>
                                        <strong>Key Metrics Validated:</strong> $533K spend, $1.9M revenue, 3.60x overall ROAS
                                    </div>
                                </div>
                            </div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>✓</div>
                                <div className={styles.stepContent}>
                                    <h4>02. Data Cleaning & Feature Engineering</h4>
                                    <p className={styles.text}>
                                        <strong>Status: Complete</strong>
                                    </p>
                                    <ul className={styles.list}>
                                        <li>Calculated marketing metrics: CTR, CVR, CPC, ROAS, CAC, profit margin</li>
                                        <li>Engineered time-based features: day of week, month, quarter, season, weekend flags</li>
                                        <li>Computed customer LTV metrics: total value, purchase frequency, recency</li>
                                        <li>Created channel-level aggregations for performance comparison</li>
                                        <li>Detected outliers using IQR method across key metrics</li>
                                        <li>Built campaign-level summaries with efficiency scores</li>
                                    </ul>
                                    <div className={styles.metricHighlight}>
                                        <strong>Datasets Created:</strong> performance_features.csv, customer_features.csv, channel_summary.csv, campaign_performance.csv
                                    </div>
                                </div>
                            </div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>⏳</div>
                                <div className={styles.stepContent}>
                                    <h4>03. Exploratory Data Analysis</h4>
                                    <p className={styles.text}>
                                        <strong>Status: In Progress</strong>
                                    </p>
                                    <ul className={styles.list}>
                                        <li>Visualize channel performance trends and seasonality</li>
                                        <li>Analyze correlations between spend, impressions, and conversions</li>
                                        <li>Examine customer lifetime value distributions by channel</li>
                                        <li>Identify high-performing vs. underperforming campaigns</li>
                                        <li>Assess weekend vs. weekday performance patterns</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>📋</div>
                                <div className={styles.stepContent}>
                                    <h4>04. Channel Performance Analysis</h4>
                                    <p className={styles.text}>
                                        <strong>Status: Planned</strong>
                                    </p>
                                    <ul className={styles.list}>
                                        <li>Deep dive into ROAS, CAC, and efficiency by channel</li>
                                        <li>Identify saturation points and diminishing returns</li>
                                        <li>Compare channel performance across customer segments</li>
                                        <li>Analyze day-of-week and seasonal effects per channel</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>📋</div>
                                <div className={styles.stepContent}>
                                    <h4>05. Customer Segmentation</h4>
                                    <p className={styles.text}>
                                        <strong>Status: Planned</strong>
                                    </p>
                                    <ul className={styles.list}>
                                        <li>K-means clustering on LTV, purchase frequency, recency</li>
                                        <li>Identify high-value customer profiles</li>
                                        <li>Analyze which channels acquire the most valuable customers</li>
                                        <li>Build customer lifetime value prediction model</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>📋</div>
                                <div className={styles.stepContent}>
                                    <h4>06. Attribution Modeling</h4>
                                    <p className={styles.text}>
                                        <strong>Status: Planned</strong>
                                    </p>
                                    <ul className={styles.list}>
                                        <li>Implement multi-touch attribution models (first-touch, last-touch, linear, time-decay)</li>
                                        <li>Compare attribution results across methodologies</li>
                                        <li>Analyze multi-touchpoint customer journeys</li>
                                        <li>Quantify the impact of attribution choice on channel evaluation</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>📋</div>
                                <div className={styles.stepContent}>
                                    <h4>07. Marketing Mix Model & Optimization</h4>
                                    <p className={styles.text}>
                                        <strong>Status: Planned</strong>
                                    </p>
                                    <ul className={styles.list}>
                                        <li>Build regression-based MMM with adstock and saturation effects</li>
                                        <li>Quantify incremental ROAS by channel while controlling for seasonality</li>
                                        <li>Implement constrained optimization for budget allocation</li>
                                        <li>Generate business recommendations with projected revenue impact</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={styles.insight}>
                            <h3 className={styles.insightTitle}>🔧 Project Status</h3>
                            <p className={styles.text}>
                                <strong>Completed:</strong> Database architecture, data acquisition, feature engineering
                            </p>
                            <p className={styles.text}>
                                <strong>Next Steps:</strong> Exploratory data analysis with visualizations, followed by channel performance deep dive and customer segmentation modeling
                            </p>
                            <p className={styles.text}>
                                <strong>Timeline:</strong> Full analysis and optimization recommendations targeted for completion by mid-January 2026
                            </p>
                        </div>
                    </section>

                    {/* ===== KEY SKILLS DEMONSTRATED ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Skills Demonstrated</h2>
                        
                        <div className={styles.methodGrid}>
                            <div className={styles.methodCard}>
                                <div className={styles.methodNumber}>1</div>
                                <h3 className={styles.methodTitle}>Database Design & Engineering</h3>
                                <p className={styles.text}>
                                    Designed normalized PostgreSQL schema with proper foreign key relationships, indexes for query performance, and custom PL/pgSQL functions for business logic.
                                </p>
                                <div className={styles.methodTech}>
                                    <code>PostgreSQL</code>
                                    <code>Supabase</code>
                                    <code>PL/pgSQL</code>
                                    <code>Database Design</code>
                                </div>
                            </div>

                            <div className={styles.methodCard}>
                                <div className={styles.methodNumber}>2</div>
                                <h3 className={styles.methodTitle}>Data Engineering & ETL</h3>
                                <p className={styles.text}>
                                    Built Python data generation pipeline creating realistic synthetic marketing data with statistical properties. Implemented data import scripts and query modules for analysis workflows.
                                </p>
                                <div className={styles.methodTech}>
                                    <code>Python</code>
                                    <code>Pandas</code>
                                    <code>NumPy</code>
                                    <code>ETL Pipelines</code>
                                </div>
                            </div>

                            <div className={styles.methodCard}>
                                <div className={styles.methodNumber}>3</div>
                                <h3 className={styles.methodTitle}>Feature Engineering</h3>
                                <p className={styles.text}>
                                    Created marketing KPIs (ROAS, CAC, CTR, CVR), time-based features, customer LTV metrics, and outlier detection. Built analysis-ready datasets with 15+ engineered features.
                                </p>
                                <div className={styles.methodTech}>
                                    <code>Pandas</code>
                                    <code>Feature Engineering</code>
                                    <code>Domain Knowledge</code>
                                </div>
                            </div>

                            <div className={styles.methodCard}>
                                <div className={styles.methodNumber}>4</div>
                                <h3 className={styles.methodTitle}>Statistical Analysis</h3>
                                <p className={styles.text}>
                                    Applying regression modeling, attribution analysis, and optimization techniques. Building Marketing Mix Models to quantify incremental channel impact.
                                </p>
                                <div className={styles.methodTech}>
                                    <code>Statsmodels</code>
                                    <code>Scikit-learn</code>
                                    <code>SciPy</code>
                                    <code>Statistics</code>
                                </div>
                            </div>

                            <div className={styles.methodCard}>
                                <div className={styles.methodNumber}>5</div>
                                <h3 className={styles.methodTitle}>Data Visualization</h3>
                                <p className={styles.text}>
                                    Creating publication-quality charts and interactive dashboards to communicate insights to technical and business stakeholders.
                                </p>
                                <div className={styles.methodTech}>
                                    <code>Matplotlib</code>
                                    <code>Seaborn</code>
                                    <code>Plotly</code>
                                    <code>Tableau</code>
                                </div>
                            </div>

                            <div className={styles.methodCard}>
                                <div className={styles.methodNumber}>6</div>
                                <h3 className={styles.methodTitle}>Business Acumen</h3>
                                <p className={styles.text}>
                                    Translating complex analytics into actionable business recommendations. Understanding marketing metrics, customer behavior, and budget optimization strategies.
                                </p>
                                <div className={styles.methodTech}>
                                    <code>Marketing Analytics</code>
                                    <code>ROI Optimization</code>
                                    <code>Strategic Thinking</code>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== REPOSITORY & DOCUMENTATION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Repository & Technical Documentation</h2>
                        
                        <p className={styles.text}>
                            The complete project—including database schema, data generation scripts, Jupyter notebooks, and SQL functions—is available on GitHub.
                        </p>

                        <div className={styles.repoStructure}>
                            <h3 className={styles.subsectionTitle}>Project Structure</h3>
                            <pre className={styles.codeBlock}>
{`projects/mixed-marketing-modeling/
├── notebooks/
│   ├── 01_data_acquisition.ipynb        ✓ Complete
│   ├── 02_data_cleaning.ipynb           ✓ Complete
│   ├── 03_exploratory_analysis.ipynb    ⏳ In Progress
│   ├── 04_channel_performance.ipynb     📋 Planned
│   ├── 05_customer_segmentation.ipynb   📋 Planned
│   ├── 06_attribution_modeling.ipynb    📋 Planned
│   └── 07_mmm_optimization.ipynb        📋 Planned
├── src/
│   ├── data_acquisition.py              # Supabase query functions
│   ├── generate_marketing_data.py       # Synthetic data generation
│   └── import_to_supabase.py            # Database import script
├── data/
│   ├── campaigns.csv
│   ├── daily_performance.csv
│   ├── customers.csv
│   ├── transactions.csv
│   └── ab_tests.csv
├── outputs/
│   ├── campaigns_clean.csv
│   ├── performance_features.csv         # With engineered metrics
│   ├── customer_features.csv            # With LTV calculations
│   ├── channel_summary.csv
│   └── campaign_performance.csv
├── visualizations/                      # Generated charts (coming soon)
└── sql/                                 # At portfolio root
    ├── schema.sql                       # Database DDL
    ├── functions/
    │   └── marketing_analytics.sql      # Custom PL/pgSQL functions
    └── queries/
        ├── channel_performance.sql
        └── customer_ltv_analysis.sql`}
                            </pre>
                        </div>

                        <div className={styles.techStack}>
                            <h3 className={styles.subsectionTitle}>Technologies Used</h3>
                            <div className={styles.techGrid}>
                                <div className={styles.techCategory}>
                                    <h4>Database & Backend</h4>
                                    <ul>
                                        <li>PostgreSQL 15+</li>
                                        <li>Supabase (hosted database + REST API)</li>
                                        <li>PL/pgSQL for stored procedures</li>
                                        <li>Row-level security policies</li>
                                    </ul>
                                </div>
                                <div className={styles.techCategory}>
                                    <h4>Data Analysis</h4>
                                    <ul>
                                        <li>Python 3.11+</li>
                                        <li>Pandas & NumPy</li>
                                        <li>Scikit-learn</li>
                                        <li>SciPy (optimization)</li>
                                        <li>Statsmodels (regression)</li>
                                        <li>Jupyter Notebooks</li>
                                    </ul>
                                </div>
                                <div className={styles.techCategory}>
                                    <h4>Visualization</h4>
                                    <ul>
                                        <li>Matplotlib & Seaborn</li>
                                        <li>Plotly (interactive charts)</li>
                                        <li>Tableau Public (dashboards)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style={{textAlign: 'center', marginTop: '3rem'}}>
                            <a 
                                href="https://github.com/yourusername/portfolio" 
                                className={styles.button}
                                onClick={() => handleCTAClick('View Repository', 'https://github.com/yourusername/portfolio')}
                            >
                                View Full Repository on GitHub →
                            </a>
                        </div>
                    </section>

                    {/* ===== CLOSING CTA ===== */}
                    <section className={styles.section} style={{paddingTop: '3rem', paddingBottom: '4rem'}}>
                        <div className={styles.closingCTA}>
                            <h2 className={styles.sectionTitle} style={{marginBottom: '1rem'}}>
                                More Data Science Projects
                            </h2>
                            <p className={styles.text} style={{marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem'}}>
                                This MMM analysis demonstrates database design, feature engineering, statistical modeling, and business analytics. Explore more projects showcasing geospatial analysis, machine learning, and production deployments.
                            </p>
                            
                            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                                <a 
                                    href="/projects" 
                                    className={styles.button}
                                    onClick={() => handleCTAClick('View All Projects', '/projects')}
                                >
                                    ← View All Projects
                                </a>
                                <a 
                                    href="/contact" 
                                    className={styles.buttonSecondary}
                                    onClick={() => handleCTAClick('Get in Touch', '/contact')}
                                >
                                    Get in Touch
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}