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

    @JsonProperty("country_name")
    private String countryName;

    @JsonProperty("display_name")
    private String displayName;

    private String area;
    private String population;
    private String language;
    private String capital;
    private String continent;

    @JsonProperty("flag_image_url")
    private String flagImageUrl;

    @JsonProperty("map_image_url")
    private String mapImageUrl;

    @JsonProperty("user_note")
    private String userNote;

    @JsonProperty("travel_purpose")
    private String travelPurpose;

    @JsonProperty("places_to_visit")
    private String placesToVisit;

    @JsonProperty("local_phrase")
    private String localPhrase;

    @JsonProperty("travel_tips")
    private String travelTips;

    private String landmark;

    @JsonProperty("food_to_try")
    private String foodToTry;

    @JsonProperty("packing_list")
    private String packingList;

    private String cautions;

    @JsonProperty("weather_note")
    private String weatherNote;

    @JsonProperty("free_memo")
    private String freeMemo;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("updated_at")
    private String updatedAt;
}
