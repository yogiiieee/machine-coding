package app;

import models.*;
import services.Game;
import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

public class Main {
    public static void main(String[] args) throws FileNotFoundException {
        if(args.length == 0) {
            System.out.println("Please provide input file!");
            return;
        }

        File input = new File(args[0]);
        Scanner sc = new Scanner(input);

        List<Snake> snakes = new ArrayList<>();
        int numSnakes = sc.nextInt();
        while(numSnakes > 0) {
            int startPosition = sc.nextInt();
            int endPosition = sc.nextInt();
            if (startPosition != 100) {
                snakes.add(new Snake(startPosition, endPosition));
            }
            numSnakes--;
        }
        
        List<Ladder> ladders = new ArrayList<>();
        int numLadders = sc.nextInt();
        while(numLadders > 0) {
            int startPosition = sc.nextInt();
            int endPosition = sc.nextInt();
            if(endPosition != 100) {
                ladders.add(new Ladder(startPosition, endPosition));
            }
            numLadders--;
        }

        List<Player> players = new ArrayList<>();
        int numPlayers = sc.nextInt();
        for(int i=0; i<numPlayers; i++) {
            String playerName = sc.next();
            players.add(new Player(playerName));
        }

        int boardSize = 100;
        Board board = new Board(boardSize, ladders, snakes, players);
        Game game = new Game(board, 1);

        boolean play = true;
        while(play) {
            play = game.playTurn();
        }

        sc.close();
        return;
    }
}
