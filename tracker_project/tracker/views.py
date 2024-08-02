from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics, status
from .models import ParentContact, Student, Subject, Instructor, Enrollment, ClassSession, Attendance, CustomUser
from .serializers import (
    ParentContactSerializer, StudentSerializer, SubjectSerializer, InstructorSerializer, 
    EnrollmentSerializer, ClassSessionSerializer, AttendanceSerializer, 
    CustomUserSerializer, CustomUserEventSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import api_view

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

class CustomUserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class CustomUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

@api_view(['POST'])
def add_instructor_to_customuser(request, customuser_id):
    customuser = get_object_or_404(CustomUser, id=customuser_id)
    serializer = CustomUserEventSerializer(data=request.data)
    if serializer.is_valid():
        instructor_id = serializer.validated_data['instructor_id']
        instructor = get_object_or_404(Instructor, id=instructor_id)
        customuser.instructors.add(instructor)
        return Response({'status': 'Instructor added'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def remove_instructor_from_customuser(request, customuser_id):
    customuser = get_object_or_404(CustomUser, id=customuser_id)
    serializer = CustomUserEventSerializer(data=request.data)
    if serializer.is_valid():
        instructor_id = serializer.validated_data['instructor_id']
        instructor = get_object_or_404(Instructor, id=instructor_id)
        customuser.instructors.remove(instructor)
        return Response({'status': 'Instructor removed'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = CustomUser.objects.get(username=username, password=password)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
