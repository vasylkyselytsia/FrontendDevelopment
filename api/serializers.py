from rest_framework import serializers

from api.models import Car


class CarSerializer(serializers.ModelSerializer):

    def to_representation(self, obj):
        data = super().to_representation(obj)
        data["image"] = str(obj.image) if obj.image else None
        return data

    class Meta:
        model = Car
        exclude = ()


class ShortCarInfoSerializer(CarSerializer):

    class Meta:
        model = Car
        fields = ("id", "name", "price", "volume", "city", "drive_type", "fuel", "transmission", "image")
