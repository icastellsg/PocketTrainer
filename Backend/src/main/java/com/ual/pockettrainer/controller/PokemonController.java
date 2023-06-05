package com.ual.pockettrainer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ual.pockettrainer.entity.Pokemon;
import com.ual.pockettrainer.repository.PokemonRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/pokemons")
@Tag(name = "Pokemon")
public class PokemonController {

    @Autowired
    private PokemonRepository pokemonRepository;

    @GetMapping("/exist/{number}")
    public ResponseEntity<Boolean> existsByNumber(@PathVariable Long number) {
        return ResponseEntity.ok(pokemonRepository.existsByNumber(number));
    }

    @GetMapping("/allPokemons")
    public ResponseEntity<List<Pokemon>> getAllTeams() {
        List<Pokemon> pokemons = (List<Pokemon>) pokemonRepository.findAll();
        return ResponseEntity.ok(pokemons);
    }

    @GetMapping("/{number}")
    public ResponseEntity<Pokemon> getPokemon(@PathVariable Long number) {
        Pokemon existingPokemon = pokemonRepository.findByNumber(number);
        return ResponseEntity.ok(existingPokemon);
    }

    @PostMapping
    public ResponseEntity<Pokemon> postPokemon(@RequestBody Pokemon pokemon) {
        pokemonRepository.save(pokemon);
        return ResponseEntity.ok(pokemon);
    }

    @PutMapping("/{number}")
    public ResponseEntity<Pokemon> updatePokemon(@PathVariable Long number, @RequestBody Pokemon pokemon) {
        Pokemon existingPokemon = pokemonRepository.findByNumber(number);

        existingPokemon.setName(pokemon.getName());
        existingPokemon.setAbility(pokemon.getAbility());
        existingPokemon.setMoves(pokemon.getMoves());
        pokemonRepository.save(existingPokemon);

        return ResponseEntity.ok(existingPokemon);
    }

    @DeleteMapping("/{number}")
    public ResponseEntity<Void> deletePokemon(@PathVariable Long number) {
        pokemonRepository.deleteById(number);
        return ResponseEntity.noContent().build();
    }
}
