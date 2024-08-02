from django.db import models

class ParentContact(models.Model):
    first_name = models.CharField(max_length=50, verbose_name="First Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    phone = models.CharField(max_length=15, verbose_name="Phone")  
    email = models.EmailField(max_length=254, verbose_name="Email")
    address = models.TextField(max_length=200, verbose_name="Address")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Student(models.Model):
    first_name = models.CharField(max_length=50, verbose_name="First Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    date_of_birth = models.DateField(verbose_name="Date of Birth")
    gender = models.CharField(max_length=10, verbose_name="Gender")
    grade = models.CharField(max_length=20, verbose_name="Grade")
    parent_contact = models.ForeignKey(ParentContact, on_delete=models.CASCADE, verbose_name="Parent Contact")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Subject(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name")
    grade_level = models.CharField(max_length=20, verbose_name="Grade Level")

    def __str__(self):
        return self.name

class Instructor(models.Model):
    first_name = models.CharField(max_length=50, verbose_name="First Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    email = models.EmailField(max_length=254, verbose_name="Email")
    phone = models.CharField(max_length=15, verbose_name="Phone")  

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="Student")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name="Subject")
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, verbose_name="Instructor")

    def __str__(self):
        return f"{self.student} - {self.subject}"

class ClassSession(models.Model):
    DAY_TYPES = (
        ('A', 'A Day'),
        ('B', 'B Day'),
    )

    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name="Subject")
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, verbose_name="Instructor")
    date = models.DateField(verbose_name="Date")
    start_time = models.TimeField(verbose_name="Start Time")
    end_time = models.TimeField(verbose_name="End Time")
    day_type = models.CharField(max_length=1, choices=DAY_TYPES, verbose_name="Day Type")

    def __str__(self):
        return f"{self.subject} - {self.date} ({self.day_type})"

class Attendance(models.Model):
    STATUS_CHOICES = (
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Late', 'Late'),
        ('Excused', 'Excused'),
    )

    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="Student")
    class_session = models.ForeignKey(ClassSession, on_delete=models.CASCADE, verbose_name="Class Session")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, verbose_name="Status")

    def __str__(self):
        return f"{self.student} - {self.class_session} - {self.status}"
    

class CustomUser(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(max_length=254, unique=True, null=False, blank=False)
    instructors = models.ManyToManyField(Instructor, related_name='customusers')

    def __str__(self):
        return self.username

