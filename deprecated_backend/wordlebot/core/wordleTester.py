import guess
import ast
import sys
from time import time

with open('wordleWords.txt') as f:
    lines = f.readlines()
word_list = [ast.literal_eval(line) for line in lines][0]


def timer_func(func):
    def wrap_func(*args, **kwargs):
        t1 = time()
        result = func(*args, **kwargs)
        t2 = time()
        print(f'Function {func.__name__!r} executed in {(t2-t1):.4f}s')
        return result
    return wrap_func


def progress(count, total, status=''):
    bar_len = 60
    filled_len = int(round(bar_len * count / float(total)))

    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)

    sys.stdout.write('[%s] %s%s ...%s\r' % (bar, percents, '%', status))
    sys.stdout.flush()


@timer_func
def testWordle():
    success = 0
    num_guesses = 0
    for index, word in enumerate(word_list):
        progress(index, len(word_list))
        guesses = guess.wordle(word)
        if guesses[-1] == word:
            success += 1
            num_guesses += len(guesses)

    print(f'\n')
    print("Success Rate: " + str((success / len(word_list)) * 100)[:4] + "%")
    print("Average Number of Guesses: " + str(num_guesses / success))


testWordle()
