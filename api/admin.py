from django.contrib import admin
from .models import User, SalesTeam, Customer, Location, Opportunity, Client

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'position', 'email', 'role')
    search_fields = ('first_name', 'last_name', 'email')

admin.site.register(SalesTeam)
admin.site.register(Customer)
admin.site.register(Location)
admin.site.register(Opportunity)
admin.site.register(Client)