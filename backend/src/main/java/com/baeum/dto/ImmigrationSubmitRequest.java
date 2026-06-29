package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ImmigrationSubmitRequest {

    @NotNull(message = "입국심사 점수를 입력해 주세요.")
    @Min(value = 0, message = "입국심사 점수는 0점 이상이어야 합니다.")
    @Max(value = 3, message = "입국심사 점수는 3점 이하여야 합니다.")
    @JsonProperty("score")
    private Integer score;
}
