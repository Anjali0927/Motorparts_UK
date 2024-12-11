from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter() 
router.register(r'users', views.UserViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'salesteams', views.SalesTeamViewSet)
router.register(r'locations', views.LocationViewSet)
router.register(r'opportunities', views.OpportunityViewSet)
router.register(r'clients', views.ClientViewSet)


urlpatterns = [ 
    path('', include(router.urls)),
]