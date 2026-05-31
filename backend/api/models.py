from django.db import models

class Application(models.Model):
    SUBJECT_CHOICES = [
        ('Математика', 'Математика'),
        ('Русский язык', 'Русский язык'),
        ('Обществознание', 'Обществознание'),
        ('Физика', 'Физика'),
        ('Информатика', 'Информатика'),
        ('Английский язык', 'Английский язык'),
        ('Химия', 'Химия'),
        ('Биология', 'Биология'),
        ('История', 'История'),
        ('Литература', 'Литература'),
    ]
    
    GRADE_CHOICES = [
        ('9', '9 класс (ОГЭ)'),
        ('10', '10 класс (ЕГЭ)'),
        ('11', '11 класс (ЕГЭ)'),
    ]
    
    name = models.CharField(max_length=100, verbose_name='Имя')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES, verbose_name='Предмет')
    grade = models.CharField(max_length=2, choices=GRADE_CHOICES, verbose_name='Класс')
    brief = models.TextField(blank=True, verbose_name='Пожелания')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    is_processed = models.BooleanField(default=False, verbose_name='Обработано')
    
    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.name} - {self.subject} ({self.created_at.strftime("%d.%m.%Y")})'