from urllib.request import urlretrieve
from selenium import webdriver
import time
import os

driver = webdriver.Chrome('./chromedriver')

def infiniteScroll():
    global driver
    SCROLL_PAUSE_TIME = 5

    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(SCROLL_PAUSE_TIME)
        new_height = driver.execute_script("return document.body.scrollHeight")
        
        if new_height == last_height:
            break
        last_height = new_height

def getPhotos():
    global driver
    
    driver.get('https://www.shutterstock.com/search/smile?image_type=photo')
    
    infiniteScroll();
    
    smiles = driver.find_elements_by_xpath("//img")
    smileCount = len(smiles)
   
    for x in range(smileCount):
        smileSrc = smiles[x].get_attribute('src')
        '{:0>3}'.format(x)
        filename = "smile" + str(x) + ".png"
        fullfilename = os.path.join('images', filename)
        urlretrieve(smileSrc, fullfilename)
        
    driver.get('https://www.shutterstock.com/search/frown?image_type=photo')
    
    infiniteScroll();
    
    frowns = driver.find_elements_by_xpath("//img")
    frownCount = len(frowns)
    
    for x in range(frownCount):
        frownSrc = frowns[x].get_attribute('src')
        '{:0>3}'.format(x)
        filename = "frown" + str(x) + ".png"
        fullfilename = os.path.join('images', filename)
        urlretrieve(frownSrc, fullfilename)
            

if __name__ == '__main__':
    getPhotos()
