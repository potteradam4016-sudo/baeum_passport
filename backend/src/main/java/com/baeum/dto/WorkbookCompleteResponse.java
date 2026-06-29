package com.baeum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WorkbookCompleteResponse {

    private WorkbookDto workbook;

    @JsonProperty("stamp_created")
    private boolean stampCreated;
}
