package com.baeum.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baeum.dto.StampDto;
import com.baeum.entity.Continent;
import com.baeum.entity.Country;
import com.baeum.entity.Stamp;
import com.baeum.exception.ResourceNotFoundException;
import com.baeum.repository.ContinentRepository;
import com.baeum.repository.CountryRepository;
import com.baeum.repository.StampRepository;
import com.baeum.util.AuthUtil;

@Service
@Transactional(readOnly = true)
public class StampService {

    private final StampRepository stampRepository;
    private final CountryRepository countryRepository;
    private final ContinentRepository continentRepository;
    private final AuthUtil authUtil;

    public StampService(
            StampRepository stampRepository,
            CountryRepository countryRepository,
            ContinentRepository continentRepository,
            AuthUtil authUtil) {
        this.stampRepository = stampRepository;
        this.countryRepository = countryRepository;
        this.continentRepository = continentRepository;
        this.authUtil = authUtil;
    }

    public List<StampDto> getAllStamps() {
        Long userId = authUtil.getCurrentUserId();

        return stampRepository.findByUserId(userId).stream()
                .map(this::toDto)
                .toList();
    }

    public StampDto getStampByCountryId(Long countryId) {
        Long userId = authUtil.getCurrentUserId();
        Stamp stamp = stampRepository.findByUserIdAndCountryId(userId, countryId)
                .orElseThrow(() -> new ResourceNotFoundException("해당 국가의 도장을 찾을 수 없습니다."));

        return toDto(stamp);
    }

    private StampDto toDto(Stamp stamp) {
        Country country = countryRepository.findById(stamp.getCountryId())
                .orElseThrow(() -> new ResourceNotFoundException("해당 국가를 찾을 수 없습니다."));
        Continent continent = continentRepository.findById(country.getContinentId())
                .orElseThrow(() -> new ResourceNotFoundException("해당 대륙을 찾을 수 없습니다."));

        return new StampDto(
                stamp.getId(),
                country.getId(),
                country.getName(),
                country.getFlagImageUrl(),
                continent.getName(),
                stamp.getCreatedAt());
    }
}
