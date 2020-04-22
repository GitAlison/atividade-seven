from django.urls import path, include
from .auth import urls as urls_auth
from rest_framework import routers
from .usuarios.views import UsersViewSet

app_name = 'api'

router = routers.DefaultRouter()
router.register('user', UsersViewSet)

urlpatterns = [
    path('auth/', include(urls_auth)),
    path('', include(router.urls))
]