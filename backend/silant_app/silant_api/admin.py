from django.contrib import admin
from .models import CatalogRecord, Machine, Maintenance, Claim


admin.site.register(CatalogRecord)
admin.site.register(Machine)
admin.site.register(Maintenance)
admin.site.register(Claim)
