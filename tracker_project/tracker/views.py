from rest_framework import viewsets
from .models import ParentContact, Student, Subject, Instructor, Enrollment, ClassSession, Attendance
from .serializers import ParentContactSerializer, StudentSerializer, SubjectSerializer, InstructorSerializer, EnrollmentSerializer, ClassSessionSerializer, AttendanceSerializer

class ParentContactViewSet(viewsets.ModelViewSet):
    queryset = ParentContact.objects.all()
    serializer_class = ParentContactSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class ClassSessionViewSet(viewsets.ModelViewSet):
    queryset = ClassSession.objects.all()
    serializer_class = ClassSessionSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


