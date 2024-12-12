from django.db import models

from django.db import models

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    county = models.CharField(max_length=100)
    postcode = models.CharField(max_length=20)  

    def __str__(self): 
        return self.name
    
class User(models.Model): 
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100) 
    position = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True) 
    role = models.CharField(max_length=50) 

    def __str__(self): 
        return f"{self.first_name} {self.last_name}" 

class Client(models.Model): 
    name = models.CharField(max_length=100)
    industry = models.CharField(max_length=50)
    contact = models.CharField(max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self): 
        return self.name

class Customer(models.Model):
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100) 
    contact_info = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    customer_type = models.CharField(max_length=50)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, default=1)

    def __str__(self): 
        return f"{self.first_name} {self.last_name}" 
    
class SalesTeam(models.Model):
    name = models.CharField(max_length=100)
    manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leader')
    sales_reps = models.ManyToManyField(User, related_name='members')
    customers = models.ManyToManyField(Customer, related_name='sales_teams')

    def __str__(self): 
        return self.name

class Opportunity(models.Model):
    STATUS_CHOICES = [
    ('new', 'New'),
    ('qualified', 'Qualified'),
    ('proposal_sent', 'Proposal Sent'),
    ('negotiation', 'Negotiation'),
    ('won', 'Won'),
    ('lost', 'Lost'),
    ('on_hold', 'On Hold'),
    ('closed', 'Closed'),
    ('disqualified', 'Disqualified'),
    ('follow_up', 'Follow-Up Required'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='new')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    sales_team = models.ForeignKey(SalesTeam, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

    def __str__(self): 
        return self.name

