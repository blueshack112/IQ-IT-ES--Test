# -*- coding: utf-8 -*-
"""
"""
from django.core.management import BaseCommand

from data_collection.models import Currency


class Command(BaseCommand):
    def handle(self, *args, **options):
        currencies = [
            ("ARS", None, False),
            ("AUD", "Australian Dollar", False),
            ("BRL", None, False),
            ("CAD", "Canadian Dollar", False),
            ("CHF", None, False),
            ("CLP", None, False),
            ("CNY", None, False),
            ("CZK", None, False),
            ("DKK", None, False),
            ("EUR", "Euro", False),
            ("GBP", "Great Britian Pount", False),
            ("HKD", None, False),
            ("HRK", None, False),
            ("HUF", None, False),
            ("INR", "Indian Rupee", False),
            ("ISK", None, False),
            ("JPY", "Japanese Yen", False),
            ("KRW", None, False),
            ("NZD", None, False),
            ("PLN", None, False),
            ("RON", None, False),
            ("RUB", "Russian Rubels", False),
            ("SEK", None, False),
            ("SGD", None, False),
            ("THB", None, False),
            ("TRY", None, False),
            ("TWD", None, False),
            ("USD", "United States Dollar", False),
            ("BTC", "Bitcoin", True),
        ]

        for currency_symbol, name, is_crypto in currencies:
            Currency.objects.get_or_create(
                name=name, currency_symbol=currency_symbol, is_crypto=is_crypto
            )
