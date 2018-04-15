import uuid
from django.db import models

DRIVE_TYPES = (
    ("full", "Повний"),
    ("front", "Передній"),
    ("back", "Задній"),
)

FUEL_TYPES = (
    ("petrol", "Бензин"),
    ("diesel", "Дизель"),
    ("gas", "Газ"),
    ("gas_petrol", "Газ/Бензин"),
    ("hybrid", "Гібрид"),
    ("electric", "Електро"),
    ("other", "Інше"),
)

TRANSMISSION_TYPES = (
    ("manual", "Ручна/Механіка"),
    ("auto", "Автомат"),
    ("tiptronic", "Типтронік"),
    ("adaptive", "Адаптивна"),
    ("variator", "Варіатор"),
)

TRANSPORT_TYPES = (
    ("car", "Легкові"),
    ("moto", "Мото"),
    ("special", "Спецтехніка"),
    ("truck", "Вантажівки"),
    ("trailer", "Причепи"),
    ("bus", "Автобуси"),
    ("motorhome", "Автобудинки"),
    ("water", "Водний"),
    ("air", "Повітряний"),
)


class Car(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name="Ідентифікатор [ID]")
    name = models.CharField(max_length=100, unique=True, verbose_name="Марка авто")
    description = models.TextField(max_length=1500, blank=True, default="", verbose_name="Опис")
    city = models.CharField(max_length=100, default="Чернівці", verbose_name="Місто")
    color = models.CharField(max_length=100, default="Чорний", verbose_name="Колір")
    owner_phone = models.CharField(max_length=100, blank=True, default="", verbose_name="Телефон власника")
    fuel_costs = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Витрати пального")
    price = models.BigIntegerField(default=0, verbose_name="Ціна")
    mileage = models.BigIntegerField(default=0, verbose_name="Пробіг")
    volume = models.DecimalField(max_digits=8, decimal_places=2, verbose_name="Об'єм")
    drive_type = models.CharField(max_length=20, choices=DRIVE_TYPES, default="full", verbose_name="Тип приводу")
    fuel = models.CharField(max_length=20, choices=FUEL_TYPES, default="petrol", verbose_name="Паливо")
    transmission = models.CharField(max_length=20, choices=TRANSMISSION_TYPES, default="manual",
                                    verbose_name="Коробка передач")
    transport_type = models.CharField(max_length=20, choices=TRANSPORT_TYPES, default="car",
                                      verbose_name="Тип транспорту")
    abs = models.BooleanField(default=False, verbose_name="ABS")
    airbag = models.BooleanField(default=True, verbose_name="Подушка безпеки")
    alarms = models.BooleanField(default=False, verbose_name="Сигналізація")
    central_lock = models.BooleanField(default=False, verbose_name="Центральний замок")
    image = models.ImageField(default="", upload_to="car_images", verbose_name="Зображення")
