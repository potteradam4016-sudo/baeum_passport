package com.baeum.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baeum.dto.TravelInfoDto;
import com.baeum.dto.TravelInfoRequestDto;
import com.baeum.service.TravelInfoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/travel-info")
public class TravelInfoController {

    private final TravelInfoService travelInfoService;

    public TravelInfoController(TravelInfoService travelInfoService) {
        this.travelInfoService = travelInfoService;
    }

    @GetMapping("/{countryId}")
    public ResponseEntity<TravelInfoDto> getTravelInfo(@PathVariable Long countryId) {
        return ResponseEntity.ok(travelInfoService.getTravelInfo(countryId));
    }

    @PostMapping
    public ResponseEntity<TravelInfoDto> createTravelInfo(
            @Valid @RequestBody TravelInfoRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(travelInfoService.createTravelInfo(request));
    }

    @PatchMapping("/{countryId}")
    public ResponseEntity<TravelInfoDto> updateTravelInfo(
            @PathVariable Long countryId,
            @RequestBody TravelInfoRequestDto request) {
        return ResponseEntity.ok(travelInfoService.updateTravelInfo(countryId, request));
    }
}
