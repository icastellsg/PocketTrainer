package com.ual.pockettrainer.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ual.pockettrainer.entity.Team;
import com.ual.pockettrainer.repository.TeamRepository;
import com.ual.pockettrainer.service.TeamService;

@RestController
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private TeamRepository teamRepository;

    @GetMapping("/allTeams")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/{id}")
    public Optional<Team> getTeamById(@PathVariable Long id) {
        return teamService.getTeamById(id);
    }

    @PostMapping
    public Team createTeamWithPokemons(@RequestBody Team team) {
        return this.teamRepository.save(team);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeamWithPokemons(@PathVariable("id") Long id, @RequestBody Team team) {
        Optional<Team> teamOptional = this.teamRepository.findById(id);

        if (!teamOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Team teamDDBB = teamOptional.get();
        teamDDBB.setName(team.getName());
        teamDDBB.setPokemons(team.getPokemons());
        this.teamRepository.save(teamDDBB);

        return ResponseEntity.ok(teamDDBB);
    }
}