from rest_framework import generics, status
from rest_framework.response import Response
from .models import Application
from .serializers import ApplicationSerializer

class ApplicationListCreateView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Здесь можно добавить отправку уведомления в Telegram
        # notify_telegram(serializer.data)
        
        return Response(
            {'success': True, 'message': 'Заявка отправлена', 'data': serializer.data},
            status=status.HTTP_201_CREATED
        )

class ApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer