
# challenge 1
# number = int(input("Enter a number: "))
# length = int(input("Enter the length of the sequence: "))

# multiples = []
# for i in range(1, length + 1):
#     multiples.append(number * i)
# print(multiples)

# challenge_2

# user_input = input("Enter a string: ")
# result = ""

# for i in range(len(user_input)):
#     if i == 0 or user_input[i] != user_input[i - 1]:
#         result += user_input[i]

# print("String after removing consecutive duplicates:", result)

# final_result = ""
# for word in result.split():
#     if not any(word[i] == word[i + 1] for i in range(len(word) - 1)):
#         final_result += word + " "
# print("Final string:", final_result.strip())