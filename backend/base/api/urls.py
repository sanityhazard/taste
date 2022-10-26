from django.urls import path
from . import views
from .views import MyTokenObtainPairView, RegisterView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('movies/', views.get_movies, name='get_movies'),
    path('imdb_page/', views.get_imdb_page, name='get_imdb_page'),
    path('add_match/', views.add_match, name='add_match'),
    path('get_matches/', views.get_matches, name='get_matches')
]