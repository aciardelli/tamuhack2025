from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException, StaleElementReferenceException
import time

url = "https://carsheet.io/toyota/"
mydriver = webdriver.Firefox()

try:
    mydriver.get(url)
    time.sleep(5)
    
    # First try to find and close the overlapping filters button
    try:
        filters_btn = mydriver.find_element(By.ID, "cs-btn-filters")
        filters_btn.click()
    except:
        print("Could not find filters button")
    
    wait = WebDriverWait(mydriver, 10)
    tbody = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "tbody")))
    rows = tbody.find_elements(By.TAG_NAME, "tr")
    
    for row in rows:
        try:
            clickable = row.find_element(By.CSS_SELECTOR, "td")
            mydriver.execute_script("arguments[0].scrollIntoView(true);", clickable)
            time.sleep(1)
            mydriver.execute_script("arguments[0].click();", clickable)
            print("clicked row element")
            time.sleep(1)
        except Exception as e:
            print(f"Error clicking row: {e}")
            continue

except Exception as e:
    print(f"Major error: {e}")
finally:
    if mydriver:
        mydriver.quit()