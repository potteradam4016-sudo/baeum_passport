package com.baeum.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baeum.dto.CountryDto;
import com.baeum.service.CountryService;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public ResponseEntity<List<CountryDto>> getCountries() {
        return ResponseEntity.ok(countryService.getCountries());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<CountryDto>> getFeaturedCountries() {
        return ResponseEntity.ok(countryService.getFeaturedCountries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountryDto> getCountry(@PathVariable Long id) {
        return ResponseEntity.ok(countryService.getCountry(id));
    }
}
