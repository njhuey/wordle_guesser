import json
import os
import requests
from bs4 import BeautifulSoup

response = requests.get("https://www.nytimes.com/games/wordle/index.html")


def get_site_content():
    """
    util function to get content of web site to scrape
    """
    content = ""
    try:
        content = requests.get("https://www.nytimes.com/games/wordle/index.html").content
    except Exception as err:
        print(err)
    return content


def get_wordle_for_today():
    """
    web-scrapes wordle of the day from given site
    """
    wordle_for_today = None
    try:
        content = get_site_content()
        soup = BeautifulSoup(content, "html5lib")
        print(soup.prettify())
    #     wordle_for_today = header[0].get_text()
    #     return wordle_for_today
    except Exception as err:
        print(err)


print(get_wordle_for_today())
