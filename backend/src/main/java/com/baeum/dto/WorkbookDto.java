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

    private String capital;
    private String language;
    private String population;
    private String area;

    @JsonProperty("population_comparison")
    private String populationComparison;

    @JsonProperty("area_comparison")
    private String areaComparison;

    @JsonProperty("flag_image")
    private String flagImage;

    @JsonProperty("map_image")
    private String mapImage;

    @JsonProperty("flag_observation")
    private String flagObservation;

    private String continent;

    @JsonProperty("map_location")
    private String mapLocation;

    private String greeting;

    @JsonProperty("research_topic")
    private String researchTopic;

    @JsonProperty("similarity_with_korea")
    private String similarityWithKorea;

    @JsonProperty("difference_from_korea")
    private String differenceFromKorea;

    private String question;
    private String sources;
    private Integer completed;

    @JsonProperty("completed_at")
    private String completedAt;
}
