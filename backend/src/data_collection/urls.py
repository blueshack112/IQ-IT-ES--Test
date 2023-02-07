from django.urls import path, include
from rest_framework import routers

from data_collection.views import PricePointViewSet, CurrencyViewSet

router = routers.DefaultRouter()
router.register(r"pricepoints", PricePointViewSet)
router.register(r"currencies", CurrencyViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
