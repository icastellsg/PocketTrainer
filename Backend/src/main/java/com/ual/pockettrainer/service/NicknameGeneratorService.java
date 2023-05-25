package com.ual.pockettrainer.service;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

import com.ual.pockettrainer.dto.NicknameDTO;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import org.springframework.stereotype.Component;

@Component("NicknameService")
public class NicknameGeneratorService {

    private Playwright playwrightInstance = Playwright.create();

    Browser browserInstance = this.playwrightInstance.chromium().launch();

    public NicknameDTO retrieveNickname() {
        Browser browserInstance = this.playwrightInstance.chromium().launch();
        return new NicknameDTO(generateNickname(browserInstance));
    }

    private String generateNickname(Browser browser) {
        String name;

        Page page = browser.newPage();
        page.navigate("https://psycatgames.com/name-generator/pokemon/");
        page.waitForSelector(
                "#generate");
        page.click("#generate");

        Document webPage = Jsoup.parse(page.content());

        Element nickname = webPage.selectFirst("#result");

        if (nickname == null) {
            return null;
        }

        name = nickname.text();

        page.close();

        return name;
    }

}
