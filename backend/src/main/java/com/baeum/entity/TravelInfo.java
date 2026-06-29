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
@Table(name = "travel_info")
@Getter
@Setter
@NoArgsConstructor
public class TravelInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "country_id")
    private Long countryId;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "display_name")
    private String displayName;

    private String area;
    private String population;
    private String language;
    private String capital;
    private String continent;

    @Column(name = "flag_image_url")
    private String flagImageUrl;

    @Column(name = "map_image_url")
    private String mapImageUrl;

    @Column(name = "user_note")
    private String userNote;

    @Column(name = "travel_purpose")
    private String travelPurpose;

    @Column(name = "places_to_visit")
    private String placesToVisit;

    @Column(name = "local_phrase")
    private String localPhrase;

    @Column(name = "travel_tips")
    private String travelTips;

    private String landmark;

    @Column(name = "food_to_try")
    private String foodToTry;

    @Column(name = "packing_list")
    private String packingList;

    private String cautions;

    @Column(name = "weather_note")
    private String weatherNote;

    @Column(name = "free_memo")
    private String freeMemo;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "updated_at")
    private String updatedAt;
}
