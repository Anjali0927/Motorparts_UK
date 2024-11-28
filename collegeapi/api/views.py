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
        
    def post(self, request, student_number):
        data = request.data
        data['student_number'] = student_number
        serializer = StudentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, student_number):
        try:
            student = Student.objects.get(student_number=student_number)
            serializer = StudentSerializer(student, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, student_number):
        try:
            student = Student.objects.get(student_number=student_number)
            student.delete()
            return Response({'message': 'Student deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)