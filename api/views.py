from rest_framework import viewsets

from api.models import Car
from api.serializers import CarSerializer, ShortCarInfoSerializer


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    info_serializer_class = ShortCarInfoSerializer

    def get_serializer_class(self):
        if all((self.request.method == "GET",
                self.request.query_params.get("answer_format", "full") == "info")):
            return self.info_serializer_class
        return self.serializer_class
