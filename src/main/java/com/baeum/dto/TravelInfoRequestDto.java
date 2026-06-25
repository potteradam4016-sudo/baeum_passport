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
public class TravelInfoRequestDto {

    @NotNull(message = "국가를 선택해주세요.")
    @JsonProperty("country_id")
    private Long countryId;

    @JsonProperty("flag_image_url")
    private String flagImageUrl;

    @JsonProperty("map_image_url")
    private String mapImageUrl;

    @JsonProperty("user_note")
    private String userNote;
}
