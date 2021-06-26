import requests
from bs4 import BeautifulSoup

remote_db_url = 'https://www.techpowerup.com/cpu-specs'


def collect_info(cpu_name: str):
    request = requests.get(
        url=remote_db_url,
        params={
            'sort': 'name'
        }

    )


soup = BeautifulSoup(requests.get('https://www.techpowerup.com/cpu-specs/?sort=name#Intel%Core%i3-4160').content,
                     'html.parser')
print(soup.prettify())
