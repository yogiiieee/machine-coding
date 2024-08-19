package services;

import models.Board;
import models.Player;
import models.Dice;

public class Game {
    private Board board;
    private int currentPlayerIdx;
    private Dice dice;
    
    public Game(Board board, int numberOfDice) {
        this.board = board;
        this.currentPlayerIdx = 0;
        this.dice = new Dice(numberOfDice);
    }

    public boolean playTurn() {
        Player currPlayer = board.getPlayers().get(currentPlayerIdx);
        int diceRoll = dice.rollDice();
        board.movePlayer(currPlayer, diceRoll);

        System.out.println(currPlayer.getName() + " rolled a " + diceRoll + " and moved to position " + currPlayer.getPosition());

        if(currPlayer.getPosition() == board.getSize()) {
            System.out.println(currPlayer.getName() + " wins!");
            return false;
        }

        currentPlayerIdx = (currentPlayerIdx + 1) % board.getPlayers().size();
        return true;
    }
}
