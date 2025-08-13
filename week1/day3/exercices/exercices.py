#ex1
"""class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age
cat1 = Cat("Whiskers", 3)
cat2 = Cat("Felix", 5)
print(cat1.name, cat1.age)
print(cat2.name, cat2.age)

cats=[cat1, cat2]
def find_oldest_cat(cats):
    oldest_cat = cats[0]
    for cat in cats:
        if cat.age > oldest_cat.age:
            oldest_cat = cat
    return oldest_cat
print(f"The oldest cat is {find_oldest_cat(cats).name}, and is {find_oldest_cat(cats).age} years old.")

"""

#ex2
"""
class dog():
    def __init__(self,nome,height):
        self.NAME = nome
        self.HEIGHT = height
    def bark(self):
        print(f"{self.NAME} Woof!")
    def jump(self):
        print(f"{self.NAME} jumps {self.HEIGHT}cm high!")
davids_dog = dog("Rex", 50)
sarahs_dog = dog("Teacup",20)
print(davids_dog.bark())
print(sarahs_dog.jump())


def find_bigger_dog():
    if davids_dog.HEIGHT > sarahs_dog.HEIGHT:
        return davids_dog.NAME
    elif davids_dog.HEIGHT < sarahs_dog.HEIGHT:
        return sarahs_dog.NAME
    else:
        return "Both dogs are the same height."

"""
#ex3
"""
class Song:
    #lyrics (a list)
    def __init__(self, lyrics):
        self.lyrics = lyrics
    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)
            
stairway = Song(["There’s a lady who's sure","all that glitters is gold", "and she’s buying a stairway to heaven"])
stairway.sing_me_a_song()
"""
#ex4
"""
class Zoo:
    def __init__(self,zoo_name):
        self.zoo_name = zoo_name
        self.animals = []
    def add_animal(self, new_animal):
        self.animals.append(new_animal)
    def get_animals(self):
        return self.animals
    def sell_animal(self, animal_sold):
        # if self.animals[0] == animal_sold:      
        self.animals.remove(animal_sold)
        return self.animals
    def sort_animals(self):
        grouped = {}
        self.animals.sort(key=lambda animal: animal[0])
        for name, age in self.animals:
            first_letter = name[0].upper()
            if first_letter not in grouped:
                grouped[first_letter] = name
            else:
                if isinstance(grouped[first_letter], str):
                    grouped[first_letter] = [grouped[first_letter], name]
                else:
                    grouped[first_letter].append(name)
        return grouped
    #Create a method called get_groups that prints the animal/animals inside each group.
    def get_groups(self):
        groups = self.sort_animals()
        for letter, names in groups.items():
            print(f"Group {letter}: {names}")
            
            

new_york_zoo = Zoo("New York Zoo")
new_york_zoo.add_animal(new_animal=("Leo", 4))
new_york_zoo.add_animal(new_animal=("Mia", 2))
new_york_zoo.add_animal(new_animal=("Zara", 5))

#sell_animal
new_york_zoo.sell_animal(animal_sold=("Leo", 4))

#sort
new_york_zoo.get_groups()

while True:
    action = input("What would you like to do? (add/sell/sort/groups/exit): ")
    if action == "add":
        animal_name = input("Enter the animal's name: ")
        animal_age = int(input("Enter the animal's age: "))
        new_york_zoo.add_animal(new_animal=(animal_name, animal_age))
    elif action == "sell":
        animal_name = input("Enter the animal's name to sell: ")
        animal_age = int(input("Enter the animal's age: "))
        new_york_zoo.sell_animal(animal_sold=(animal_name, animal_age))
    elif action == "sort":
        print(new_york_zoo.sort_animals())
    elif action == "groups":
        new_york_zoo.get_groups()
    elif action == "exit":
        break
    else:
        print("Invalid action. Please try again.")
"""
