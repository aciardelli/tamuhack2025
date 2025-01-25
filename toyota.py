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
    
    # First try to find and close the overlapping filters button
    try:
        filters_btn = mydriver.find_element(By.ID, "cs-btn-filters")
        filters_btn.click()
    except:
        print("Could not find filters button")

    time.sleep(5)
    
    wait = WebDriverWait(mydriver, 10)
    tbody = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "#carsheet")))
    rows = tbody.find_elements(By.CSS_SELECTOR, "tr")


    print(len(rows))

    print(tbody)

    first_row = rows[1]

    print("first row: ", first_row.get_attribute("textContent"))

    time.sleep(2)

    mydriver.execute_script("arguments[0].click()", first_row)

    time.sleep(5)

finally:
    print("done")
    
    # for row in rows:
    #     try:
    #         clickable = row.find_element(By.CSS_SELECTOR, "td")
    #         mydriver.execute_script("arguments[0].scrollIntoView(true);", clickable)
    #         time.sleep(1)
    #         mydriver.execute_script("arguments[0].click();", clickable)
    #         print("clicked row element")
    #         time.sleep(1)
    #     except Exception as e:
    #         print(f"Error clicking row: {e}")
    #         continue

# except Exception as e:
#     print(f"Major error: {e}")
# finally:
#     if mydriver:
#         mydriver.quit()
