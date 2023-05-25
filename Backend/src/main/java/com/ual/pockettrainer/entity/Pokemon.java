package com.ual.pockettrainer.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Pokemon")
public class Pokemon {

    @Id
    private long number;

    @Size(min = 1, max = 15, message = "Name must be between 1 and 15 characters")
    private String name;

    @Size(min = 0, max = 4, message = "Moves are mandatory (0-4 moves/pokemon)")
    private String[] moves;

    private String ability;

    @ManyToMany(mappedBy = "pokemons")
    private Set<Team> teams = new HashSet<>();

    public Pokemon() {

    }

    public Pokemon(long number) {
        this.number = number;
    }

    public Pokemon(long number, String name) {
        this.number = number;
        this.name = name;
    }

    public Pokemon(long number, String name, String[] moves, String ability) {
        this.number = number;
        this.name = name;
        this.moves = moves;
        this.ability = ability;
    }

    public long getNumber() {
        return number;
    }

    public void setId(long number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbility() {
        return ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public String[] getMoves() {
        return moves;
    }

    public void setMoves(String[] moves) {
        this.moves = moves;
    }
}
