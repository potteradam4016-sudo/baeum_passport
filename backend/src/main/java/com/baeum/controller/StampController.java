package com.baeum.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baeum.dto.StampDto;
import com.baeum.service.StampService;

@RestController
@RequestMapping("/api/stamps")
public class StampController {

    private final StampService stampService;

    public StampController(StampService stampService) {
        this.stampService = stampService;
    }

    @GetMapping
    public ResponseEntity<List<StampDto>> getAllStamps() {
        return ResponseEntity.ok(stampService.getAllStamps());
    }

    @GetMapping("/{countryId}")
    public ResponseEntity<StampDto> getStampByCountryId(@PathVariable Long countryId) {
        return ResponseEntity.ok(stampService.getStampByCountryId(countryId));
    }
}
