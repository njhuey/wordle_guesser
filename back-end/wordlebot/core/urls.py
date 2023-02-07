from django.urls import path
from .views import GuessCustomWord, GuessSingleWord

urlpatterns = [
    path('guess', GuessCustomWord.as_view(), name='guess'),
    path('word', GuessSingleWord.as_view(), name="word"),
]
