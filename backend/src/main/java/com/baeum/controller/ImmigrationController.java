package com.baeum.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baeum.dto.ImmigrationStatusDto;
import com.baeum.dto.ImmigrationSubmitRequest;
import com.baeum.service.ImmigrationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/immigration")
public class ImmigrationController {

    private final ImmigrationService immigrationService;

    public ImmigrationController(ImmigrationService immigrationService) {
        this.immigrationService = immigrationService;
    }

    @GetMapping("/{countryId}")
    public ResponseEntity<ImmigrationStatusDto> getImmigrationStatus(@PathVariable Long countryId) {
        return ResponseEntity.ok(immigrationService.getImmigrationStatus(countryId));
    }

    @PostMapping("/{countryId}/submit")
    public ResponseEntity<ImmigrationStatusDto> submitImmigration(
            @PathVariable Long countryId,
            @Valid @RequestBody ImmigrationSubmitRequest request) {
        return ResponseEntity.ok(immigrationService.submitImmigration(countryId, request.getScore()));
    }

    @PostMapping("/{countryId}/retry")
    public ResponseEntity<ImmigrationStatusDto> retryImmigration(@PathVariable Long countryId) {
        return ResponseEntity.ok(immigrationService.retryImmigration(countryId));
    }
}
