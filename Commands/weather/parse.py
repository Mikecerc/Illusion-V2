
import requests
from bs4 import BeautifulSoup

def getPageData(url): 
    data = requests.get(url)
    return data

data = getPageData("https://www.wunderground.com/dashboard/pws/KMICANTO99")
soup = BeautifulSoup(data.content, 'html.parser')
print(soup.find(class_='main-temp').get_text().encode('ascii', errors='ignore').decode('UTF-8'))
print('-', soup.find(class_='feels-like-temp weather__header').get_text().encode('ascii', errors='ignore').decode('UTF-8'))
print('-', soup.find(class_='wind-dial__container').get_text().encode('ascii', errors='ignore').decode('UTF-8'))
print('-', soup.find(class_='weather__text').get_text().encode('ascii', errors='ignore').decode('UTF-8'))
sum = ''
for val in soup.find(class_='weather__summary'):
    sum = sum + '-' + val.get_text()
newVal = sum.replace('F', '').replace('DEWPOINT', '').replace('PRECIP RATE', '').replace('PRESSURE', '').replace(' ', '').replace('°', '').replace('in/hr', '').replace('in', '').replace('HUMIDITY', '').replace('-UV--','').replace('PRECIPACCUM', '').replace('%','')
print(newVal.encode('ascii', errors='ignore').decode('UTF-8'))