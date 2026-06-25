package com.baeum.service;

import java.time.Instant;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baeum.dto.TravelInfoDto;
import com.baeum.dto.TravelInfoRequestDto;
import com.baeum.entity.TravelInfo;
import com.baeum.exception.DuplicateResourceException;
import com.baeum.exception.ResourceNotFoundException;
import com.baeum.repository.CountryRepository;
import com.baeum.repository.TravelInfoRepository;
import com.baeum.util.AuthUtil;

@Service
@Transactional(readOnly = true)
public class TravelInfoService {

    private final TravelInfoRepository travelInfoRepository;
    private final CountryRepository countryRepository;
    private final AuthUtil authUtil;

    public TravelInfoService(
            TravelInfoRepository travelInfoRepository,
            CountryRepository countryRepository,
            AuthUtil authUtil) {
        this.travelInfoRepository = travelInfoRepository;
        this.countryRepository = countryRepository;
        this.authUtil = authUtil;
    }

    public TravelInfoDto getTravelInfo(Long countryId) {
        Long userId = authUtil.getCurrentUserId();
        TravelInfo travelInfo = findByUserIdAndCountryId(userId, countryId);

        return toDto(travelInfo);
    }

    @Transactional
    public TravelInfoDto createTravelInfo(TravelInfoRequestDto request) {
        Long userId = authUtil.getCurrentUserId();
        Long countryId = request.getCountryId();

        countryRepository.findById(countryId)
                .orElseThrow(() -> new ResourceNotFoundException("해당 국가를 찾을 수 없습니다."));

        if (travelInfoRepository.findByUserIdAndCountryId(userId, countryId).isPresent()) {
            throw new DuplicateResourceException("이미 여행 정보가 존재합니다.");
        }

        String now = Instant.now().toString();
        TravelInfo travelInfo = new TravelInfo();
        travelInfo.setUserId(userId);
        travelInfo.setCountryId(countryId);
        travelInfo.setFlagImageUrl(request.getFlagImageUrl());
        travelInfo.setMapImageUrl(request.getMapImageUrl());
        travelInfo.setUserNote(request.getUserNote());
        travelInfo.setCreatedAt(now);
        travelInfo.setUpdatedAt(now);

        return toDto(travelInfoRepository.save(travelInfo));
    }

    @Transactional
    public TravelInfoDto updateTravelInfo(Long countryId, TravelInfoRequestDto request) {
        Long userId = authUtil.getCurrentUserId();
        TravelInfo travelInfo = findByUserIdAndCountryId(userId, countryId);

        if (request.getFlagImageUrl() != null) {
            travelInfo.setFlagImageUrl(request.getFlagImageUrl());
        }
        if (request.getMapImageUrl() != null) {
            travelInfo.setMapImageUrl(request.getMapImageUrl());
        }
        if (request.getUserNote() != null) {
            travelInfo.setUserNote(request.getUserNote());
        }
        travelInfo.setUpdatedAt(Instant.now().toString());

        return toDto(travelInfoRepository.save(travelInfo));
    }

    private TravelInfo findByUserIdAndCountryId(Long userId, Long countryId) {
        return travelInfoRepository.findByUserIdAndCountryId(userId, countryId)
                .orElseThrow(() -> new ResourceNotFoundException("여행 정보를 찾을 수 없습니다."));
    }

    private TravelInfoDto toDto(TravelInfo travelInfo) {
        return new TravelInfoDto(
                travelInfo.getId(),
                travelInfo.getCountryId(),
                travelInfo.getFlagImageUrl(),
                travelInfo.getMapImageUrl(),
                travelInfo.getUserNote(),
                travelInfo.getCreatedAt(),
                travelInfo.getUpdatedAt());
    }
}
