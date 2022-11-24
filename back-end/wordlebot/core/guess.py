import ast

with open('core/wordleWords.txt') as f:
    """
    loads words into array
    """
    lines = f.readlines()
word_list = [ast.literal_eval(line) for line in lines][0]


def wordle(target_word):
    """
    driver function for wordle script
    """
    if len(target_word) != 5 or target_word not in word_list:
        return []

    words = word_list[:]
    guesses = [eval(words)]
    while guesses[-1] != target_word and len(guesses) < 6:
        response = check(target_word, guesses[-1])
        words = eleminate_words(words, guesses[-1], response)
        guesses += [eval(words)]

    return guesses


def eval(words):
    """
    evaluates and returns best words for next guess
    """
    pos_frequency = [{}, {}, {}, {}, {}]
    for word in words:
        for index, letter in enumerate(word):
            if letter not in pos_frequency[index]:
                pos_frequency[index][letter] = 0
            else:
                pos_frequency[index][letter] += 1

    optimal_word = [words[0], 0]
    for word in words:
        temp_val = 0
        for index, letter in enumerate(word):
            temp_val += pos_frequency[index][letter]
        if temp_val > optimal_word[1]:
            optimal_word = [word, temp_val]

    return optimal_word[0]


def check(target_word, guess):
    """
    returns colored response by comparing guess and target word
    """
    response = []
    for index in range(5):
        if guess[index] == target_word[index]:
            response += ["green"]
        elif guess[index] in target_word:
            response += ["yellow"]
        else:
            response += ["grey"]

    return response


def eleminate_words(words, guess, response):
    """
    eliminates words that are no longer possible
    """
    for index, color in enumerate(response):
        if color == "green":
            greenLetter(words, guess, index)
        elif color == "yellow":
            yellowLetter(words, guess, index)
        else:
            blackLetter(words, guess, index)

    return words


def greenLetter(words, guess, index):
    temp = [word for word in words if guess[index] != word[index]]
    for x in temp:
        words.remove(x)


def yellowLetter(words, guess, index):
    temp = [word for word in words if guess[index] == word[index]]
    temp += [word for word in words if guess[index] not in word]
    for x in temp:
        words.remove(x)


def blackLetter(words, guess, index):
    temp = [word for word in words if guess[index] in word]
    for x in temp:
        words.remove(x)
