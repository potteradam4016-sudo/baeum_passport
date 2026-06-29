package com.baeum.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baeum.dto.AuthResponseDto;
import com.baeum.dto.LoginRequestDto;
import com.baeum.dto.SignupRequestDto;
import com.baeum.dto.UserInfoDto;
import com.baeum.service.AuthService;
import com.baeum.util.AuthUtil;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final AuthUtil authUtil;

    public AuthController(AuthService authService, AuthUtil authUtil) {
        this.authService = authService;
        this.authUtil = authUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponseDto> signup(@Valid @RequestBody SignupRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfoDto> getMyInfo() {
        Long userId = authUtil.getCurrentUserId();
        return ResponseEntity.ok(authService.getMyInfo(userId));
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        return ResponseEntity.ok(Map.of("message", "로그아웃 되었습니다."));
    }
}
