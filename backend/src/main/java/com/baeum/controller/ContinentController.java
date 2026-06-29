package com.baeum.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baeum.dto.ContinentDto;
import com.baeum.service.CountryService;

@RestController
@RequestMapping("/api/continents")
public class ContinentController {

    private final CountryService countryService;

    public ContinentController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public ResponseEntity<List<ContinentDto>> getContinents() {
        return ResponseEntity.ok(countryService.getContinents());
    }
}
