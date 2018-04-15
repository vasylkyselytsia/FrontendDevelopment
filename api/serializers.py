from rest_framework import serializers
from api.models import Car


class CarSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Car
        exclude = ()
