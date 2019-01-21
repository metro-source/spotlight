import urllib
import csv
from kernel import app

def get_ves_rate():
    """
    Should return the amount of ves required to acquire a coin
    """

    """
    Parameters used to find the rate we want
    """
    CODE = "VES"
    METHOD = "Bank"

    endpoint = app.config["RATES_ENDPOINT"]
    response = urllib.request.urlopen(endpoint)

    """
    Parse the CSV
    """
    data = response.read().decode()
    rate_list = data.split("\n")
    reader = csv.DictReader(rate_list)

    """
    Filter the returned rates
    """
    rates = [ rate for rate in reader if rate["Code"] == CODE and rate["Method"] == METHOD ]

    if len(rates) > 0:
        return float(rates[0]["Rate"])
    else:
        return None