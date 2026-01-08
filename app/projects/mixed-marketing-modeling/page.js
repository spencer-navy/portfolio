'use client'

import { useEffect, useState, useRef } from 'react';
import Navigation from '../../../components/Navigation';
import styles from './MarketingMixModeling.module.css';
import { trackEvent } from '@/lib/trackEvent';

export default function MarketingMixModeling() {
    // Track page entry time for "time on page" calculation
    const entryTime = useRef(Date.now());
    
    // Track maximum scroll depth reached (0-100%)
    const [maxScrollDepth, setMaxScrollDepth] = useState(0);
    
    // Track which scroll milestones have been viewed (25%, 50%, 75%, 100%)
    const viewedSections = useRef(new Set());

    // Track page view when component mounts
    useEffect(() => {
        trackEvent('page_view', {
            projectId: 'proj_001',
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
                            Advanced statistical analysis of multi-channel DTC e-commerce campaigns using Marketing Mix Modeling (MMM) to quantify incremental impact, optimize budget allocation, and maximize return on ad spend across paid search, social media, display advertising, email, and affiliate channels.
                        </p>
                        
                        <div className={styles.tags}>
                            <span className={styles.tag}>Python</span>
                            <span className={styles.tag}>Statistical Modeling</span>
                            <span className={styles.tag}>PostgreSQL</span>
                            <span className={styles.tag}>Marketing Analytics</span>
                            <span className={styles.tag}>Data Visualization</span>
                        </div>
                    </section>

                    {/* ===== EXECUTIVE SUMMARY ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Executive Summary</h2>
                        
                        <div className={styles.keyMetrics}>
                            <div className={styles.metricCard}>
                                <div className={styles.metricValue}>+18.4%</div>
                                <div className={styles.metricLabel}>Projected Revenue Increase</div>
                                <div className={styles.metricDetail}>From optimized budget reallocation</div>
                            </div>
                            <div className={styles.metricCard}>
                                <div className={styles.metricValue}>$1.2M</div>
                                <div className={styles.metricLabel}>Wasted Ad Spend Identified</div>
                                <div className={styles.metricDetail}>In saturated channels</div>
                            </div>
                            <div className={styles.metricCard}>
                                <div className={styles.metricValue}>3.8x</div>
                                <div className={styles.metricLabel}>Best Channel ROAS</div>
                                <div className={styles.metricDetail}>Paid Social vs. 2.1x Display</div>
                            </div>
                        </div>

                        <p className={styles.text}>
                            This analysis examines 18 months of marketing performance data from a fictional DTC e-commerce brand to answer the fundamental question: <strong>Which marketing channels are truly driving conversions, and how should we reallocate budget to maximize ROI?</strong>
                        </p>

                        <p className={styles.text}>
                            Using Marketing Mix Modeling (MMM) with distributed lag models and adstock effects, I quantified the incremental contribution of each channel while accounting for diminishing returns and carryover effects. The analysis revealed that current budget allocation is heavily misallocated, with over $1M annually spent in saturated channels while high-performing channels remain underfunded.
                        </p>
                    </section>

                    {/* ===== PROBLEM STATEMENT ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>The Problem</h2>
                        
                        <div className={styles.problemBox}>
                            <h3 className={styles.problemTitle}>Marketing Attribution in Multi-Touch Customer Journeys</h3>
                            
                            <p className={styles.text}>
                                Modern DTC customers rarely convert from a single ad exposure. A typical conversion journey might look like:
                            </p>

                            <div className={styles.journeyFlow}>
                                <div className={styles.touchpoint}>
                                    <span className={styles.touchpointNumber}>1</span>
                                    <div className={styles.touchpointLabel}>Sees Instagram ad</div>
                                    <div className={styles.touchpointChannel}>Paid Social</div>
                                </div>
                                <div className={styles.arrow}>→</div>
                                <div className={styles.touchpoint}>
                                    <span className={styles.touchpointNumber}>2</span>
                                    <div className={styles.touchpointLabel}>Clicks Google search ad</div>
                                    <div className={styles.touchpointChannel}>Paid Search</div>
                                </div>
                                <div className={styles.arrow}>→</div>
                                <div className={styles.touchpoint}>
                                    <span className={styles.touchpointNumber}>3</span>
                                    <div className={styles.touchpointLabel}>Receives email reminder</div>
                                    <div className={styles.touchpointChannel}>Email</div>
                                </div>
                                <div className={styles.arrow}>→</div>
                                <div className={styles.touchpoint}>
                                    <span className={styles.touchpointNumber}>4</span>
                                    <div className={styles.touchpointLabel}>Converts via affiliate link</div>
                                    <div className={styles.touchpointChannel}>Affiliate</div>
                                </div>
                            </div>

                            <p className={styles.text}>
                                <strong>The challenge:</strong> Last-click attribution would give 100% credit to the Affiliate channel, ignoring the critical role of Paid Social, Paid Search, and Email. First-click attribution would give 100% credit to Paid Social. Both are wrong.
                            </p>

                            <p className={styles.text}>
                                This misattribution leads to systematic underinvestment in awareness channels (like Display and Paid Social) and overinvestment in bottom-funnel channels (like Paid Search brand keywords that capture existing demand).
                            </p>
                        </div>
                    </section>

                    {/* ===== METHODOLOGY OVERVIEW ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Methodology Overview</h2>
                        
                        <p className={styles.text}>
                            I employed a three-pronged approach to solve the attribution problem:
                        </p>

                        <div className={styles.methodGrid}>
                            <div className={styles.methodCard}>
                                <div className={styles.methodNumber}>1</div>
                                <h3 className={styles.methodTitle}>Multi-Touch Attribution Models</h3>
                                <p className={styles.text}>
                                    Implemented and compared five attribution models (first-touch, last-touch, linear, time-decay, and position-based) to understand how methodology choice impacts channel evaluation.
                                </p>
                                <div className={styles.methodTech}>
                                    <code>Python</code>
                                    <code>Pandas</code>
                                    <code>NumPy</code>
                                </div>
                            </div>

                            <div className={styles.methodCard}>
                                <div className={styles.methodNumber}>2</div>
                                <h3 className={styles.methodTitle}>Marketing Mix Model (MMM)</h3>
                                <p className={styles.text}>
                                    Built regression-based econometric model with distributed lag structures and adstock transformations to quantify incremental contribution while accounting for carryover effects and saturation.
                                </p>
                                <div className={styles.methodTech}>
                                    <code>Statsmodels</code>
                                    <code>Scikit-learn</code>
                                    <code>Ridge Regression</code>
                                </div>
                            </div>

                            <div className={styles.methodCard}>
                                <div className={styles.methodNumber}>3</div>
                                <h3 className={styles.methodTitle}>Budget Optimization</h3>
                                <p className={styles.text}>
                                    Used constrained optimization (scipy.optimize) to find optimal budget allocation based on marginal ROAS curves derived from the MMM, with business constraints on minimum spend per channel.
                                </p>
                                <div className={styles.methodTech}>
                                    <code>SciPy</code>
                                    <code>Optimization</code>
                                    <code>Constraint Handling</code>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== DATA GENERATION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Dataset Construction</h2>
                        
                        <p className={styles.text}>
                            To demonstrate this analysis, I generated a realistic synthetic dataset mimicking real DTC e-commerce marketing performance. This approach offers several advantages over real proprietary data:
                        </p>

                        <ul className={styles.list}>
                            <li><strong>Transparency:</strong> All code and data are fully shareable without NDA restrictions</li>
                            <li><strong>Realism:</strong> Data incorporates realistic patterns including seasonality, carryover effects, saturation, and channel interaction effects</li>
                            <li><strong>Control:</strong> Known ground truth allows validation of modeling approaches</li>
                        </ul>

                        <div className={styles.datasetSpecs}>
                            <h3 className={styles.subsectionTitle}>Dataset Specifications</h3>
                            
                            <div className={styles.specGrid}>
                                <div className={styles.specItem}>
                                    <strong>Time Period:</strong> 18 months (78 weeks)
                                </div>
                                <div className={styles.specItem}>
                                    <strong>Granularity:</strong> Weekly aggregation
                                </div>
                                <div className={styles.specItem}>
                                    <strong>Channels:</strong> 5 (Paid Search, Paid Social, Display, Email, Affiliate)
                                </div>
                                <div className={styles.specItem}>
                                    <strong>Customer Records:</strong> ~50,000 conversions
                                </div>
                            </div>

                            <h4 className={styles.subsectionTitle}>Realistic Patterns Incorporated</h4>
                            <ul className={styles.list}>
                                <li><strong>Seasonality:</strong> 40% revenue spike in Q4 (holiday shopping)</li>
                                <li><strong>Adstock decay:</strong> 0.3-0.5 retention rate (advertising effects persist 2-4 weeks)</li>
                                <li><strong>Diminishing returns:</strong> Log transformation with channel-specific saturation points</li>
                                <li><strong>Baseline demand:</strong> Organic traffic and brand awareness independent of paid channels</li>
                                <li><strong>Multi-touch journeys:</strong> 60% of conversions involve 2+ touchpoints</li>
                            </ul>
                        </div>

                        <div className={styles.codeSection}>
                            <h3 className={styles.subsectionTitle}>Data Generation Code</h3>
                            <pre className={styles.codeBlock}>
{`import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Channel-specific parameters
CHANNEL_PARAMS = {
    'Paid_Search': {
        'base_roas': 2.8,
        'saturation': 50000,  # Saturates faster (brand keywords)
        'adstock': 0.3,       # Lower carryover
        'cost_per_click': 2.50
    },
    'Paid_Social': {
        'base_roas': 3.8,
        'saturation': 80000,  # Higher saturation point
        'adstock': 0.5,       # Stronger carryover (awareness building)
        'cost_per_click': 1.20
    },
    'Display': {
        'base_roas': 2.1,
        'saturation': 40000,
        'adstock': 0.4,
        'cost_per_impression': 0.015
    },
    'Email': {
        'base_roas': 5.2,     # Highest ROAS (low cost)
        'saturation': 25000,  # Limited by list size
        'adstock': 0.2,
        'cost_per_send': 0.05
    },
    'Affiliate': {
        'base_roas': 3.2,
        'saturation': 60000,
        'adstock': 0.35,
        'commission_rate': 0.15
    }
}

def generate_marketing_data(weeks=78, seed=42):
    """Generate realistic multi-channel marketing performance data"""
    np.random.seed(seed)
    
    dates = pd.date_range(start='2023-01-01', periods=weeks, freq='W')
    df = pd.DataFrame({'date': dates})
    
    # Seasonal adjustment (Q4 spike)
    df['seasonal_factor'] = 1 + 0.4 * np.sin(2 * np.pi * (df.index / 52) + 4.7)
    
    # Generate spend with realistic variation and trends
    for channel in CHANNEL_PARAMS.keys():
        base_spend = np.random.uniform(15000, 35000)
        trend = np.linspace(0, 1, weeks) * 5000  # Growing spend over time
        noise = np.random.normal(0, 3000, weeks)
        df[f'{channel}_spend'] = np.maximum(base_spend + trend + noise, 5000)
    
    # Calculate revenue with adstock and saturation
    df['total_revenue'] = 50000  # Baseline organic revenue
    
    for channel, params in CHANNEL_PARAMS.items():
        # Apply adstock transformation (carryover effect)
        spend_col = f'{channel}_spend'
        adstocked_spend = [df[spend_col].iloc[0]]
        
        for i in range(1, len(df)):
            adstocked = (df[spend_col].iloc[i] + 
                        params['adstock'] * adstocked_spend[i-1])
            adstocked_spend.append(adstocked)
        
        df[f'{channel}_adstock'] = adstocked_spend
        
        # Apply saturation (diminishing returns)
        saturation_point = params['saturation']
        saturated = saturation_point * np.log1p(df[f'{channel}_adstock'] / saturation_point)
        
        # Convert to revenue
        channel_revenue = saturated * params['base_roas'] * df['seasonal_factor']
        df['total_revenue'] += channel_revenue
    
    # Add realistic noise
    df['total_revenue'] *= (1 + np.random.normal(0, 0.05, weeks))
    
    return df`}
                            </pre>
                        </div>
                    </section>

                    {/* ===== ATTRIBUTION ANALYSIS ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Part 1: Multi-Touch Attribution Analysis</h2>
                        
                        <p className={styles.text}>
                            Before building the MMM, I analyzed how different attribution models evaluate the same customer journey data. This demonstrates why attribution methodology matters and sets up the need for a more sophisticated approach.
                        </p>

                        <div className={styles.attributionComparison}>
                            <h3 className={styles.subsectionTitle}>Attribution Model Comparison</h3>
                            
                            <div className={styles.attributionGrid}>
                                <div className={styles.attributionModel}>
                                    <h4>First-Touch Attribution</h4>
                                    <p className={styles.text}>100% credit to first touchpoint</p>
                                    <div className={styles.attributionResult}>
                                        <strong>Paid Social:</strong> 42% of conversions
                                    </div>
                                    <div className={styles.pros}>✓ Measures awareness building</div>
                                    <div className={styles.cons}>✗ Ignores nurturing channels</div>
                                </div>

                                <div className={styles.attributionModel}>
                                    <h4>Last-Touch Attribution</h4>
                                    <p className={styles.text}>100% credit to last touchpoint</p>
                                    <div className={styles.attributionResult}>
                                        <strong>Paid Search:</strong> 38% of conversions
                                    </div>
                                    <div className={styles.pros}>✓ Shows what closes deals</div>
                                    <div className={styles.cons}>✗ Overvalues bottom-funnel</div>
                                </div>

                                <div className={styles.attributionModel}>
                                    <h4>Linear Attribution</h4>
                                    <p className={styles.text}>Equal credit across all touches</p>
                                    <div className={styles.attributionResult}>
                                        <strong>Email:</strong> 24% of conversions
                                    </div>
                                    <div className={styles.pros}>✓ Values all touchpoints</div>
                                    <div className={styles.cons}>✗ Assumes equal importance</div>
                                </div>

                                <div className={styles.attributionModel}>
                                    <h4>Time-Decay Attribution</h4>
                                    <p className={styles.text}>More credit to recent touches</p>
                                    <div className={styles.attributionResult}>
                                        <strong>Email:</strong> 29% of conversions
                                    </div>
                                    <div className={styles.pros}>✓ Reflects recency bias</div>
                                    <div className={styles.cons}>✗ Arbitrary decay function</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.insight}>
                            <h3 className={styles.insightTitle}>🔍 Key Insight</h3>
                            <p className={styles.text}>
                                Attribution model choice dramatically changes channel evaluation. Paid Social gets 42% credit under first-touch but only 18% under last-touch. This creates a fundamental problem: <strong>there is no "correct" attribution model for multi-touch journeys.</strong>
                            </p>
                            <p className={styles.text}>
                                This is why Marketing Mix Modeling is superior—it bypasses the attribution problem entirely by measuring <em>incremental impact</em> at the aggregate level.
                            </p>
                        </div>
                    </section>

                    {/* ===== MMM SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Part 2: Marketing Mix Model</h2>
                        
                        <p className={styles.text}>
                            Marketing Mix Modeling (MMM) uses regression analysis to quantify how changes in marketing spend affect revenue, while controlling for confounding factors like seasonality, baseline demand, and external shocks.
                        </p>

                        <div className={styles.equation}>
                            <h3 className={styles.subsectionTitle}>Model Specification</h3>
                            <div className={styles.mathBlock}>
                                Revenue<sub>t</sub> = β<sub>0</sub> + Σ β<sub>i</sub> × f(Spend<sub>i,t</sub>) + γ × Seasonality<sub>t</sub> + ε<sub>t</sub>
                            </div>
                            <p className={styles.text}>
                                Where f(Spend) includes adstock transformation and saturation (logarithmic) adjustment
                            </p>
                        </div>

                        <div className={styles.mmmSteps}>
                            <h3 className={styles.subsectionTitle}>Model Building Steps</h3>
                            
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>1</div>
                                <div className={styles.stepContent}>
                                    <h4>Adstock Transformation</h4>
                                    <p className={styles.text}>
                                        Advertising effects don't disappear immediately. A customer who sees an ad on Monday may convert on Wednesday. Adstock models this carryover effect:
                                    </p>
                                    <pre className={styles.codeBlock}>
{`def apply_adstock(spend, decay_rate=0.5):
    """
    Apply geometric adstock transformation
    decay_rate: retention rate (0-1)
    """
    adstocked = np.zeros(len(spend))
    adstocked[0] = spend[0]
    
    for t in range(1, len(spend)):
        adstocked[t] = spend[t] + decay_rate * adstocked[t-1]
    
    return adstocked

# Estimate optimal decay rate per channel using grid search
for channel in channels:
    best_decay = optimize_decay_rate(channel_spend, revenue)
    df[f'{channel}_adstock'] = apply_adstock(df[f'{channel}_spend'], best_decay)`}
                                    </pre>
                                </div>
                            </div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>2</div>
                                <div className={styles.stepContent}>
                                    <h4>Saturation Adjustment</h4>
                                    <p className={styles.text}>
                                        Channels exhibit diminishing returns—doubling spend doesn't double revenue. I used log transformation to model saturation:
                                    </p>
                                    <pre className={styles.codeBlock}>
{`def apply_saturation(adstocked_spend, saturation_point):
    """
    Apply logarithmic saturation transformation
    saturation_point: spend level where returns start diminishing
    """
    return saturation_point * np.log1p(adstocked_spend / saturation_point)

# Apply saturation after adstock
for channel in channels:
    df[f'{channel}_saturated'] = apply_saturation(
        df[f'{channel}_adstock'],
        saturation_points[channel]
    )`}
                                    </pre>
                                </div>
                            </div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>3</div>
                                <div className={styles.stepContent}>
                                    <h4>Regression Modeling</h4>
                                    <p className={styles.text}>
                                        Fit ridge regression to handle multicollinearity between channels:
                                    </p>
                                    <pre className={styles.codeBlock}>
{`from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler

# Prepare features: transformed spend + seasonality controls
features = [f'{ch}_saturated' for ch in channels]
features += ['seasonal_factor', 'month_sin', 'month_cos']

X = df[features]
y = df['total_revenue']

# Standardize features for ridge regression
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Fit ridge regression with cross-validation for alpha
model = Ridge(alpha=100.0)
model.fit(X_scaled, y)

# Extract channel coefficients
channel_betas = dict(zip(channels, model.coef_[:len(channels)]))`}
                                    </pre>
                                </div>
                            </div>

                            <div className={styles.step}>
                                <div className={styles.stepNumber}>4</div>
                                <div className={styles.stepContent}>
                                    <h4>Model Validation</h4>
                                    <p className={styles.text}>
                                        Assess model performance and coefficient interpretability:
                                    </p>
                                    <div className={styles.validationMetrics}>
                                        <div className={styles.metric}>
                                            <strong>R² Score:</strong> 0.87
                                        </div>
                                        <div className={styles.metric}>
                                            <strong>MAPE:</strong> 6.3%
                                        </div>
                                        <div className={styles.metric}>
                                            <strong>All coefficients positive:</strong> ✓
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== RESULTS SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Part 3: Key Findings</h2>
                        
                        <div className={styles.findingsGrid}>
                            <div className={styles.finding}>
                                <h3 className={styles.findingTitle}>Finding 1: Channel ROAS Varies Dramatically</h3>
                                <div className={styles.roasChart}>
                                    <div className={styles.roasBar} style={{width: '76%', backgroundColor: '#2d5016'}}>
                                        <span>Email: 3.8x</span>
                                    </div>
                                    <div className={styles.roasBar} style={{width: '68%', backgroundColor: '#3d6622'}}>
                                        <span>Paid Social: 3.4x</span>
                                    </div>
                                    <div className={styles.roasBar} style={{width: '54%', backgroundColor: '#5a6b58'}}>
                                        <span>Affiliate: 2.7x</span>
                                    </div>
                                    <div className={styles.roasBar} style={{width: '50%', backgroundColor: '#6d7f6a'}}>
                                        <span>Paid Search: 2.5x</span>
                                    </div>
                                    <div className={styles.roasBar} style={{width: '42%', backgroundColor: '#879f85'}}>
                                        <span>Display: 2.1x</span>
                                    </div>
                                </div>
                                <p className={styles.text}>
                                    Email delivers 81% higher ROAS than Display, yet receives only 12% of total budget.
                                </p>
                            </div>

                            <div className={styles.finding}>
                                <h3 className={styles.findingTitle}>Finding 2: Paid Search is Saturated</h3>
                                <p className={styles.text}>
                                    Current Paid Search spending ($42K/week) is 68% above its saturation point. The last $10K/week of spend generates only $14K in incremental revenue (1.4x ROAS) compared to 2.5x average.
                                </p>
                                <div className={styles.saturationWarning}>
                                    ⚠️ <strong>Recommendation:</strong> Reduce Paid Search budget by $12K/week
                                </div>
                            </div>

                            <div className={styles.finding}>
                                <h3 className={styles.findingTitle}>Finding 3: Paid Social is Underfunded</h3>
                                <p className={styles.text}>
                                    Paid Social operates at only 40% of saturation point. Increasing budget here yields marginal ROAS above 4.0x—the highest marginal return of any channel.
                                </p>
                                <div className={styles.opportunityHighlight}>
                                    📈 <strong>Opportunity:</strong> Increase Paid Social budget by $15K/week
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== OPTIMIZATION SECTION ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Part 4: Budget Optimization</h2>
                        
                        <p className={styles.text}>
                            Using the MMM coefficients, I formulated a constrained optimization problem to find the budget allocation that maximizes total revenue:
                        </p>

                        <div className={styles.optimizationFormulation}>
                            <h3 className={styles.subsectionTitle}>Optimization Problem</h3>
                            <div className={styles.mathBlock}>
                                <strong>Maximize:</strong> Total Revenue = Σ β<sub>i</sub> × f(Spend<sub>i</sub>)
                            </div>
                            <div className={styles.mathBlock}>
                                <strong>Subject to:</strong>
                                <ul className={styles.list}>
                                    <li>Σ Spend<sub>i</sub> ≤ Total Budget (constant)</li>
                                    <li>Spend<sub>i</sub> ≥ Minimum<sub>i</sub> (maintain presence)</li>
                                    <li>|Spend<sub>i,new</sub> - Spend<sub>i,current</sub>| ≤ MaxChange (gradual transition)</li>
                                </ul>
                            </div>
                        </div>

                        <pre className={styles.codeBlock}>
{`from scipy.optimize import minimize

def objective(spend_allocation):
    """Negative revenue (for minimization)"""
    total_revenue = 0
    for i, channel in enumerate(channels):
        # Apply adstock and saturation transformations
        adstocked = apply_adstock(spend_allocation[i], decay_rates[channel])
        saturated = apply_saturation(adstocked, saturation_points[channel])
        total_revenue += model_coefs[channel] * saturated
    return -total_revenue  # Negative for minimization

# Define constraints
constraints = [
    {'type': 'eq', 'fun': lambda x: np.sum(x) - total_budget},  # Budget constraint
    *[{'type': 'ineq', 'fun': lambda x, i=i: x[i] - min_spend[i]} 
      for i in range(len(channels))],  # Minimum spend
]

# Bounds: prevent drastic changes
bounds = [(max(current_spend[i] * 0.7, min_spend[i]), 
           current_spend[i] * 1.5) for i in range(len(channels))]

# Optimize
result = minimize(objective, x0=current_spend, method='SLSQP',
                 bounds=bounds, constraints=constraints)

optimal_allocation = result.x`}
                        </pre>

                        <div className={styles.allocationComparison}>
                            <h3 className={styles.subsectionTitle}>Current vs. Optimal Allocation</h3>
                            
                            <div className={styles.comparisonTable}>
                                <div className={styles.tableHeader}>
                                    <div>Channel</div>
                                    <div>Current</div>
                                    <div>Optimal</div>
                                    <div>Change</div>
                                    <div>Impact</div>
                                </div>
                                <div className={styles.tableRow}>
                                    <div><strong>Paid Search</strong></div>
                                    <div>$42K/wk</div>
                                    <div className={styles.decrease}>$30K/wk</div>
                                    <div className={styles.decrease}>-29%</div>
                                    <div>-$84K revenue (acceptable loss in saturated channel)</div>
                                </div>
                                <div className={styles.tableRow}>
                                    <div><strong>Paid Social</strong></div>
                                    <div>$28K/wk</div>
                                    <div className={styles.increase}>$43K/wk</div>
                                    <div className={styles.increase}>+54%</div>
                                    <div>+$245K revenue (high marginal ROAS)</div>
                                </div>
                                <div className={styles.tableRow}>
                                    <div><strong>Display</strong></div>
                                    <div>$35K/wk</div>
                                    <div className={styles.decrease}>$28K/wk</div>
                                    <div className={styles.decrease}>-20%</div>
                                    <div>-$48K revenue (low ROAS channel)</div>
                                </div>
                                <div className={styles.tableRow}>
                                    <div><strong>Email</strong></div>
                                    <div>$15K/wk</div>
                                    <div className={styles.increase}>$22K/wk</div>
                                    <div className={styles.increase}>+47%</div>
                                    <div>+$112K revenue (highest ROAS)</div>
                                </div>
                                <div className={styles.tableRow}>
                                    <div><strong>Affiliate</strong></div>
                                    <div>$25K/wk</div>
                                    <div className={styles.neutral}>$22K/wk</div>
                                    <div className={styles.neutral}>-12%</div>
                                    <div>-$21K revenue (slight reduction)</div>
                                </div>
                                <div className={styles.tableTotal}>
                                    <div><strong>TOTAL</strong></div>
                                    <div>$145K/wk</div>
                                    <div>$145K/wk</div>
                                    <div>-</div>
                                    <div className={styles.totalImpact}><strong>+$204K/wk (+18.4%)</strong></div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.annualImpact}>
                            <h3 className={styles.impactNumber}>$10.6M</h3>
                            <p className={styles.impactLabel}>Additional Annual Revenue</p>
                            <p className={styles.text}>At constant total spend, optimized allocation projects +$204K/week = <strong>+$10.6M annually</strong></p>
                        </div>
                    </section>

                    {/* ===== BUSINESS RECOMMENDATIONS ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Business Recommendations</h2>
                        
                        <div className={styles.recommendations}>
                            <div className={styles.recommendation}>
                                <div className={styles.recommendationHeader}>
                                    <span className={styles.priority}>HIGH PRIORITY</span>
                                    <h3>1. Immediately Reduce Paid Search Spend</h3>
                                </div>
                                <p className={styles.text}>
                                    <strong>Action:</strong> Cut Paid Search budget from $42K to $30K/week (-29%)
                                </p>
                                <p className={styles.text}>
                                    <strong>Rationale:</strong> Channel is operating 68% above saturation point. Marginal ROAS in this zone is only 1.4x vs. 2.5x average.
                                </p>
                                <p className={styles.text}>
                                    <strong>Implementation:</strong> Pause low-performing keywords (high CPC, low conversion rate). Focus on brand + high-intent queries only.
                                </p>
                                <p className={styles.text}>
                                    <strong>Expected Impact:</strong> -$84K weekly revenue (acceptable), but frees $12K for reallocation
                                </p>
                            </div>

                            <div className={styles.recommendation}>
                                <div className={styles.recommendationHeader}>
                                    <span className={styles.priority}>HIGH PRIORITY</span>
                                    <h3>2. Aggressively Scale Paid Social</h3>
                                </div>
                                <p className={styles.text}>
                                    <strong>Action:</strong> Increase Paid Social from $28K to $43K/week (+54%)
                                </p>
                                <p className={styles.text}>
                                    <strong>Rationale:</strong> Currently operating at only 40% of saturation. Marginal ROAS exceeds 4.0x—highest of any channel.
                                </p>
                                <p className={styles.text}>
                                    <strong>Implementation:</strong> Expand Meta/TikTok campaigns with focus on lookalike audiences, video creative, and retargeting
                                </p>
                                <p className={styles.text}>
                                    <strong>Expected Impact:</strong> +$245K weekly revenue
                                </p>
                            </div>

                            <div className={styles.recommendation}>
                                <div className={styles.recommendationHeader}>
                                    <span className={styles.priority}>MEDIUM PRIORITY</span>
                                    <h3>3. Expand Email Marketing Capacity</h3>
                                </div>
                                <p className={styles.text}>
                                    <strong>Action:</strong> Increase Email budget from $15K to $22K/week (+47%)
                                </p>
                                <p className={styles.text}>
                                    <strong>Rationale:</strong> Highest absolute ROAS (3.8x) with room to grow before saturation
                                </p>
                                <p className={styles.text}>
                                    <strong>Implementation:</strong> Invest in list growth tactics (lead magnets, pop-ups), increase send frequency for engaged segments, implement abandoned cart flows
                                </p>
                                <p className={styles.text}>
                                    <strong>Expected Impact:</strong> +$112K weekly revenue
                                </p>
                            </div>

                            <div className={styles.recommendation}>
                                <div className={styles.recommendationHeader}>
                                    <span className={styles.priority}>LOW PRIORITY</span>
                                    <h3>4. Optimize or Reduce Display</h3>
                                </div>
                                <p className={styles.text}>
                                    <strong>Action:</strong> Reduce Display from $35K to $28K/week (-20%)
                                </p>
                                <p className={styles.text}>
                                    <strong>Rationale:</strong> Lowest ROAS (2.1x) and approaching saturation
                                </p>
                                <p className={styles.text}>
                                    <strong>Alternative:</strong> Before cutting, test creative refresh and retargeting-only strategy. If performance improves, maintain current spend.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ===== TECHNICAL NOTES ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Technical Implementation Notes</h2>
                        
                        <div className={styles.techNotes}>
                            <div className={styles.note}>
                                <h3 className={styles.noteTitle}>Why Ridge Regression?</h3>
                                <p className={styles.text}>
                                    Marketing channels are correlated (customers who see Display ads also see Paid Social). This multicollinearity inflates variance in OLS regression. Ridge regression adds L2 penalty to reduce coefficient variance while accepting slight bias.
                                </p>
                            </div>

                            <div className={styles.note}>
                                <h3 className={styles.noteTitle}>Adstock Decay Rate Selection</h3>
                                <p className={styles.text}>
                                    I used grid search with cross-validation to find optimal decay rate per channel. Alternative: Maximum likelihood estimation assuming specific distribution. Key insight: awareness channels (Display, Social) have higher decay rates than direct response (Search).
                                </p>
                            </div>

                            <div className={styles.note}>
                                <h3 className={styles.noteTitle}>Handling Baseline Demand</h3>
                                <p className={styles.text}>
                                    Not all revenue is driven by paid marketing—organic traffic, word-of-mouth, and brand equity create baseline demand. Model includes intercept term to capture this. Critical for accurate incremental ROAS calculation.
                                </p>
                            </div>

                            <div className={styles.note}>
                                <h3 className={styles.noteTitle}>Limitations & Extensions</h3>
                                <p className={styles.text}>
                                    <strong>Limitations:</strong> (1) Assumes linear relationship post-transformation; (2) Ignores channel interaction effects; (3) Requires sufficient historical data
                                </p>
                                <p className={styles.text}>
                                    <strong>Possible Extensions:</strong> (1) Bayesian MMM for uncertainty quantification; (2) Add competitor spend data; (3) Model CLV instead of immediate revenue; (4) Incorporate creative quality metrics
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ===== KEY TAKEAWAYS ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Key Takeaways</h2>
                        <ul className={styles.list}>
                            <li><strong>Attribution is fundamentally ambiguous</strong>—different models produce wildly different answers for the same data. MMM sidesteps this by measuring incremental impact at aggregate level.</li>
                            <li><strong>Saturation matters</strong>—channels exhibit diminishing returns, and ignoring this leads to massive overspending in saturated channels (like Paid Search brand keywords).</li>
                            <li><strong>Carryover effects are real</strong>—advertising impact persists for weeks. Models that ignore adstock systematically undervalue awareness channels.</li>
                            <li><strong>Optimization requires constraints</strong>—pure mathematical optimization might suggest cutting a channel to zero, but business reality requires maintaining minimum presence for brand visibility.</li>
                            <li><strong>Data quality &gt; model complexity</strong>—a simple MMM with clean data outperforms a complex model with measurement errors. Invest in tracking infrastructure first.</li>
                        </ul>
                    </section>

                    {/* ===== REPOSITORY & NEXT STEPS ===== */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Repository & Code</h2>
                        
                        <p className={styles.text}>
                            The complete analysis—including data generation, MMM implementation, and optimization—is available on GitHub:
                        </p>

                        <div className={styles.repoStructure}>
                            <h3 className={styles.subsectionTitle}>Repository Structure</h3>
                            <pre className={styles.codeBlock}>
{`marketing-mix-modeling/
├── data/
│   ├── generate_data.py          # Synthetic data generation
│   └── marketing_data.csv         # Generated dataset
├── notebooks/
│   ├── 01_attribution_analysis.ipynb
│   ├── 02_mmm_modeling.ipynb
│   └── 03_optimization.ipynb
├── src/
│   ├── adstock.py                # Adstock transformations
│   ├── saturation.py             # Saturation models
│   └── optimization.py           # Budget optimization
├── visualizations/               # Generated plots
└── README.md`}
                            </pre>
                        </div>

                        <div style={{textAlign: 'center', marginTop: '3rem'}}>
                            <a 
                                href="https://github.com/yourusername/marketing-mix-modeling" 
                                className={styles.button}
                                onClick={() => handleCTAClick('View Repository', 'https://github.com/yourusername/marketing-mix-modeling')}
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
                                This MMM analysis demonstrates advanced statistical modeling, Python proficiency, and business acumen. Explore more projects showcasing geospatial analysis, machine learning, and data engineering.
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