def display_board(board):
    
    print("\n")
    for row in range(3):
        print(" | ".join(board[row]))
        if row < 2:
            print("---------")
    print("\n")


def player_input(player, board):
    
    while True:
        try:
            move = input(f"Player {player}, enter your move (1-9): ")
            position = int(move)

            if position < 1 or position > 9:
                print("Please enter a number between 1 and 9.")
                continue


            row = (position - 1) // 3
            col = (position - 1) % 3

            if board[row][col] in ["X", "O"]:
                print("That spot is already taken. Try again.")
            else:
                return row, col
        except ValueError:
            print("Invalid input. Please enter a number between 1 and 9.")


def check_win(board, player):
    
    
    for row in range(3):
        if all(board[row][col] == player for col in range(3)):
            return True

    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True


    if all(board[i][i] == player for i in range(3)) or all(
        board[i][2 - i] == player for i in range(3)
    ):
        return True

    return False


def check_tie(board):
    
    return all(board[row][col] in ["X", "O"] for row in range(3) for col in range(3))


def play():
    
    board = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]

    print("Welcome to Tic-Tac-Toe!")
    print("Players take turns placing X and O.")
    print("Enter a number from 1-9 to place your mark.")


    board = [[" " for _ in range(3)] for _ in range(3)]

    current_player = "X"

    while True:
        
        display_board(board)


        row, col = player_input(current_player, board)
        board[row][col] = current_player


        if check_win(board, current_player):
            display_board(board)
            print(f"🎉 Player {current_player} wins!")
            break


        if check_tie(board):
            display_board(board)
            print("It's a tie! 🤝")
            break


        current_player = "O" if current_player == "X" else "X"


play()