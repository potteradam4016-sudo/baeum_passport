package com.baeum.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "workbooks")
@Getter
@Setter
@NoArgsConstructor
public class Workbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "country_id")
    private Long countryId;

    private String capital;
    private String language;
    private String population;
    private String area;

    @Column(name = "population_comparison")
    private String populationComparison;

    @Column(name = "area_comparison")
    private String areaComparison;

    @Column(name = "flag_image")
    private String flagImage;

    @Column(name = "map_image")
    private String mapImage;

    @Column(name = "flag_observation")
    private String flagObservation;

    private String continent;

    @Column(name = "map_location")
    private String mapLocation;

    private String greeting;

    @Column(name = "research_topic")
    private String researchTopic;

    @Column(name = "similarity_with_korea")
    private String similarityWithKorea;

    @Column(name = "difference_from_korea")
    private String differenceFromKorea;

    private String question;
    private String sources;

    private String overview;

    @Column(name = "map_note")
    private String mapNote;

    @Column(name = "flag_note")
    private String flagNote;

    @Column(name = "traditional_clothing")
    private String traditionalClothing;

    @Column(name = "traditional_food")
    private String traditionalFood;

    @Column(name = "traditional_house")
    private String traditionalHouse;

    private Integer completed;

    @Column(name = "completed_at")
    private String completedAt;
}
