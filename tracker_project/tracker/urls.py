from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'parentcontacts', views.ParentContactViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'instructors', views.InstructorViewSet)
router.register(r'enrollments', views.EnrollmentViewSet)
router.register(r'classsessions', views.ClassSessionViewSet)
router.register(r'attendance', views.AttendanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
