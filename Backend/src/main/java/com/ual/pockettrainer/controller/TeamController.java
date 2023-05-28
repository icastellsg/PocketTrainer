package com.ual.pockettrainer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ual.pockettrainer.entity.Team;
import com.ual.pockettrainer.service.TeamService;

@RestController
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping("/allTeams")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }
}