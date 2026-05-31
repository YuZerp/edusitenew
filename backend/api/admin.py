from django.contrib import admin
from .models import Application

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'subject', 'grade', 'created_at', 'is_processed']
    list_filter = ['subject', 'grade', 'is_processed']
    search_fields = ['name', 'phone']