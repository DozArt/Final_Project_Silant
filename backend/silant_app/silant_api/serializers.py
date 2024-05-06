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


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'


class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'
