package com.ual.pockettrainer.dto;

public class TeamDTO {
    private String name;
    private long[] pokemons;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long[] getPokemons() {
        return pokemons;
    }

    public void setPokemons(long[] pokemons) {
        this.pokemons = pokemons;
    }
}
