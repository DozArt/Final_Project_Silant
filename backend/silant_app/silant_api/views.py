from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions

from .serializers import MachineSerializer, MaintenanceSerializer, ClaimSerializer, CatalogRecordSerializer
from .models import Machine, Maintenance, Claim, CatalogRecord


class CatalogRecordViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CatalogRecord.objects.all()
    serializer_class = CatalogRecordSerializer
    permission_classes = [permissions.AllowAny]


class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer


class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer


class ClaimViewSet(viewsets.ModelViewSet):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
