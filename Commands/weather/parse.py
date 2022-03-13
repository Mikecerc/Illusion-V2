import requests
from bs4 import BeautifulSoup

def getPageData(url): 
    data = requests.get(url)
    return data

data = getPageData("https://www.wunderground.com/dashboard/pws/KMICANTO99")
soup = BeautifulSoup(data.content, 'html.parser')
print(soup.find(class_='main-temp').get_text())
print('\\', soup.find(class_='feels-like-temp weather__header').get_text())
print('\\', soup.find(class_='wind-dial__container').get_text())
print('\\', soup.find(class_='weather__text').get_text())
sum = ''
for val in soup.find(class_='weather__summary'):
    sum = sum + '\\' + val.get_text()
print(sum.replace('° F', '').replace('°F', '').replace('DEWPOINT', '').replace('PRECIP RATE', '').replace('PRESSURE', '').replace(' ', '').replace('°', '').replace('in/hr', '').replace('in', '').replace('HUMIDITY', '').replace('\\UV--','').replace('PRECIPACCUM', '').replace('%',''))