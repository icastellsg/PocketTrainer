package com.ual.pockettrainer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ual.pockettrainer.entity.Team;
import com.ual.pockettrainer.repository.TeamRepository;

@Component("TeamService")
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public List<Team> getAllTeams() {
        List<Team> teams = (List<Team>) teamRepository.findAll();
        for (Team team : teams) {
            team.getPokemons().size(); // Para forzar la carga de los pokemons
        }
        return teams;
    }

    public Optional<Team> getTeamById(Long id) {
        return this.teamRepository.findById(id);
    }
}
