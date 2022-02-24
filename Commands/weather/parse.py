import requests
from bs4 import BeautifulSoup
from lxml import etree

def getPageData(url): 
    data = requests.get(url)
    return data

data = getPageData("https://www.wunderground.com/dashboard/pws/KMICANTO99")
soup = BeautifulSoup(data.content, 'html.parser')
data0 = etree.HTML(str(soup))

print(data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[1]/div[1]/lib-display-unit/span/span[1]')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[1]/div[2]/lib-display-unit/span/span[1]')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[2]/div/div[1]/span')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[3]/div/div[2]/lib-display-unit[1]/span/span[1]')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[3]/div/div[2]/lib-display-unit[2]/span/span[1]')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[1]/div/div[2]/lib-display-unit/span/span[1]')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[2]/div/div[2]/lib-display-unit/span/span[1]')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[5]/div/div[2]/lib-display-unit/span/span[1]')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[3]/div/div[2]/lib-display-unit/span/span[1]')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[4]/div/div[2]/lib-display-unit/span/span[1]')[0].text,end="")
print('/', data0.xpath('/html/body/app-root/app-dashboard/one-column-layout/wu-header/sidenav/mat-sidenav-container/mat-sidenav-content/div/section/section[1]/div[1]/div/section/div/div/div/div[2]/div/lib-tile-current-conditions/div/div[2]/div/div[4]/div[6]/div/div[2]/lib-display-unit/span/span')[0].text,end="")