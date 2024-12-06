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
        
class TotalCoursesView(APIView):
    def get(self, request):
        count = Course.objects.count()
        return Response({'total_courses': count})

class TotalEnrolledStudentsView(APIView):
    def get(self, request):
        total_students = Course.objects.values('students').distinct().count()
        return Response({'total_enrolled_students': total_students})

class StudentsInCourseView(APIView):
    def get(self, request, course_id):
        try:
            course = Course.objects.get(pk=course_id)
            num_students = course.students.count()
            return Response({'course_id': course_id, 'students_enrolled': num_students})
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)