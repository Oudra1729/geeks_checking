
import random

class Game:
    def get_user_item(self):
        choices = ["rock", "paper", "scissors"]
        while True:
            user_choice = input("Select (rock/paper/scissors): ").lower()
            if user_choice in random.choices:
                return user_choice
            else:
                print(" Invalid choice, try again...")

    def get_computer_item(self):
        pass

    def get_game_result(self, user_item, computer_item):
        pass

    def play(self):
        pass
