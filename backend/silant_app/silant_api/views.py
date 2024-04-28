from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions

from .serializers import MachineSerializer, MaintenanceSerializer, ClaimSerializer
from .models import Machine, Maintenance, Claim


class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer


class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer


class ClaimViewSet(viewsets.ModelViewSet):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
