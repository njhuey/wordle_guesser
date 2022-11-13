from django.urls import path
from .views import GuessWord

urlpatterns = [
    path('guess/', GuessWord.as_view(), name='guess'),
]
