
from game import Game

def get_user_menu_choice():
    print("\n Menu:")
    print("(g) Play a new game")
    print("(s) Show scores")
    print("(q) Quit")

    choice = input("Enter your choice: ").lower()
    if choice in ["g", "s", "q"]:
        return choice
    else:
        print("Invalid choice. Try again.")
        return None
def print_results(results):
    print("Game Summary:")
    print(f"Wins: {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws: {results['draw']}")
    print("Thanks for playing!")

def main():
    pass

if __name__ == "__main__":
    main()
