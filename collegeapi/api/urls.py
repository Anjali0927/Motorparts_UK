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
    path('status_counts/', views.StatusCountView.as_view(), name='status-counts'),
    path('total_revenue/', views.TotalRevenueView.as_view(), name='total-revenue'),
    path('active_clients/', views.ActiveClientsView.as_view(), name='active-clients'),
    path('customers_by_location/', views.CustomersByLocationView.as_view(), name='customers-by-location'),
    path('sales_team_performance/', views.SalesTeamPerformanceView.as_view(), name='sales-team-performance'),
    path('average_deal_size/', views.AverageDealSizeView.as_view(), name='average-deal-size'),
]

