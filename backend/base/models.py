from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Match(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    poster_path = models.CharField(max_length=100)
    imdb_id = models.CharField(max_length=100)