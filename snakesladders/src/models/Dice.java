package models;

import java.util.Random;

public class Dice {
    private int numberOfDice;
    Random random;

    public Dice(int numberOfDice) {
        this.numberOfDice = numberOfDice;
        random = new Random();
    }

    public int rollDice() {
        // random returns a number from 0 till upperbound
        // and we want a number from 1 thus +1
        return random.nextInt(numberOfDice * 6) + 1;
    }
}
