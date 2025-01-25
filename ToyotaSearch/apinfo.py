import pandas as pd
import requests
import time

df = pd.read_csv('toyota_vehicles.csv')
print("CSV loaded successfully")

api_columns = ['city_mpg', 'class', 'combination_mpg', 'cylinders', 'displacement',
             'drive', 'fuel_type', 'highway_mpg', 'make', 'model', 'transmission', 'year']

new_df = pd.DataFrame(columns=list(df.columns) + api_columns)
new_df[df.columns] = df[df.columns]
print("New DataFrame created")

headers = {'X-Api-Key': 'o4eqTqGUAsUTemfAkI1Afw==47LH2HcNK3Gf3kfU'}
base_url = 'https://api.api-ninjas.com/v1/cars'

for index, row in df.iterrows():
   model = row['car_title'].lower()
   year = row['model_year']
   print(f"\nProcessing row {index}")
   print(f"Model: {model}")
   print(f"Year: {year}")
   
   try:
       print(f"Trying year {year}")
       response = requests.get(base_url, headers=headers,
                             params={'model': model, 'year': year})
       print(f"Response status: {response.status_code}")
       data = response.json()

       if not data and year == 2025:
           print(f"No data found for {year}, trying 2024")
           response = requests.get(base_url, headers=headers,
                                 params={'model': model, 'year': 2024})
           print(f"2024 response status: {response.status_code}")
           data = response.json()

       if data:
           print("Data found!")
           for col in api_columns:
               new_df.loc[index, col] = data[0].get(col)
       else:
           print("No data found for either year")
           for col in api_columns:
               new_df.loc[index, col] = "could not find"
       time.sleep(1)
       
   except Exception as e:
       print(f"Error processing {model}: {str(e)}")
       for col in api_columns:
           new_df.loc[index, col] = "could not find"

print("\nSaving to CSV...")
new_df.to_csv('toyota_vehicles_with_specs.csv', index=False)
print("Script completed")