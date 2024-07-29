from django.contrib import admin
from .models import ParentContact, Student, Subject, Instructor, Enrollment, ClassSession, Attendance

@admin.register(ParentContact)
class ParentContactAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'phone', 'email', 'address']
    search_fields = ['first_name', 'last_name', 'email']

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'date_of_birth', 'gender', 'grade', 'parent_contact']
    search_fields = ['first_name', 'last_name']
    autocomplete_fields = ['parent_contact']

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'grade_level']
    search_fields = ['name']

@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'phone']
    search_fields = ['first_name', 'last_name']

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['student', 'subject', 'instructor']
    search_fields = ['student__first_name', 'student__last_name']
    autocomplete_fields = ['student', 'subject', 'instructor']

@admin.register(ClassSession)
class ClassSessionAdmin(admin.ModelAdmin):
    list_display = ['subject', 'instructor', 'date', 'start_time', 'end_time', 'day_type']
    search_fields = ['subject__name']
    autocomplete_fields = ['subject', 'instructor']

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['student', 'class_session', 'status']
    search_fields = ['student__first_name', 'student__last_name']
    autocomplete_fields = ['student', 'class_session']

