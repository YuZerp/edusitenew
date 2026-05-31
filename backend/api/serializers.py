from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'name', 'phone', 'subject', 'grade', 'brief', 'created_at', 'is_processed']
        read_only_fields = ['id', 'created_at', 'is_processed']