from rest_framework import serializers

from data_collection.models import PricePoint, Currency


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = "__all__"


class PricePointSerializer(serializers.ModelSerializer):
    to_currency = CurrencySerializer()

    class Meta:
        model = PricePoint
        fields = "__all__"
