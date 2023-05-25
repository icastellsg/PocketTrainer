package com.ual.pockettrainer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ual.pockettrainer.service.PokeApiService;

@RestController
@RequestMapping("/pokeapi")
public class PokeApiController {

    @Autowired
    private PokeApiService pokeApiService;

    @GetMapping("/pokemons")
    public List<Map<String, Object>> getPokemons() {
        return pokeApiService.getPokemons();
    }

    @GetMapping("/generations/{generation}")
    public List<Map<String, Object>> getPokemonsByGenerations(@PathVariable int generation) {
        return pokeApiService.getPokemonsByGenerations(generation);
    }
}
