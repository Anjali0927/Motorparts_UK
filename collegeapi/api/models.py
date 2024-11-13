from django.db import models

# Create your models here.
class Lecturer(models.Model): 
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100) 
    email = models.EmailField() 
    staff_number = models.CharField(max_length=10) 

    def __str__(self): 
        return f"{self.first_name} {self.last_name}" 

class Student(models.Model): 
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100) 
    email = models.EmailField() 
    student_number = models.CharField(max_length=10) 

    def __str__(self): 
        return f"{self.first_name} {self.last_name}"
    
class Course(models.Model): 
    title = models.CharField(max_length=200) 
    description = models.TextField() 
    lecturer = models.ForeignKey(Lecturer, on_delete=models.SET_NULL, null=True, blank=True) 
    students = models.ManyToManyField(Student, blank=True) 

    def __str__(self): 
        return self.title
