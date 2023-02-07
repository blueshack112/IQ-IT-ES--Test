import requests
from celery import shared_task
from django.conf import settings

from data_collection.models import Currency, PricePoint


@shared_task
def collect_current_btc_price():
    """
    Calls an API to get current BTC price point in multiple currencies and updates the database
    """
    response = requests.get(settings.BTC_EXCHANGE_RATE_API_URL)
    price_points_dict = response.json()

    if response.status_code != 200:
        return

    for price_point_to_symbol in price_points_dict:
        price_point_dict = price_points_dict[price_point_to_symbol]
        if (
            price_point_to_symbol
            in Currency.objects.filter(currency_symbol=price_point_to_symbol)[
                0
            ].currency_symbol
        ):
            objs = PricePoint.objects.get_or_create(
                from_currency=Currency.objects.get(currency_symbol="BTC"),
                to_currency=Currency.objects.get(currency_symbol=price_point_to_symbol),
                value_15_minutes_ago=price_point_dict["15m"],
                value_now=price_point_dict["last"],
                buy=price_point_dict["buy"],
                sell=price_point_dict["sell"],
            )
