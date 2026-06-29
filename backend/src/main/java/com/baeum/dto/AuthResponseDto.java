package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponseDto {

    private String token;

    @JsonProperty("user_id")
    private Long userId;

    private String username;
    private String name;
}
