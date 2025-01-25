import pandas as pd
import requests
import time

df = pd.read_csv('toyota_vehicles.csv')
api_columns = ['city_mpg', 'class', 'combination_mpg', 'cylinders', 'displacement',
              'drive', 'fuel_type', 'highway_mpg', 'make', 'model', 'transmission', 'year']

new_df = pd.DataFrame(columns=list(df.columns) + api_columns)
new_df[df.columns] = df[df.columns]

headers = {'X-Api-Key': 'o4eqTqGUAsUTemfAkI1Afw==47LH2HcNK3Gf3kfU'}
base_url = 'https://api.api-ninjas.com/v1/cars'

for index, row in df.iterrows():
   model = row['car_title'].split()[0].lower()
   year = row['model_year']
   try:
       response = requests.get(base_url, headers=headers,
                             params={'model': model, 'year': year})
       response.raise_for_status()
       data = response.json()

       if data:
           for col in api_columns:
               new_df.loc[index, col] = data[0].get(col)
       else:
           for col in api_columns:
               new_df.loc[index, col] = "could not find"
       time.sleep(1)
       
   except Exception as e:
       print(f"Error processing {model}: {str(e)}")
       for col in api_columns:
           new_df.loc[index, col] = "could not find"

new_df.to_csv('toyota_vehicles_with_specs.csv', index=False)