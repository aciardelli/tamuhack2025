from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException, StaleElementReferenceException
import time
from selenium.webdriver.firefox.options import Options

profile_path = r"/Users/aciardelli/Library/Application Support/Firefox/Profiles/o9yia4xu.default-release"
options = Options()
options.set_preference('profile', profile_path)
options.set_preference('browser.startup.homepage_override.mstone', '')
options.set_preference('startup.homepage_welcome_url.additional', '')
options.add_argument('-profile')
options.add_argument(profile_path)
mydriver = webdriver.Firefox(options=options)

url = "https://carsheet.io/toyota/"
mydriver.get(url)
time.sleep(3)

try:
    wait = WebDriverWait(mydriver, 10)
    tbody = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "tbody")))
    rows = tbody.find_elements(By.TAG_NAME, "tr")
    for row in rows:
        print(row.get_attribute('innerHTML'))

except:
    print("There was an error")