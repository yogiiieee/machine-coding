package models;

import java.util.List;

public class Board {
    private List<Ladder> ladders;
    private List<Snake> snakes;
    private List<Player> players;
    private int size;

    public Board(int size, List<Ladder> ladders, List<Snake> snakes, List<Player> players) {
        this.size = size;
        this.snakes = snakes;
        this.ladders = ladders;
        this.players = players;
    }

    public List<Ladder> getLadders() {
        return ladders;
    }

    public List<Snake> getSnakes() {
        return snakes;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public int getSize() {
        return size;
    }
    
    public void movePlayer(Player player, int steps) {
        int newPosition = player.getPosition() + steps;
        if(newPosition > size) {
            System.out.println(player.getName() + " is close to winning!");
            return;
        }
        for(Snake snake : snakes) {
            if(snake.getStart() == newPosition) {
                System.out.println(player.getName() + " got bitten at position " + newPosition + "!");
                newPosition = snake.getEnd();
            }
        }
        for(Ladder ladder : ladders) {
            if(ladder.getStart() == newPosition) {
                System.out.println(player.getName() + " got a ladder at position " + newPosition + "!");
                newPosition = ladder.getEnd();
            }
        }
        player.setPosition(newPosition);
    }
}
