from functools import reduce
import random
#ex 1:
# keys = ['Ten', 'Twenty', 'Thirty']
# values = [10, 20, 30]
# for item in zip(keys, values): 
#     print(item)

# ex2: Cinemax 


# age = int(input("Enter your age: "))

# family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
# if age < 3:
#     print("Ticket price: Free")
# elif 3 <= age <= 12:
#     print("Ticket price: $10")
# else:
#     print("Ticket price: $15")


# for member, age in family.items():
#     if age < 3:
#         print(member, "has to pay: $0")
#     elif 3 <= age <= 12:
#         print(member, "has to pay: $10")
#     else:
#         print(member, "has to pay: $15")
        
        
# reduced_list = 0

# for age in family.values():
#     if age < 3:
#         reduced_list += 0
#     elif 3 <= age <= 12:
#         reduced_list += 10
#     else:
#         reduced_list += 15
# print("Total family ticket price:", reduced_list,"$")

# family = {}
# while True:
#     name = input("Enter family members name (or 'done' to finish): ")
#     if name.lower() == 'done':
#         break
#     age = int(input("Enter age for " + name + ": "))
#     family[name] = age
    
# print("Family members and their ages:", family)

#ex 2 : reduced_list with reduce

# reduced_list= reduce(lambda acc, age: acc + (0 if age < 3 else 10 if age <= 12 else 15), family.values(), 0)

# print("Total family ticket price (using reduce):", reduced_list,"$")

#ex 3 

# brand={
#     "name": "Zara",
#     "creation_date": 1975,
#     "creator_name": "Amancio Ortega Gaona",
#     "type_of_clothes": ["men", "women", "children", "home"],
#     "international_competitors": ["Gap", "H&M", "Benetton"],
#     "number_stores": 7000,
#     "major_color": {
#         "France": "blue",
#         "Spain": "red",
#         "US": ["pink", "green"]
#     }
# }
# brand ["number_stores"]= 2

# print("The Zaras clients :",brand["type_of_clothes"])

# brand["country_creation"]="spain"

# if len(brand["international_competitors"]) > 0:
#     brand["international_competitors"].append("Desigual")
    
# del brand["creation_date"]

# print("the last international_competitors :" ,brand["international_competitors"][-1])
# print("the major clothes colors in the US :",brand["major_color"]["US"])
# print("the amount of key value pairs :", len(brand))
# print("the keys :", (brand.keys()))

# more_on_zara={
#     "create_date":1975,
#     "number_stores":10000
# }

# brand.update(more_on_zara)

# print(brand["number_stores"])
# # What just happened ?
# # The value of the key "number_stores" was printed, showing the updated number of stores for the brand.
# print(brand)

#ex4:
# def describe_city(city, country="US"):
#     print(f"{city} is in {country}.")
# describe_city("New York")
# describe_city("Tokyo", "Japan")

#ex 5:
#Create a function that accepts a number between 1 and 100 and generates another number randomly between 1 and 100. Use the random module.
# def fr_random(N):
#     if 1 <= N <= 100:
#         return random.randint(1, 100)
#     else:
#         return "Invalid input. Please enter a number between 1 and 100."
# print(fr_random(100))
# if fr_random(100) == 100:
#     print("Success! The numbers match.")
# else:
#     print("Fail! The numbers do not match.")

#ex6:
# def make_shirt(size, text):
#     print(f"The size of the shirt is {size} and the text is {text}")
# make_shirt("M", "We hope you enjoy your shirt!")
# def make_shirt(size="L", text="I love Python"):
#     print(f"The size of the shirt is {size} and the text is {text}")
# make_shirt()
# make_shirt("M")
# make_shirt("S", "Python is good!")
# make_shirt(text="Python is good!", size="S")


#ex 7:
def get_random_temp(season):
    
    if season == "spring":
        return random.randint (15,25) 
    elif season == "summer":
        return random.randint (25,40) 
    elif season == "autumn":
        return random.randint (10,20) 
    elif season == "winter":
        return random.randint (-5, 15) 
    else:
        return random.randint (-10, 40) 
    
def main():
    season = input("Type season :" )

    temp = get_random_temp(season)
    print(f'The temperature right now is {temp} degrees Celsius.')

    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today")
    elif 0 <= temp <=16:
        print("Quite chilly! Don’t forget your coat")
    elif 16 < temp <=23:
        print("Fine day")
    elif 24 <= temp <=32:
        print("Nice day")
    else:
        print("the weather is hot")

main()


# ex8:

# data = [
#     {
#         "question": "What is Baby Yoda's real name?",
#         "answer": "Grogu"
#     },
#     {
#         "question": "Where did Obi-Wan take Luke after his birth?",
#         "answer": "Tatooine"
#     },
#     {
#         "question": "What year did the first Star Wars movie come out?",
#         "answer": "1977"
#     },
#     {
#         "question": "Who built C-3PO?",
#         "answer": "Anakin Skywalker"
#     },
#     {
#         "question": "Anakin Skywalker grew up to be who?",
#         "answer": "Darth Vader"
#     },
#     {
#         "question": "What species is Chewbacca?",
#         "answer": "Wookiee"
#     }
# ]
    
# def quiz():
#     correct = 0
#     incorrect = 0
#     wrong = []
#     for item in data:
#         answer = input(item["question" ]).strip()
        
#         if answer.lower() == item["answer"].lower():
#             correct += 1
#         else:
#             incorrect += 1
#             wrong.append(item["question"])
#     return correct, incorrect, wrong
# def affichage(correct, incorrect, wrong):
#     print(f'correct ancwers are : {correct}')
#     print(f'incorrect ancwers are : {incorrect}')
#     print(f'wrong questions are : {wrong}')
# correct, incorrect, wrong = quiz()
# affichage(correct, incorrect, wrong)
