
"""

#ex1 
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'


class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'

cat1 = Bengal("Tiger", 3)
cat2 = Chartreux("Smokey", 5)
cat3 = Siamese("Luna", 2)

all_cats = [cat1, cat2, cat3]

sara_pets = Pets(all_cats)

sara_pets.walk()

"""


"""
#ex2
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        self_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if self_power > other_power:
            return f"{self.name} won the fight against {other_dog.name}"
        elif self_power < other_power:
            return f"{other_dog.name} won the fight against {self.name}"
        else:
            return f"{self.name} and {other_dog.name} are equally strong"

dog2 = Dog("Buddy", 3, 15)
dog3 = Dog("Max", 4, 18)


print(dog2.bark())
print(dog3.bark())

print(f"{dog2.name} run speed: {dog2.run_speed()}")
print(f"{dog3.name} run speed: {dog3.run_speed()}")

print(dog2.fight(dog3))

"""
"""

import random
from dog import Dog  

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False   

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *dog_names):
        names = ", ".join(dog_names)
        print(f"{names} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead"
            ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained yet!")

"""

"""
#ex4
class Family:
    def __init__(self, last_name, members=None):
        self.last_name = last_name
        self.members = members if members else []

    def born(self, **kwargs):
        self.members.append(kwargs)
        print(f"Congratulations to the {self.last_name} family for the new child {kwargs['name']}!")

    def is_18(self, name):
        for member in self.members:
            if member["name"] == name:
                return member["age"] >= 18
        return False

    def family_presentation(self):
        print(f"Family {self.last_name}:")
        for member in self.members:
            print(member)



my_family = Family("Smith", [
    {'name':'Michael','age':35,'gender':'Male','is_child':False},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False}
])

my_family.family_presentation()
print(my_family.is_18("Michael"))  
my_family.born(name="Tom", age=1, gender="Male", is_child=True)
my_family.family_presentation()

"""
"""

#ex5
class TheIncredibles(Family):
    def use_power(self, name):
        for member in self.members:
            if member["name"] == name:
                if member["age"] >= 18:
                    print(f"{member['name']}'s power is: {member['power']}")
                else:
                    raise Exception(f"{member['name']} is not over 18 years old!")

    def incredible_presentation(self):
        print("\n* Here is our powerful family *")
        super().family_presentation()


# Example of usage
incredibles = TheIncredibles("Incredibles", [
    {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
])

incredibles.incredible_presentation()
incredibles.use_power("Michael")

# add baby Jack
incredibles.born(name="Jack", age=1, gender="Male", is_child=True, power="Unknown Power", incredible_name="BabyJack")

incredibles.incredible_presentation()

"""




