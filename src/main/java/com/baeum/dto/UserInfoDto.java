package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserInfoDto {

    private Long id;
    private String username;
    private String name;
    private Integer grade;

    @JsonProperty("class_num")
    private Integer classNum;

    @JsonProperty("student_num")
    private Integer studentNum;

    private String gender;

    @JsonProperty("birth_date")
    private String birthDate;
}
