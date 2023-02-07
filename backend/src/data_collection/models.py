import uuid

from django.db import models
from django.utils.timezone import now


def current_uuid():
    return uuid.uuid1().hex


# Create your models here.
class Currency(models.Model):
    name = models.CharField(max_length=255, null=True)
    currency_symbol = models.CharField(max_length=10, null=False)
    is_crypto = models.BooleanField(null=False, default=False)


class PricePoint(models.Model):
    collection_id = models.TextField(null=False, default=current_uuid)
    from_currency = models.ForeignKey(
        Currency, related_name="price_points_from", on_delete=models.CASCADE, null=False
    )
    to_currency = models.ForeignKey(
        Currency, related_name="price_points_to", on_delete=models.CASCADE, null=False
    )
    value_15_minutes_ago = models.FloatField(null=True, default=None)
    value_now = models.FloatField(null=True, default=None)
    buy = models.FloatField(null=True, default=None)
    sell = models.FloatField(null=True, default=None)
    created_at = models.DateTimeField(null=False, default=now)
