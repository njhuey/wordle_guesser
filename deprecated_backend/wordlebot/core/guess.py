import ast

with open('wordlebot/core/wordleWords.txt') as f:
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
    while guesses[-1] != target_word and len(guesses) < 6 and words:
        response = check(target_word, guesses[-1])
        words = eleminate_words(words, guesses[-1], response)
        if words:
            guesses += [eval(words)]

    return guesses


def wordle_single(words_guessed, colors):
    """
    function returns the best next guess based on previous guesses
    """
    words = word_list[:]

    if len(words_guessed) != len(colors):
        return None

    for i, word in enumerate(words_guessed):
        if word not in word_list or len(colors[i]) != 5:
            return None
        words = eleminate_words(words, word, colors[i])

    return eval(words)


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
        chars = {}
        for index, letter in enumerate(word):
            if letter in chars:
                chars[letter] = max(chars[letter], pos_frequency[index][letter])
            else:
                chars[letter] = pos_frequency[index][letter]
        temp_val = sum(chars.values())
        if temp_val > optimal_word[1]:
            optimal_word = [word, temp_val]

    return optimal_word[0]


def check(target_word, guess):
    """
    returns colored response by comparing guess and target word
    """
    response = ["grey", "grey", "grey", "grey", "grey"]
    for index in range(5):
        if guess[index] == target_word[index]:
            response[index] = "green"
            target_word = target_word[:index] + " " + target_word[index+1:]

    for index in range(5):
        if guess[index] in target_word and response[index] != "green":
            response[index] = "yellow"
            target_word = target_word[:target_word.find(guess[index])] + " " + target_word[target_word.find(guess[index])+1:]

    return response


def eleminate_words(words, guess, response):
    """
    eliminates words that are no longer possible
    """
    pos_letters = {}
    neg_letters = []
    for index, color in enumerate(response):
        if color in ["green", "yellow"]:
            if color == "green":
                temp = [word for word in words if guess[index] != word[index]]
            else:
                temp = [word for word in words if guess[index] == word[index]]

            for x in temp:
                words.remove(x)

            if pos_letters.get(guess[index]):
                pos_letters[guess[index]] += 1
            else:
                pos_letters[guess[index]] = 1
        else:
            neg_letters += [guess[index]]

    for letter in pos_letters.keys():
        temp = []
        temp = [word for word in words if word.count(letter) < pos_letters[letter]]
        for x in temp:
            words.remove(x)

    for letter in set(neg_letters):
        temp = []
        if letter in pos_letters:
            temp = [word for word in words if word.count(letter) != pos_letters[letter]]
        else:
            temp = [word for word in words if letter in word]
        for x in temp:
            words.remove(x)

    return words
