# class Dog:
#     def __init__(self, name, age, weight):
#         self.name = name
#         self.age = age
#         self.weight = weight

#     def bark(self):
#         return f"{self.name} is barking"

#     def run_speed(self):
#         return (self.weight / self.age) * 10

#     def fight(self, other_dog):
#         self_power = self.run_speed() * self.weight
#         other_power = other_dog.run_speed() * other_dog.weight

#         if self_power > other_power:
#             return f"{self.name} won the fight against {other_dog.name}"
#         elif self_power < other_power:
#             return f"{other_dog.name} won the fight against {self.name}"
#         else:
#             return f"{self.name} and {other_dog.name} are equally strong"