from rest_framework import serializers 
from .models import Course, Lecturer, Student 

class CourseSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Course 
        fields = '__all__'

class LecturerSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Lecturer 
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Student 
        fields = '__all__'