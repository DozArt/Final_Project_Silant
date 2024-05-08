from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import permission_classes

from .serializers import MachineSerializer, MaintenanceSerializer, ClaimSerializer, CatalogRecordSerializer
from .models import Machine, Maintenance, Claim, CatalogRecord


class CatalogRecordViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CatalogRecord.objects.all()
    serializer_class = CatalogRecordSerializer
    permission_classes = [permissions.AllowAny]


class MachineViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer

    def get_queryset(self):
        user = self.request.user  # Получаем текущего пользователя
        print(user.groups.all())
        if user.groups.filter(name='client').exists():
            # Пользователь принадлежит к указанной группе
            return Machine.objects.filter(client=user)  # Возвращаем только сущности, принадлежащие этому пользователю
        elif user.groups.filter(name='service_company').exists():
            return Machine.objects.filter(service_company=user)
        else:
            # Пользователь не принадлежит к указанной группе, возвращаем пустой queryset
            return Machine.objects.all()


class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]


class ClaimViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
