from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter() 
router.register(r'courses', views.CourseViewSet) 
router.register(r'lecturers', views.LecturerViewSet) 
router.register(r'students', views.StudentViewSet)

urlpatterns = [ 
    path('', include(router.urls)),
    # path('student/number/<str:student_number>/', views.StudentByNumberDetail.as_view(), name='student_by_number_detail'),
]