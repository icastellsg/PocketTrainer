package com.ual.pockettrainer.controller;

import java.util.List;
import java.util.Optional;

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

import com.ual.pockettrainer.entity.Team;
import com.ual.pockettrainer.repository.TeamRepository;
import com.ual.pockettrainer.service.TeamService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/teams")
@Tag(name = "Team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private TeamRepository teamRepository;

    @GetMapping("/allTeams")
    public ResponseEntity<List<Team>> getAllTeams() {
        return ResponseEntity.ok(teamService.getAllTeams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Team>> getTeamById(@PathVariable Long id) {
        return ResponseEntity.ok(teamService.getTeamById(id));
    }

    @PostMapping
    public ResponseEntity<Team> createTeamWithPokemons(@RequestBody Team team) {
        return ResponseEntity.ok(this.teamRepository.save(team));
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        teamRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}