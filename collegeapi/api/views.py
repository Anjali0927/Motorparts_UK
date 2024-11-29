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

    def destroy(self, request, *args, **kwargs):
        try:
            course = self.get_object()
            course.delete()

            return Response(
                {'message': 'Course deleted successfully.'}, 
                status=status.HTTP_204_NO_CONTENT
            )

        except Course.DoesNotExist:
            return Response(
                {'error': 'Course not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class LecturerViewSet(viewsets.ModelViewSet): 
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            course = self.get_object()
            lecturer.delete()

            return Response(
                {'message': 'Lecturer deleted successfully.'}, 
                status=status.HTTP_204_NO_CONTENT
            )

        except Lecturer.DoesNotExist:
            return Response(
                {'error': 'Lecturer not found'},
                status=status.HTTP_404_NOT_FOUND
            )

class StudentViewSet(viewsets.ModelViewSet): 
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            student = self.get_object()
            student.delete()

            return Response(
                {'message': 'Student deleted successfully.'}, 
                status=status.HTTP_204_NO_CONTENT
            )

        except Course.DoesNotExist:
            return Response(
                {'error': 'Student not found'},
                status=status.HTTP_404_NOT_FOUND
            )
