

class Farm:
    #This class will represent a farm and its animals
    def __init__(self,farm_name):
        self.farm_name = farm_name
        self.animals = {}
    def add_animal(self, animal_type ,count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count
