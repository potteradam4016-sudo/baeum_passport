package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WorkbookDto {

    private Long id;

    @JsonProperty("country_id")
    private Long countryId;

    private String overview;

    @JsonProperty("map_note")
    private String mapNote;

    @JsonProperty("flag_note")
    private String flagNote;

    @JsonProperty("traditional_clothing")
    private String traditionalClothing;

    @JsonProperty("traditional_food")
    private String traditionalFood;

    @JsonProperty("traditional_house")
    private String traditionalHouse;

    private Integer completed;

    @JsonProperty("completed_at")
    private String completedAt;
}
