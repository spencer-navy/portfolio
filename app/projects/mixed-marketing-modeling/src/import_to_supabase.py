"""
Import Marketing Data to Supabase
Loads CSV files into PostgreSQL database
"""

import os
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime

# load environment variables from .env.local
load_dotenv(dotenv_path=".env.local")

# Supabase configuration
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise ValueError("Supabase URL or Service Role Key not found in environment variables. Check .env.local file.")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def import_campaigns():
    """Import marketing campaigns from CSV to Supabase"""
    campaigns_df = pd.read_csv("scripts/data/campaigns.csv")
    # Convert dates to strings
    campaigns_df['start_date'] = pd.to_datetime(campaigns_df['start_date']).dt.strftime('%Y-%m-%d')
    campaigns_df['end_date'] = pd.to_datetime(campaigns_df['end_date']).dt.strftime('%Y-%m-%d')

    # Insert in batches
    batch_size = 100
    records = campaigns_df.to_dict('records')

    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        result = supabase.table('campaigns').insert(batch).execute()
        print(f"  Inserted {len(batch)} campaigns")

    print(f"✅ Imported {len(campaigns_df)} campaigns\n")

def import_daily_performance():
    """Import daily performance metrics from CSV to Supabase"""
    print("Importing daily performance...")
    daily_performance_df = pd.read_csv("scripts/data/daily_performance.csv")
    
    # Convert date to string
    daily_performance_df['date'] = pd.to_datetime(daily_performance_df['date']).dt.strftime('%Y-%m-%d')
    
    # Insert in batches
    batch_size = 500
    records = daily_performance_df.to_dict('records')
    
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        result = supabase.table('daily_performance').insert(batch).execute()
        print(f"  Inserted {len(batch)} records")
    
    print(f"✅ Imported {len(daily_performance_df)} daily performance records\n")

def import_customers():
    """Import customer acquisition data from CSV to Supabase"""
    print("Importing customers...")
    customers_df = pd.read_csv("scripts/data/customers.csv")
    
    # Convert date to string
    customers_df['acquisition_date'] = pd.to_datetime(customers_df['acquisition_date']).dt.strftime('%Y-%m-%d')
    
    # Insert in batches
    batch_size = 500
    records = customers_df.to_dict('records')
    
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        result = supabase.table('customers').insert(batch).execute()
        print(f"  Inserted {len(batch)} customers")
    
    print(f"✅ Imported {len(customers_df)} customers\n")

def import_transactions():
    """Import customer transaction history from CSV to Supabase"""
    print("Importing transactions...")
    transactions_df = pd.read_csv("scripts/data/transactions.csv")
    
    # Convert date to string
    transactions_df['transaction_date'] = pd.to_datetime(transactions_df['transaction_date']).dt.strftime('%Y-%m-%d')
    
    # Insert in batches
    batch_size = 500
    records = transactions_df.to_dict('records')
    
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        result = supabase.table('transactions').insert(batch).execute()
        print(f"  Inserted {len(batch)} transactions")
    
    print(f"✅ Imported {len(transactions_df)} transactions\n")

def import_ab_tests():
    """Import A/B test results from CSV to Supabase"""
    print("Importing A/B tests...")
    ab_tests_df = pd.read_csv("scripts/data/ab_tests.csv")
    
    # Convert dates to strings
    ab_tests_df['start_date'] = pd.to_datetime(ab_tests_df['start_date']).dt.strftime('%Y-%m-%d')
    ab_tests_df['end_date'] = pd.to_datetime(ab_tests_df['end_date']).dt.strftime('%Y-%m-%d')
    
    # Insert in batches
    batch_size = 100
    records = ab_tests_df.to_dict('records')
    
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        result = supabase.table('ab_tests').insert(batch).execute()
        print(f"  Inserted {len(batch)} A/B tests")
    
    print(f"✅ Imported {len(ab_tests_df)} A/B test records\n")

def clear_all_tables():
    """Clear all data from tables (use with caution!)"""
    print("⚠️  WARNING: This will delete all existing data!")
    response = input("Are you sure you want to continue? (yes/no): ")
    
    if response.lower() != 'yes':
        print("Import cancelled.")
        return False
    
    print("\nClearing tables...")
    tables = ['ab_tests', 'transactions', 'customers', 'daily_performance', 'campaigns']
    
    for table in tables:
        try:
            # Delete all records
            supabase.table(table).delete().neq('campaign_id', 0).execute()
            print(f"  Cleared {table}")
        except Exception as e:
            print(f"  Error clearing {table}: {e}")
    
    print("✅ All tables cleared\n")
    return True

def main():
    """Main import function"""
    print("=" * 60)
    print("Marketing Analytics Data Import to Supabase")
    print("=" * 60)
    print()
    
    # Option to clear existing data
    print("Do you want to clear existing data before importing?")
    clear = input("(yes/no): ")
    
    if clear.lower() == 'yes':
        if not clear_all_tables():
            return
    
    try:
        # Import in order (respecting foreign keys)
        import_campaigns()
        import_daily_performance()
        import_customers()
        import_transactions()
        import_ab_tests()
        
        print("=" * 60)
        print("🎉 All data imported successfully!")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ Error during import: {e}")
        print("Import stopped. Some data may have been imported.")

if __name__ == "__main__":
    main()