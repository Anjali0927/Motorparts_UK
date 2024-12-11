from rest_framework import serializers 
from .models import User, Customer, SalesTeam, Location, Opportunity, Client

class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = User
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Customer
        fields = '__all__'

class SalesTeamSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = SalesTeam
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Location
        fields = '__all__'

class OpportunitySerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Opportunity
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Client
        fields = '__all__'