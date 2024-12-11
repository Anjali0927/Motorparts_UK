    #from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
    



