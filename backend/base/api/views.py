import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from base.models import Match
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import MatchSerializer, RegisterSerializer
from rest_framework import generics
import requests

API_KEY = "9e68f490ec1d62ad5443a2c10de2412f"

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)

@api_view(["GET"])
def get_movies(request):
    p = request.query_params
    res = requests.get(f"https://api.themoviedb.org/3/discover/movie?language=en-US&api_key={API_KEY}&page={p['page']}&with_genres={p['genres']}").json()
    # res2 = res = requests.get(f"https://api.themoviedb.org/3/movie/{res['results']['od']}/external_ids?language=en-US&api_key={API_KEY}").json()
    return Response({
        "response": 200,
        "result": res["results"]
    })

@api_view(["GET"])
def get_imdb_page(request):
    p = request.query_params
    res = requests.get(f"https://api.themoviedb.org/3/movie/{p['id']}/external_ids?language=en-US&api_key={API_KEY}").json()

    return Response({
        "response": 200,
        "result": res["imdb_id"]
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_match(request):
    p = request.data
    print(request.user)
    res = requests.get(f"https://api.themoviedb.org/3/movie/{p['data']['id']}/external_ids?language=en-US&api_key={API_KEY}").json()
    match = Match.objects.create(
        user = request.user,
        poster_path = p['data']['poster_path'],
        imdb_id = res['imdb_id']
    )
    serializer = MatchSerializer(match, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_matches(request):
    user = request.user
    matches = user.match_set.all()
    serializer = MatchSerializer(matches, many=True)

    return Response({
        "response": 200,
        "result": serializer.data
    })

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
