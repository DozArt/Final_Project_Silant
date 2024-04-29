from rest_framework import serializers
from .models import Machine, Maintenance, Claim, CatalogRecord


class CatalogRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogRecord
        fields = ['id', 'entity_name', 'name', 'description']


class MachineSerializer(serializers.ModelSerializer):
    engine_model = CatalogRecordSerializer()

    class Meta:
        model = Machine
        fields = '__all__'

    def create(self, validated_data):
        catalog_record_data = validated_data.pop('engine_model')

        engine_model = CatalogRecord.objects.create(**catalog_record_data)

        machine = Machine.objects.create(engine_model=engine_model, **validated_data)
        return machine


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'


class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'
