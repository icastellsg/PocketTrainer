package com.ual.pockettrainer.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ual.pockettrainer.repository.PokemonRepository;

@Component("PokeApiService")
public class PokeApiService {

    @Autowired
    private PokemonRepository pokemonRepository;
    RestTemplate restTemplate = new RestTemplate();

    public List<Map<String, Object>> getPokemons() {
        ResponseEntity<String> response = restTemplate
                .getForEntity("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", String.class);
        String json = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map;

        try {
            map = objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {
            });
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> results = (List<Map<String, Object>>) map.get("results");
            for (Map<String, Object> result : results) {
                result.put("captured", checkPokemonCaptured(result.get("url").toString()));
            }
            return results;
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

    public List<Map<String, Object>> getPokemonsByGenerations(int generation) {
        if (generation < 0 || generation > 9)
            return Collections.emptyList();
        ResponseEntity<String> response = restTemplate
                .getForEntity("https://pokeapi.co/api/v2/generation/" + generation, String.class);
        String json = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map;

        try {
            map = objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {
            });
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> results = (List<Map<String, Object>>) map.get("pokemon_species");
            for (Map<String, Object> result : results) {
                result.put("captured", checkPokemonCaptured(result.get("url").toString()));
            }
            return results;
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }

    private boolean checkPokemonCaptured(String url) {
        String[] parts = url.split("/");
        String ultimoNumero = parts[parts.length - 1];
        return pokemonRepository.existsById(Long.valueOf(ultimoNumero));
    }

}
