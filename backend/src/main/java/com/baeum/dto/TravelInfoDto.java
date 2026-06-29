package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TravelInfoDto {

    private Long id;

    @JsonProperty("country_id")
    private Long countryId;

    @JsonProperty("flag_image_url")
    private String flagImageUrl;

    @JsonProperty("map_image_url")
    private String mapImageUrl;

    @JsonProperty("user_note")
    private String userNote;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("updated_at")
    private String updatedAt;
}
