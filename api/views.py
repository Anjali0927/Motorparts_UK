    #from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg
from .serializers import StatusCountSerializer
from .models import User, Customer, SalesTeam, Location, Opportunity, Client
from .serializers import UserSerializer, CustomerSerializer, SalesTeamSerializer, LocationSerializer, OpportunitySerializer, ClientSerializer

# Create your views here.
class UserViewSet(viewsets.ModelViewSet): 
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomerViewSet(viewsets.ModelViewSet): 
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class SalesTeamViewSet(viewsets.ModelViewSet): 
    queryset = SalesTeam.objects.all()
    serializer_class = SalesTeamSerializer

class LocationViewSet(viewsets.ModelViewSet): 
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class OpportunityViewSet(viewsets.ModelViewSet): 
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

class ClientViewSet(viewsets.ModelViewSet): 
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class StatusCountView(APIView):
    def get(self, request, *args, **kwargs):
        status_counts = Opportunity.objects.values('status').annotate(count=Count('status'))
        serializer = StatusCountSerializer(status_counts, many=True)
        return Response(serializer.data)

class TotalRevenueView(APIView):
    def get(self, request, *args, **kwargs):
        total_revenue = Opportunity.objects.filter(status='won').aggregate(total_revenue=Sum('value'))
        return Response(total_revenue)

class ActiveClientsView(APIView):
    def get(self, request, *args, **kwargs):
        active_clients_count = Client.objects.filter(active=True).count()
        return Response({'active_clients': active_clients_count})

class CustomersByLocationView(APIView):
    def get(self, request, *args, **kwargs):
        customers_by_location = Customer.objects.values('location__name').annotate(count=Count('id'))
        return Response(customers_by_location)

class SalesTeamPerformanceView(APIView):
    def get(self, request, *args, **kwargs):
        sales_team_performance = Opportunity.objects.values('sales_team__name').annotate(count=Count('id'))
        return Response(sales_team_performance)

class AverageDealSizeView(APIView):
    def get(self, request, *args, **kwargs):
        average_deal_size = Opportunity.objects.aggregate(average_value=Avg('value'))
        return Response(average_deal_size)


