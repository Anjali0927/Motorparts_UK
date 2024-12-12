from django.core.management.base import BaseCommand
from api.models import Location, User, Client

class Command(BaseCommand):
    help = 'Load persona data into the database'

[
    {
        "model": "api.location",
        "pk": 1,
        "fields": {
            "name": "Head Office",
            "address": "123 Main Street",
            "city": "London",
            "county": "Greater London",
            "postcode": "E1 6AN"
        }
    },
    {
        "model": "api.location",
        "pk": 2,
        "fields": {
            "name": "Warehouse North",
            "address": "456 Northern Road",
            "city": "Manchester",
            "county": "Greater Manchester",
            "postcode": "M1 2AB"
        }
    },
    {
        "model": "api.location",
        "pk": 3,
        "fields": {
            "name": "Warehouse South",
            "address": "789 Southern Lane",
            "city": "Bristol",
            "county": "Bristol",
            "postcode": "BS1 5QX"
        }
    },
    {
        "model": "api.user",
        "pk": 1,
        "fields": {
            "first_name": "John",
            "last_name": "Doe",
            "position": "Manager",
            "phone_number": "0123456789",
            "email": "john.doe@motorpartsuk.com",
            "role": "admin"
        }
    },
    {
        "model": "api.user",
        "pk": 2,
        "fields": {
            "first_name": "Jane",
            "last_name": "Smith",
            "position": "Sales Representative",
            "phone_number": "0987654321",
            "email": "jane.smith@motorpartsuk.com",
            "role": "sales"
        }
    },
    {
        "model": "api.client",
        "pk": 1,
        "fields": {
            "name": "Tech Innovators",
            "industry": "Automotive",
            "contact": "Jane Smith",
            "active": True
        }
    },
    {
        "model": "api.client",
        "pk": 2,
        "fields": {
            "name": "Auto World",
            "industry": "Retail",
            "contact": "John Brown",
            "active": True
        }
    },
    {
        "model": "api.customer",
        "pk": 1,
        "fields": {
            "first_name": "Alice",
            "last_name": "Johnson",
            "contact_info": "alice.johnson@example.com",
            "address": "123 Elm Street",
            "customer_type": "Garage",
            "location": 1,
            "client": 1
        }
    },
    {
        "model": "api.customer",
        "pk": 2,
        "fields": {
            "first_name": "Bob",
            "last_name": "Williams",
            "contact_info": "bob.williams@example.com",
            "address": "456 Oak Street",
            "customer_type": "Retailer",
            "location": 2,
            "client": 2
        }
    },
    {
        "model": "api.sales_team",
        "pk": 1,
        "fields": {
            "name": "Sales Team A",
            "manager": 1,
            "sales_reps": [2],
            "customers": [1, 2]
        }
    },
    {
        "model": "api.opportunity",
        "pk": 1,
        "fields": {
            "name": "Opportunity 1",
            "description": "A great opportunity to expand our services.",
            "value": "50000.00",
            "status": "proposal_sent",
            "customer": 1,
            "sales_team": 1,
            "location": 1
        }
    },
    {
        "model": "api.opportunity",
        "pk": 2,
        "fields": {
            "name": "Opportunity 2",
            "description": "Potential partnership with a large automotive retailer.",
            "value": "120000.00",
            "status": "qualified",
            "customer": 2,
            "sales_team": 1,
            "location": 2
        }
    }
]
