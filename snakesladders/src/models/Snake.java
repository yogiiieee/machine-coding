package models;

public class Snake {
    private int start;
    private int end;

    public Snake(int start, int end) {
        if(start <= end) {
            throw new IllegalArgumentException("Start of snake must be greater than end.");
        }
        this.start = start;
        this.end = end;
    }

    public int getStart() {
        return start;
    }

    public int getEnd() {
        return end;
    }
}
