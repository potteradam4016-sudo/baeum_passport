package com.baeum.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baeum.dto.UserCountryDto;
import com.baeum.dto.UserCountryRequestDto;
import com.baeum.dto.UserCountryResponseDto;
import com.baeum.service.UserCountryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user-countries")
public class UserCountryController {

    private final UserCountryService userCountryService;

    public UserCountryController(UserCountryService userCountryService) {
        this.userCountryService = userCountryService;
    }

    @GetMapping
    public ResponseEntity<List<UserCountryDto>> getAllUserCountries() {
        return ResponseEntity.ok(userCountryService.getAllUserCountries());
    }

    @PostMapping
    public ResponseEntity<UserCountryResponseDto> addUserCountry(
            @Valid @RequestBody UserCountryRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userCountryService.addUserCountry(request.getCountryId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUserCountry(@PathVariable Long id) {
        userCountryService.deleteUserCountry(id);
        return ResponseEntity.ok(Map.of("message", "삭제되었습니다."));
    }

    @PatchMapping("/{id}/immigration")
    public ResponseEntity<UserCountryResponseDto> passImmigration(@PathVariable Long id) {
        return ResponseEntity.ok(userCountryService.passImmigration(id));
    }
}
