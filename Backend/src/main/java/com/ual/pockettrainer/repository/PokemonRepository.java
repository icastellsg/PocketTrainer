package com.ual.pockettrainer.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.ual.pockettrainer.entity.Pokemon;

@RepositoryRestResource
public interface PokemonRepository extends CrudRepository<Pokemon, Long> {
    public List<Pokemon> findByNameContainingIgnoreCase(@Param("name") String name);

    public Pokemon findByNumber(Long number);

    public boolean existsByNumber(Long number);
}
