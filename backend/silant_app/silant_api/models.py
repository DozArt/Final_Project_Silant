from django.db import models
from django.contrib.auth.models import User


ENTITY_CHOICES = [
    ('eq', 'Техника'),
    ('en', 'Двигатель'),
    ('tr', 'Трансмиссия'),
    ('da', 'Ведущий мост'),
    ('sa', 'Управляемый мост'),
    ('mt', 'Тип ТО'),
    ('fu', 'Узел отказа'),
    ('rm', 'Способ восстановления'),
]


class CatalogRecord(models.Model):
    """
    Общая модель для справочника деталей и технических операций.

    Поля:

    - entity_name: Название сущности (название справочника)
    - name: Название записи (детали или операции)
    - description: Описание записи
    """
    entity_name = models.CharField(max_length=100, choices=ENTITY_CHOICES)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f'{[item[1] for item in ENTITY_CHOICES if item[0] == self.entity_name][0]} {self.name}'


class Machine(models.Model):
    """
    Модель, представляющая машину.

    Хранит информацию о характеристиках и комплектации проданных машин,
    а также информацию о месте эксплуатации.

    Поля:

    - serial_number: Заводской номер машины (уникальный)
    - equipment_model: Модель техники
    - engine_model: Модель двигателя
    - engine_serial_number: Заводской номер двигателя
    - transmission_model: Модель трансмиссии
    - transmission_serial_number: Заводской номер трансмиссии
    - drive_axle_model: Модель ведущего моста
    - drive_axle_serial_number: Заводской номер ведущего моста
    - steering_axle_model: Модель управляемого моста
    - steering_axle_serial_number: Заводской номер управляемого моста
    - supply_contract_number_and_date: Договор поставки №, дата
    - shipment_date: Дата отгрузки с завода
    - consignee: Грузополучатель (конечный потребитель)
    - delivery_address: Адрес поставки (эксплуатации)
    - equipment_configuration: Комплектация (доп. опции)
    - client: Связь с клиентом, который приобрел машину
    - service_company: Связь с сервисной компанией, обслуживающей машину
    """
    serial_number = models.CharField(max_length=100, unique=True)
    equipment_model = models.ForeignKey(
        CatalogRecord,
        on_delete=models.CASCADE,
        limit_choices_to={'entity_name': 'eq'},
        related_name='equipment_in_machine'
    )
    engine_model = models.ForeignKey(
        CatalogRecord,
        on_delete=models.CASCADE,
        limit_choices_to={'entity_name': 'en'},
        related_name='engine_in_machine'
    )
    engine_serial_number = models.CharField(max_length=100)
    transmission_model = models.ForeignKey(
        CatalogRecord,
        on_delete=models.CASCADE,
        limit_choices_to={'entity_name': 'tr'},
        related_name='transmission_in_machine'
    )
    transmission_serial_number = models.CharField(max_length=100)
    drive_axle_model = models.ForeignKey(
        CatalogRecord,
        on_delete=models.CASCADE,
        limit_choices_to={'entity_name': 'da'},
        related_name='drive_axle_in_machine'
    )
    drive_axle_serial_number = models.CharField(max_length=100)
    steering_axle_model = models.ForeignKey(
        CatalogRecord,
        on_delete=models.CASCADE,
        limit_choices_to={'entity_name': 'sa'},
        related_name='steering_axle_in_machine'
    )
    steering_axle_serial_number = models.CharField(max_length=100)
    supply_contract_number_and_date = models.CharField(max_length=100)
    shipment_date = models.DateField()
    consignee = models.CharField(max_length=100)
    delivery_address = models.TextField()
    equipment_configuration = models.TextField()
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='machines')
    service_company = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_machines')

    def __str__(self):
        return f'{self.equipment_model.name} ({self.serial_number}) для {self.client}'


class Maintenance(models.Model):
    """
    Модель, представляющая техническое обслуживание.

    Хранит информацию об истории проведения ТО каждой машины. Каждый объект ТО
    привязан к определенной машине. У каждой машины может быть несколько проведенных ТО.

    Поля:

    - maintenance_type: Вид ТО
    - maintenance_date: Дата проведения ТО
    - operating_hours: Наработка, м/час
    - work_order_number: Номер заказ-наряда
    - work_order_date: Дата заказ-наряда
    - servicing_organization: Организация, проводившая ТО
    - machine: Связь с машиной, к которой относится ТО
    - service_company: Сервисная компания, обслуживающая машину
    """
    maintenance_type = models.ForeignKey(
        CatalogRecord,
        on_delete=models.CASCADE,
        limit_choices_to={'entity_name': 'mt'},
        related_name='type_in_maintenances'
    )
    maintenance_date = models.DateField()
    operating_hours = models.FloatField()
    work_order_number = models.CharField(max_length=100)
    work_order_date = models.DateField()
    servicing_organization = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_maintenances')
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name='maintenance')


class Claim(models.Model):
    """
    Модель, представляющая рекламацию.

    Хранит информацию о заявленных клиентами рекламациях и сроках их устранения.

    Поля:

    - failure_date: Дата отказа
    - operating_hours: Наработка, м/час
    - failure_unit: Узел отказа
    - failure_description: Описание отказа
    - restoration_method: Способ восстановления
    - spare_parts_used: Используемые запасные части
    - restoration_date: Дата восстановления
    - machine: Связь с машиной, к которой относится рекламация
    - service_company: Сервисная компания, обслуживающая машину
    """
    failure_date = models.DateField()
    operating_hours = models.FloatField()
    failure_unit = models.ForeignKey(
        CatalogRecord,
        on_delete=models.CASCADE,
        limit_choices_to={'entity_name__in': ['sa', 'en', 'tr', 'da']},
        related_name='failure_in_clamps'
    )
    failure_description = models.TextField()
    restoration_method = models.ForeignKey(
        CatalogRecord,
        on_delete=models.CASCADE,
        limit_choices_to={'entity_name': 'rm'},
        related_name='restoration_in_clamps'
    )
    spare_parts_used = models.TextField()
    restoration_date = models.DateField()
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name='claims')
    service_company = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_claims')
