package com.ual.pockettrainer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ual.pockettrainer.service.PokeApiService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/pokeapi")
@Tag(name = "PokeApi")
public class PokeApiController {

    @Autowired
    private PokeApiService pokeApiService;

    @GetMapping("/pokemons")
    public ResponseEntity<List<Map<String, Object>>> getPokemons() {
        return ResponseEntity.ok(pokeApiService.getPokemons());
    }

    @GetMapping("/generations/{generation}")
    public ResponseEntity<List<Map<String, Object>>> getPokemonsByGenerations(@PathVariable int generation) {
        return ResponseEntity.ok(pokeApiService.getPokemonsByGenerations(generation));
    }
}
