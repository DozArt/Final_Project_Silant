from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework import permissions, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes

from .serializers import UserSerializer, MachineSerializer, MaintenanceSerializer, ClaimSerializer, CatalogRecordSerializer
from .models import Machine, Maintenance, Claim, CatalogRecord


class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class CatalogRecordViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CatalogRecord.objects.all()
    serializer_class = CatalogRecordSerializer
    permission_classes = [permissions.AllowAny]


class MachineViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['serial_number']

    def get_queryset(self):
        user = self.request.user  # Получаем текущего пользователя
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
    filter_backends = [filters.SearchFilter]
    search_fields = ['machine__id']  # поверь функционал

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='service_company').exists():
            # Фильтруем записи по авторизованному пользователю
            return Maintenance.objects.filter(servicing_organization=user)
        elif user.groups.filter(name='client').exists():
            return Maintenance.objects.filter(machine__client=user)


class ClaimViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
