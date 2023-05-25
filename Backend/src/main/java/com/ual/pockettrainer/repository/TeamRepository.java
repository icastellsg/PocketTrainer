package com.ual.pockettrainer.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.ual.pockettrainer.entity.Team;

@RepositoryRestResource
public interface TeamRepository extends CrudRepository<Team, Long> {

}