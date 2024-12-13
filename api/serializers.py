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
        manager = UserSerializer(read_only=True)
        sales_reps = UserSerializer(many=True, read_only=True)
        customers = CustomerSerializer(many=True, read_only=True)


class LocationSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Location
        fields = '__all__'

class OpportunitySerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    sales_team = serializers.PrimaryKeyRelatedField(queryset=SalesTeam.objects.all())
    location = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all())

    class Meta:
        model = Opportunity
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Client
        fields = '__all__'

class StatusCountSerializer(serializers.Serializer):
    status = serializers.CharField()
    count = serializers.IntegerField()
