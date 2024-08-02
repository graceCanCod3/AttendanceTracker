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
    path('customusers/', views.CustomUserList.as_view(), name="customuser_list"),
    path('customusers/<int:pk>', views.CustomUserDetail.as_view(), name="customuser_detail"),
    path('customusers/<int:customuser_id>/add_instructor/', views.add_instructor_to_customuser, name='add_instructor_to_customuser'),
    path('customusers/<int:customuser_id>/remove_instructor/', views.remove_instructor_from_customuser, name='remove_instructor_from_customuser'),
    path('login/', views.login_user, name='login_user'),
]
