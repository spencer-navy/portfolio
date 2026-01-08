"""
Data Acquisition Module
Functions to query marketing data from Supabase PostgreSQL database
"""

import os
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv, find_dotenv
from typing import Optional

# Load environment variables
env_file = find_dotenv('.env.local')
if env_file:
    load_dotenv(dotenv_path=env_file)
else:
    load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise ValueError("Missing Supabase credentials. Check .env.local file.")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)


def get_campaigns() -> pd.DataFrame:
    """Fetch all campaigns from database"""
    response = supabase.table('campaigns').select('*').execute()
    return pd.DataFrame(response.data)


def get_daily_performance(start_date: Optional[str] = None, 
                         end_date: Optional[str] = None) -> pd.DataFrame:
    """
    Fetch daily performance data
    
    Args:
        start_date: Optional start date (YYYY-MM-DD)
        end_date: Optional end date (YYYY-MM-DD)
    """
    query = supabase.table('daily_performance').select('*')
    
    if start_date:
        query = query.gte('date', start_date)
    if end_date:
        query = query.lte('date', end_date)
    
    response = query.execute()
    df = pd.DataFrame(response.data)
    df['date'] = pd.to_datetime(df['date'])
    return df


def get_customers(start_date: Optional[str] = None,
                 end_date: Optional[str] = None) -> pd.DataFrame:
    """
    Fetch customer acquisition data
    
    Args:
        start_date: Optional start date (YYYY-MM-DD)
        end_date: Optional end date (YYYY-MM-DD)
    """
    query = supabase.table('customers').select('*')
    
    if start_date:
        query = query.gte('acquisition_date', start_date)
    if end_date:
        query = query.lte('acquisition_date', end_date)
    
    response = query.execute()
    df = pd.DataFrame(response.data)
    df['acquisition_date'] = pd.to_datetime(df['acquisition_date'])
    return df


def get_transactions(start_date: Optional[str] = None,
                    end_date: Optional[str] = None) -> pd.DataFrame:
    """
    Fetch transaction data
    
    Args:
        start_date: Optional start date (YYYY-MM-DD)
        end_date: Optional end date (YYYY-MM-DD)
    """
    query = supabase.table('transactions').select('*')
    
    if start_date:
        query = query.gte('transaction_date', start_date)
    if end_date:
        query = query.lte('transaction_date', end_date)
    
    response = query.execute()
    df = pd.DataFrame(response.data)
    df['transaction_date'] = pd.to_datetime(df['transaction_date'])
    return df


def get_ab_tests() -> pd.DataFrame:
    """Fetch A/B test results"""
    response = supabase.table('ab_tests').select('*').execute()
    df = pd.DataFrame(response.data)
    df['start_date'] = pd.to_datetime(df['start_date'])
    df['end_date'] = pd.to_datetime(df['end_date'])
    return df


def get_channel_performance_with_campaigns() -> pd.DataFrame:
    """
    Fetch daily performance joined with campaign details
    Returns enriched dataset for analysis
    """
    # Get both tables
    campaigns_df = get_campaigns()
    performance_df = get_daily_performance()
    
    # Merge on campaign_id
    merged_df = performance_df.merge(
        campaigns_df[['campaign_id', 'campaign_name', 'channel', 'target_audience']],
        on='campaign_id',
        how='left'
    )
    
    return merged_df


def get_customer_ltv_data() -> pd.DataFrame:
    """
    Fetch customers with their transaction history for LTV analysis
    """
    customers_df = get_customers()
    transactions_df = get_transactions()
    
    # Merge transactions with customer data
    merged_df = transactions_df.merge(
        customers_df[['customer_id', 'acquisition_date', 'channel', 
                     'customer_segment', 'first_order_value']],
        on='customer_id',
        how='left'
    )
    
    return merged_df
