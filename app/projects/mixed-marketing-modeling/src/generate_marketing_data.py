"""
Marketing Analytics Dataset Generator
Generates realistic synthetic data for multi-channel marketing campaign analysis
"""

import random
import pandas as pd
from datetime import datetime, timedelta
import numpy as np
from hashlib import sha256

# Set random seed for reproducibility
random.seed(42)
np.random.seed(42)

# Configuration
START_DATE = datetime(2024, 1, 1)
END_DATE = datetime(2024, 12, 31)
NUM_CAMPAIGNS = 25
NUM_CUSTOMERS = 5000

# Channel configurations with realistic performance characteristics
CHANNEL_CONFIG = {
    'paid_search': {
        'avg_cpc': 2.50,
        'avg_ctr': 0.035,
        'avg_cvr': 0.025,
        'avg_aov': 85.00,
        'budget_range': (10000, 50000)
    },
    'social': {
        'avg_cpc': 1.20,
        'avg_ctr': 0.018,
        'avg_cvr': 0.015,
        'avg_aov': 65.00,
        'budget_range': (8000, 40000)
    },
    'display': {
        'avg_cpc': 0.75,
        'avg_ctr': 0.012,
        'avg_cvr': 0.008,
        'avg_aov': 55.00,
        'budget_range': (15000, 60000)
    },
    'email': {
        'avg_cpc': 0.10,
        'avg_ctr': 0.025,
        'avg_cvr': 0.035,
        'avg_aov': 75.00,
        'budget_range': (3000, 15000)
    },
    'affiliate': {
        'avg_cpc': 3.00,
        'avg_ctr': 0.045,
        'avg_cvr': 0.030,
        'avg_aov': 95.00,
        'budget_range': (5000, 25000)
    }
}

def generate_campaigns():
    """Generate campaign master data"""
    campaigns = []
    campaign_id = 1
    
    channels = list(CHANNEL_CONFIG.keys())
    
    for i in range(NUM_CAMPAIGNS):
        channel = random.choice(channels)
        config = CHANNEL_CONFIG[channel]
        
        # Random start date throughout the year
        start_date = START_DATE + timedelta(days=random.randint(0, 300))
        
        # Campaign runs 30-90 days
        duration = random.randint(30, 90)
        end_date = start_date + timedelta(days=duration)
        
        # Ensure end date doesn't exceed year end
        if end_date > END_DATE:
            end_date = END_DATE
        
        budget = random.uniform(*config['budget_range'])
        
        campaigns.append({
            'campaign_id': campaign_id,
            'campaign_name': f"{channel.replace('_', ' ').title()} Campaign {i+1}",
            'channel': channel,
            'start_date': start_date.date(),
            'end_date': end_date.date(),
            'budget': round(budget, 2),
            'target_audience': random.choice(['18-24', '25-34', '35-44', '45-54', '55+'])
        })
        campaign_id += 1
    
    return pd.DataFrame(campaigns)

def generate_daily_performance(campaigns_df):
    """Generate daily performance metrics for each campaign"""
    daily_perf = []
    
    for _, campaign in campaigns_df.iterrows():
        config = CHANNEL_CONFIG[campaign['channel']]
        
        # Generate daily data for campaign duration
        current_date = campaign['start_date']
        end_date = campaign['end_date']
        
        # Daily budget allocation
        campaign_days = (end_date - current_date).days + 1
        daily_budget = campaign['budget'] / campaign_days
        
        while current_date <= end_date:
            # Add some randomness and seasonality
            day_of_week = current_date.weekday()
            
            # Weekends typically have different performance
            weekend_multiplier = 0.7 if day_of_week >= 5 else 1.0
            
            # Add some random variation (±30%)
            variance = random.uniform(0.7, 1.3)
            
            # Calculate metrics
            daily_spend = daily_budget * variance * weekend_multiplier
            
            # Impressions based on spend and CPC
            impressions = int(daily_spend / config['avg_cpc'] / config['avg_ctr'])
            
            # Clicks
            clicks = int(impressions * config['avg_ctr'] * variance)
            
            # Conversions
            conversions = int(clicks * config['avg_cvr'] * variance)
            
            # Revenue
            revenue = conversions * config['avg_aov'] * random.uniform(0.8, 1.2)
            
            daily_perf.append({
                'date': current_date,
                'campaign_id': campaign['campaign_id'],
                'impressions': impressions,
                'clicks': clicks,
                'conversions': conversions,
                'spend': round(daily_spend, 2),
                'revenue': round(revenue, 2)
            })
            
            current_date += timedelta(days=1)
    
    return pd.DataFrame(daily_perf)

def generate_customers(campaigns_df, daily_perf_df):
    """Generate customer acquisition data"""
    customers = []
    customer_id = 1
    
    # Get conversions by campaign and date
    for _, perf in daily_perf_df.iterrows():
        if perf['conversions'] > 0:
            campaign = campaigns_df[campaigns_df['campaign_id'] == perf['campaign_id']].iloc[0]
            config = CHANNEL_CONFIG[campaign['channel']]
            
            # Create customers for each conversion
            for _ in range(perf['conversions']):
                first_order = config['avg_aov'] * random.uniform(0.5, 1.5)
                
                # Segment based on first order value
                if first_order >= 100:
                    segment = 'high_value'
                elif first_order >= 50:
                    segment = 'medium_value'
                else:
                    segment = 'low_value'
                
                # Generate fake email hash for privacy
                email_hash = sha256(f"customer_{customer_id}@example.com".encode()).hexdigest()
                
                customers.append({
                    'customer_id': customer_id,
                    'acquisition_date': perf['date'],
                    'campaign_id': campaign['campaign_id'],
                    'channel': campaign['channel'],
                    'first_order_value': round(first_order, 2),
                    'customer_segment': segment,
                    'email_hash': email_hash
                })
                customer_id += 1
                
                # Stop if we've reached target customer count
                if customer_id > NUM_CUSTOMERS:
                    return pd.DataFrame(customers)
    
    return pd.DataFrame(customers)

def generate_transactions(customers_df):
    """Generate repeat purchase transactions"""
    transactions = []
    transaction_id = 1
    
    for _, customer in customers_df.iterrows():
        # Number of repeat purchases (influenced by segment)
        if customer['customer_segment'] == 'high_value':
            num_purchases = random.randint(2, 8)
            repeat_prob = 0.7
        elif customer['customer_segment'] == 'medium_value':
            num_purchases = random.randint(1, 4)
            repeat_prob = 0.5
        else:
            num_purchases = random.randint(0, 2)
            repeat_prob = 0.3
        
        # First purchase (already counted in customer acquisition)
        transactions.append({
            'transaction_id': transaction_id,
            'customer_id': customer['customer_id'],
            'transaction_date': customer['acquisition_date'],
            'order_value': customer['first_order_value'],
            'products_purchased': random.randint(1, 5),
            'discount_applied': 0.0  # First order often has no discount
        })
        transaction_id += 1
        
        # Repeat purchases
        last_purchase = customer['acquisition_date']
        
        for _ in range(num_purchases):
            if random.random() < repeat_prob:
                # Days until next purchase (7-60 days)
                days_until_next = random.randint(7, 60)
                next_purchase = last_purchase + timedelta(days=days_until_next)
                
                # Don't exceed end date
                if next_purchase > END_DATE.date():
                    break
                
                # Order value (slightly lower than first order on average)
                order_value = customer['first_order_value'] * random.uniform(0.7, 1.1)
                
                # Random discount
                discount = random.choice([0, 0, 0, 5, 10, 15, 20])  # Most orders have no discount
                
                transactions.append({
                    'transaction_id': transaction_id,
                    'customer_id': customer['customer_id'],
                    'transaction_date': next_purchase,
                    'order_value': round(order_value, 2),
                    'products_purchased': random.randint(1, 4),
                    'discount_applied': discount
                })
                transaction_id += 1
                last_purchase = next_purchase
    
    return pd.DataFrame(transactions)

def generate_ab_tests(campaigns_df):
    """Generate A/B test results for select campaigns"""
    ab_tests = []
    test_id = 1
    
    # Run A/B tests on ~40% of campaigns
    test_campaigns = campaigns_df.sample(frac=0.4, random_state=42)
    
    for _, campaign in test_campaigns.iterrows():
        config = CHANNEL_CONFIG[campaign['channel']]
        test_name = f"Creative Test - {campaign['campaign_name']}"
        
        # Test duration (14-30 days)
        test_duration = random.randint(14, 30)
        test_start = campaign['start_date']
        test_end = min(test_start + timedelta(days=test_duration), campaign['end_date'])
        
        # Generate control and variants
        variants = ['control', 'variant_a', 'variant_b']
        
        # Base metrics
        base_impressions = random.randint(50000, 200000)
        base_ctr = config['avg_ctr']
        base_cvr = config['avg_cvr']
        
        for variant in variants:
            # Variants have slight performance differences
            if variant == 'control':
                ctr = base_ctr
                cvr = base_cvr
            elif variant == 'variant_a':
                ctr = base_ctr * random.uniform(0.95, 1.15)
                cvr = base_cvr * random.uniform(0.90, 1.10)
            else:
                ctr = base_ctr * random.uniform(0.85, 1.25)
                cvr = base_cvr * random.uniform(0.95, 1.20)
            
            impressions = int(base_impressions / len(variants) * random.uniform(0.9, 1.1))
            clicks = int(impressions * ctr)
            conversions = int(clicks * cvr)
            
            # Simple statistical significance check (placeholder)
            # In reality, would use proper two-proportion z-test
            stat_sig = conversions > 100 and abs(cvr - base_cvr) / base_cvr > 0.1
            
            ab_tests.append({
                'test_id': test_id,
                'campaign_id': campaign['campaign_id'],
                'test_name': test_name,
                'variant': variant,
                'start_date': test_start,
                'end_date': test_end,
                'impressions': impressions,
                'clicks': clicks,
                'conversions': conversions,
                'statistical_significance': stat_sig,
                'p_value': round(random.uniform(0.01, 0.15), 4) if stat_sig else round(random.uniform(0.15, 0.90), 4)
            })
            test_id += 1
    
    return pd.DataFrame(ab_tests)

def main():
    """Generate all datasets and save to CSV"""
    print("Generating marketing analytics datasets...")
    
    print("\n1. Generating campaigns...")
    campaigns_df = generate_campaigns()
    print(f"   Generated {len(campaigns_df)} campaigns")
    
    print("\n2. Generating daily performance data...")
    daily_perf_df = generate_daily_performance(campaigns_df)
    print(f"   Generated {len(daily_perf_df)} daily performance records")
    
    print("\n3. Generating customer acquisitions...")
    customers_df = generate_customers(campaigns_df, daily_perf_df)
    print(f"   Generated {len(customers_df)} customers")
    
    print("\n4. Generating transactions...")
    transactions_df = generate_transactions(customers_df)
    print(f"   Generated {len(transactions_df)} transactions")
    
    print("\n5. Generating A/B tests...")
    ab_tests_df = generate_ab_tests(campaigns_df)
    print(f"   Generated {len(ab_tests_df)} A/B test records")
    
# Save to CSV
    print("\n6. Saving datasets to CSV...")
    campaigns_df.to_csv('scripts/data/campaigns.csv', index=False)
    daily_perf_df.to_csv('scripts/data/daily_performance.csv', index=False)
    customers_df.to_csv('scripts/data/customers.csv', index=False)
    transactions_df.to_csv('scripts/data/transactions.csv', index=False)
    ab_tests_df.to_csv('scripts/data/ab_tests.csv', index=False)
    
    print("\n✅ All datasets generated successfully!")
    print("\nDataset Summary:")
    print(f"  - Campaigns: {len(campaigns_df)}")
    print(f"  - Daily Performance Records: {len(daily_perf_df)}")
    print(f"  - Customers: {len(customers_df)}")
    print(f"  - Transactions: {len(transactions_df)}")
    print(f"  - A/B Tests: {len(ab_tests_df)}")
    
    # Calculate some quick stats
    total_spend = daily_perf_df['spend'].sum()
    total_revenue = daily_perf_df['revenue'].sum()
    overall_roas = total_revenue / total_spend if total_spend > 0 else 0
    
    print(f"\nOverall Metrics:")
    print(f"  - Total Spend: ${total_spend:,.2f}")
    print(f"  - Total Revenue: ${total_revenue:,.2f}")
    print(f"  - Overall ROAS: {overall_roas:.2f}x")

if __name__ == "__main__":
    main()