#from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Course, Lecturer, Student 
from .serializers import CourseSerializer, LecturerSerializer, StudentSerializer

# Create your views here.
class CourseViewSet(viewsets.ModelViewSet): 
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class LecturerViewSet(viewsets.ModelViewSet): 
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer

class StudentViewSet(viewsets.ModelViewSet): 
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentByNumberDetail(APIView):
    def get(self, request, student_number):
        try:
            student = Student.objects.get(student_number=student_number)
            serializer = StudentSerializer(student)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
