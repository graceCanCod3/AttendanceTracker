from rest_framework import serializers
from .models import ParentContact, Student, Subject, Instructor, Enrollment, ClassSession, Attendance, CustomUser

class ParentContactSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ParentContact
        fields = ['url', 'id', 'first_name', 'last_name', 'phone', 'email', 'address']

class StudentSerializer(serializers.HyperlinkedModelSerializer):
    parent_contact = serializers.HyperlinkedRelatedField(view_name='parentcontact-detail', queryset=ParentContact.objects.all())

    class Meta:
        model = Student
        fields = ['url', 'id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'grade', 'parent_contact']

class SubjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Subject
        fields = ['url', 'id', 'name', 'grade_level']

class InstructorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Instructor
        fields = ['url', 'id', 'first_name', 'last_name', 'email', 'phone']

class EnrollmentSerializer(serializers.HyperlinkedModelSerializer):
    student = serializers.HyperlinkedRelatedField(view_name='student-detail', queryset=Student.objects.all())
    subject = serializers.HyperlinkedRelatedField(view_name='subject-detail', queryset=Subject.objects.all())
    instructor = serializers.HyperlinkedRelatedField(view_name='instructor-detail', queryset=Instructor.objects.all())

    class Meta:
        model = Enrollment
        fields = ['url', 'id', 'student', 'subject', 'instructor']

class ClassSessionSerializer(serializers.HyperlinkedModelSerializer):
    subject = serializers.HyperlinkedRelatedField(view_name='subject-detail', queryset=Subject.objects.all())
    instructor = serializers.HyperlinkedRelatedField(view_name='instructor-detail', queryset=Instructor.objects.all())

    class Meta:
        model = ClassSession
        fields = ['url', 'id', 'subject', 'instructor', 'date', 'start_time', 'end_time', 'day_type']

class AttendanceSerializer(serializers.HyperlinkedModelSerializer):
    student = serializers.HyperlinkedRelatedField(view_name='student-detail', queryset=Student.objects.all())
    class_session = serializers.HyperlinkedRelatedField(view_name='classsession-detail', queryset=ClassSession.objects.all())

    class Meta:
        model = Attendance
        fields = ['url', 'id', 'student', 'class_session', 'status']

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    instructor = InstructorSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'email', 'instructor')