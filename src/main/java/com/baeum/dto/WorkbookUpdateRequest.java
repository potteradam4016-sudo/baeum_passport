package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkbookUpdateRequest {

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
}
