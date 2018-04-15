from rest_framework import serializers
from api.models import Car


class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        exclude = ()


class ShortCarInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = ("id", "name", "price", "volume", "city", "drive_type", "fuel", "transmission", "image")
