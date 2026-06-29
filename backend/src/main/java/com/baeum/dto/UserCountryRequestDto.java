package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCountryRequestDto {

    @NotNull(message = "국가를 선택해주세요.")
    @JsonProperty("country_id")
    private Long countryId;
}
