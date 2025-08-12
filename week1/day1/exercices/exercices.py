# ex1:Hello World
# print("Hello, World!\n" * 4)


# ex2 :Some Math
# result = (99 ** 3) * 8
# print(result)

# ex3 :What’s your name ?
# user_name = input("What is your name? ")
# if user_name == "dark":
#     print("Hey, we have the same name!")
# else:
#     print("Nice to meet you, " + user_name + "!")



#  ex4 :Tall enough to ride a roller coaster
# user_height  = int(input("What is your height ? "))
# if user_height > 145:
#     print("You are tall enough to ride.") 
# else:
#     print("You need to grow some more to ride.")


#Exe 5 : Favorite Numbers
# my_fav_numbers = {7, 42, 99}
# my_fav_numbers.add(13)
# my_fav_numbers.remove(99)
# my_fav_numbers.pop()
# friend_fav_numbers = {42, 88, 13}
# our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

# exercise 6
# answer =print("yes ,Tuples are immutable lists, which means items can’t be changed.")



#exercise 7
# basket = ["Banana", "Apples", "Oranges", "Blueberries"]
# basket.remove("Banana")
# basket.remove("Blueberries")
# basket.append("Kiwi")
# basket.insert(0, "Apples")
# basket.count("Apples")
# basket.clear()
# print(basket)


# exercise 8
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
print(sandwich_orders)

for sandwich in sandwich_orders:
    print("Preparing " + sandwich + "!!!")
    sandwich_orders.remove(sandwich)
    print("Finished preparing " + sandwich + ".")
    print("Remaining orders: " + str(sandwich_orders))
    print("All sandwiches have been prepared.")
finished_sandwiches = []

for sandwich in sandwich_orders:
    print("Preparing " + sandwich + "!!!")
    sandwich_orders.remove(sandwich)
    print("Finished preparing " + sandwich + ".")
    print("Remaining orders: " + str(sandwich_orders))
    finished_sandwiches.append(sandwich)

print("All sandwiches have been prepared.")

for sandwich in finished_sandwiches:
    print(f"I made your {sandwich.lower()}")