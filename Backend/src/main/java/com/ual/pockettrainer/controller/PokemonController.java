package com.ual.pockettrainer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ual.pockettrainer.entity.Pokemon;
import com.ual.pockettrainer.repository.PokemonRepository;

@RestController
@RequestMapping("/pokemons")
public class PokemonController {

    @Autowired
    private PokemonRepository pokemonRepository;

    @GetMapping("/exist/{number}")
    public boolean existsByNumber(@PathVariable Long number) {
        return pokemonRepository.existsByNumber(number);
    }

    @GetMapping("/allPokemons")
    public List<Pokemon> getAllTeams() {
        return (List<Pokemon>) pokemonRepository.findAll();
    }

}
