# import pandas as pd

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import time
from selenium.webdriver.firefox.options import Options

mydriver = webdriver.Firefox()

url = "https://www.toyota.com/all-vehicles/"
mydriver.get(url)
time.sleep(3)

# try:
#     vehicle_cards = mydriver.find_elements(By.CLASS_NAME, "vehicle-card")
#     print(f"Found {len(vehicle_cards)} cards")
    
#     for card in vehicle_cards:
#         try:
#             image_element = card.find_element(By.CSS_SELECTOR, "source[media='(min-width: 1024px)']")
#             image_url = image_element.get_attribute("srcset")
#             shown_price = card.find_element(By.CLASS_NAME, 'as-shown').text
#             model_year = card.find_element(By.CLASS_NAME, 'model-year').text
#             car_title = card.find_element(By.CLASS_NAME, 'title').text
#             header = card.find_element(By.CLASS_NAME, 'header').text
            
#             print([image_url, shown_price, model_year, car_title, header])
            
#         except Exception as e:
#             print(f"Error processing card: {str(e)}")

# except Exception as e:
#     print(f"Main error: {str(e)}")

# mydriver.quit()

import pandas as pd

data = []
try:
   vehicle_cards = mydriver.find_elements(By.CLASS_NAME, "vehicle-card")
   print(f"Found {len(vehicle_cards)} cards")
   
   for card in vehicle_cards:
       try:
           image_element = card.find_element(By.CSS_SELECTOR, "source[media='(min-width: 1024px)']")
           data.append({
               'image_url': image_element.get_attribute("srcset"),
               'shown_price': card.find_element(By.CLASS_NAME, 'as-shown').text,
               'model_year': card.find_element(By.CLASS_NAME, 'model-year').text,
               'car_title': card.find_element(By.CLASS_NAME, 'title').text,
               'header': card.find_element(By.CLASS_NAME, 'header').text
           })
       except Exception as e:
           print(f"Error processing card: {str(e)}")

   df = pd.DataFrame(data)
   df.to_csv('toyota_vehicles.csv', index=False)
   print("Data exported to toyota_vehicles.csv")
   
except Exception as e:
   print(f"Main error: {str(e)}")

mydriver.quit()