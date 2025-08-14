class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count

    def get_info(self):
        result = f"{self.name}'s farm\n"
        max_length = max(len(animal) for animal in self.animals) if self.animals else 0
        for animal, count in sorted(self.animals.items()):
            result += f"{animal:<{max_length}} : {count:>3}\n"
        result += "E-I-E-I-O!"
        return result

    
    def get_animal_types(self):
        return sorted(self.animals.keys())

    
    def get_short_info(self):
        animal_list = []
        for animal in self.get_animal_types():
            if self.animals[animal] > 1:
                animal_list.append(animal + "s")
            else:
                animal_list.append(animal)

        if len(animal_list) > 1:
            animals_str = ", ".join(animal_list[:-1]) + " and " + animal_list[-1]
        else:
            animals_str = animal_list[0] if animal_list else ""

        return f"{self.name}'s farm has {animals_str}."

#test
macdonald = Farm("McDonald")
macdonald.add_animal("cow", 5)
macdonald.add_animal("sheep")
macdonald.add_animal("sheep", 2)
macdonald.add_animal("goat", 12)

print(macdonald.get_info())
print(macdonald.get_animal_types())
print(macdonald.get_short_info())
