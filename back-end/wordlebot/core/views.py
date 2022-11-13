from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from .guess import wordle


class GuessWord(APIView):
    def get(self, request):
        """
        Returns the guess sequence for a given target word.
        """
        guesses = wordle(request.query_params['word'])
        if not guesses:
            raise APIException('invalid input')
        data = {"guesses": guesses,
                "status": guesses[-1] == request.query_params['word'], "count": len(guesses)}
        return Response(data)
