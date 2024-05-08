from rest_framework import serializers
from .models import Machine, Maintenance, Claim, CatalogRecord


class CatalogRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogRecord
        fields = ['id', 'entity_name', 'name', 'description']


class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        user = self.context['request'].user
        if not user.is_authenticated:
            # Если пользователь не авторизован, указываем только определенные поля
            representation = {
                'id': instance.id,
                'serial_number': instance.serial_number,
                'equipment_model': instance.equipment_model.id if instance.equipment_model else None,
                'engine_model': instance.engine_model.id if instance.engine_model else None,
                'engine_serial_number': instance.engine_serial_number,
                'transmission_model': instance.transmission_model.id if instance.transmission_model else None,
                'transmission_serial_number': instance.transmission_serial_number,
                'drive_axle_model': instance.drive_axle_model.id if instance.drive_axle_model else None,
                'drive_axle_serial_number': instance.drive_axle_serial_number,
                'steering_axle_model': instance.steering_axle_model.id if instance.steering_axle_model else None,
                'steering_axle_serial_number': instance.steering_axle_serial_number,
            }

        representation['client'] = {
            'id': instance.client.id,
            'name': instance.client.first_name,
        }
        representation['service_company'] = {
            'id': instance.service_company.id,
            'name': instance.service_company.first_name,
        }
        return representation


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'


class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'
