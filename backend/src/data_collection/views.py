# Create your views here.
from rest_framework.viewsets import ModelViewSet

from data_collection.models import PricePoint, Currency
from data_collection.serializers import PricePointSerializer, CurrencySerializer


class PricePointViewSet(ModelViewSet):
    serializer_class = PricePointSerializer
    queryset = PricePoint.objects.all()

    def get_queryset(self):
        selected_currency_symbol = self.request.query_params.get("currency", "USD")
        queryset = super().get_queryset()
        return queryset.filter(to_currency__currency_symbol=selected_currency_symbol)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class CurrencyViewSet(ModelViewSet):
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()
