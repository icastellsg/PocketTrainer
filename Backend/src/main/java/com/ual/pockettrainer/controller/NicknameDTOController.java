package com.ual.pockettrainer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ual.pockettrainer.dto.NicknameDTO;
import com.ual.pockettrainer.service.NicknameGeneratorService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/nickname")
@Tag(name = "Nickname generator (Scrapper)")
public class NicknameDTOController {
    @Autowired
    private NicknameGeneratorService nicknameGeneratorService;

    @GetMapping("generate")
    public ResponseEntity<NicknameDTO> getBotData() {
        return new ResponseEntity<NicknameDTO>(nicknameGeneratorService.retrieveNickname(),
                HttpStatus.OK);
    }
}
