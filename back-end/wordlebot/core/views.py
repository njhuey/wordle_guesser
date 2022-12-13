from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from .guess import wordle, wordle_single


class GuessCustomWord(APIView):
    def get(self, request):
        """
        Returns the guess sequence for a given target word.
        """
        try:
            request.query_params['word']
        except:
            raise APIException('must include word query param')

        guesses = wordle(request.query_params['word'])
        if not guesses:
            raise APIException('invalid input')
        data = {"guesses": guesses,
                "status": guesses[-1] == request.query_params['word'], "count": len(guesses)}
        return Response(data)


class GuessSingleWord(APIView):
    def post(self, request):
        """
        Returns a single word based on previous guesses
        """
        try:
            print(request.data)
            request.data['guesses']
            request.data['colors']
        except:
            raise APIException('must include guesses and colors in body')

        guess = wordle_single(request.data['guesses'], request.data['colors'])
        if not guess:
            raise APIException('invalid input')

        return Response({"guess": guess, "count": len(request.data['guesses']) + 1})
