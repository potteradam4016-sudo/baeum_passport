package com.baeum.service;

import java.time.Instant;
import java.util.List;

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

    public List<TravelInfoDto> getAllTravelInfo() {
        Long userId = authUtil.getCurrentUserId();
        return travelInfoRepository.findByUserId(userId).stream()
                .map(this::toDto)
                .toList();
    }

    public TravelInfoDto getTravelInfo(Long countryId) {
        Long userId = authUtil.getCurrentUserId();
        return toDto(findByUserIdAndCountryId(userId, countryId));
    }

    public TravelInfoDto getTravelInfoByCountryName(String countryName) {
        Long userId = authUtil.getCurrentUserId();
        return toDto(findByUserIdAndCountryName(userId, countryName));
    }

    @Transactional
    public TravelInfoDto createTravelInfo(TravelInfoRequestDto request) {
        Long userId = authUtil.getCurrentUserId();
        Long countryId = request.getCountryId();
        String countryName = normalizeCountryName(request);

        if (countryId != null) {
            countryRepository.findById(countryId)
                    .orElseThrow(() -> new ResourceNotFoundException("Country not found."));
        }

        if (travelInfoRepository.findByUserIdAndCountryName(userId, countryName).isPresent()) {
            throw new DuplicateResourceException("Travel info already exists.");
        }

        String now = Instant.now().toString();
        TravelInfo travelInfo = new TravelInfo();
        travelInfo.setUserId(userId);
        travelInfo.setCountryId(countryId);
        travelInfo.setCountryName(countryName);
        travelInfo.setDisplayName(countryName);
        travelInfo.setCreatedAt(now);
        travelInfo.setUpdatedAt(now);
        applyUpdate(travelInfo, request);

        return toDto(travelInfoRepository.save(travelInfo));
    }

    @Transactional
    public TravelInfoDto updateTravelInfo(Long countryId, TravelInfoRequestDto request) {
        Long userId = authUtil.getCurrentUserId();
        TravelInfo travelInfo = findByUserIdAndCountryId(userId, countryId);
        applyUpdate(travelInfo, request);
        travelInfo.setUpdatedAt(Instant.now().toString());
        return toDto(travelInfoRepository.save(travelInfo));
    }

    @Transactional
    public TravelInfoDto updateTravelInfoByCountryName(String countryName, TravelInfoRequestDto request) {
        Long userId = authUtil.getCurrentUserId();
        TravelInfo travelInfo = findByUserIdAndCountryName(userId, countryName);
        applyUpdate(travelInfo, request);
        travelInfo.setUpdatedAt(Instant.now().toString());
        return toDto(travelInfoRepository.save(travelInfo));
    }

    @Transactional
    public void deleteTravelInfoByCountryName(String countryName) {
        Long userId = authUtil.getCurrentUserId();
        TravelInfo travelInfo = findByUserIdAndCountryName(userId, countryName);
        travelInfoRepository.delete(travelInfo);
    }

    private void applyUpdate(TravelInfo travelInfo, TravelInfoRequestDto request) {
        if (request.getCountryId() != null) {
            travelInfo.setCountryId(request.getCountryId());
        }
        if (request.getCountryName() != null) {
            travelInfo.setCountryName(request.getCountryName());
        }
        if (request.getDisplayName() != null) {
            travelInfo.setDisplayName(request.getDisplayName());
        }
        if (request.getArea() != null) {
            travelInfo.setArea(request.getArea());
        }
        if (request.getPopulation() != null) {
            travelInfo.setPopulation(request.getPopulation());
        }
        if (request.getLanguage() != null) {
            travelInfo.setLanguage(request.getLanguage());
        }
        if (request.getCapital() != null) {
            travelInfo.setCapital(request.getCapital());
        }
        if (request.getContinent() != null) {
            travelInfo.setContinent(request.getContinent());
        }
        if (request.getFlagImageUrl() != null) {
            travelInfo.setFlagImageUrl(request.getFlagImageUrl());
        }
        if (request.getMapImageUrl() != null) {
            travelInfo.setMapImageUrl(request.getMapImageUrl());
        }
        if (request.getUserNote() != null) {
            travelInfo.setUserNote(request.getUserNote());
        }
        if (request.getTravelPurpose() != null) {
            travelInfo.setTravelPurpose(request.getTravelPurpose());
        }
        if (request.getPlacesToVisit() != null) {
            travelInfo.setPlacesToVisit(request.getPlacesToVisit());
        }
        if (request.getLocalPhrase() != null) {
            travelInfo.setLocalPhrase(request.getLocalPhrase());
        }
        if (request.getTravelTips() != null) {
            travelInfo.setTravelTips(request.getTravelTips());
        }
        if (request.getLandmark() != null) {
            travelInfo.setLandmark(request.getLandmark());
        }
        if (request.getFoodToTry() != null) {
            travelInfo.setFoodToTry(request.getFoodToTry());
        }
        if (request.getPackingList() != null) {
            travelInfo.setPackingList(request.getPackingList());
        }
        if (request.getCautions() != null) {
            travelInfo.setCautions(request.getCautions());
        }
        if (request.getWeatherNote() != null) {
            travelInfo.setWeatherNote(request.getWeatherNote());
        }
        if (request.getFreeMemo() != null) {
            travelInfo.setFreeMemo(request.getFreeMemo());
        }
    }

    private String normalizeCountryName(TravelInfoRequestDto request) {
        String countryName = request.getCountryName();
        if (countryName == null || countryName.isBlank()) {
            throw new ResourceNotFoundException("Country name is required.");
        }
        return countryName.trim();
    }

    private TravelInfo findByUserIdAndCountryId(Long userId, Long countryId) {
        return travelInfoRepository.findByUserIdAndCountryId(userId, countryId)
                .orElseThrow(() -> new ResourceNotFoundException("Travel info not found."));
    }

    private TravelInfo findByUserIdAndCountryName(Long userId, String countryName) {
        return travelInfoRepository.findByUserIdAndCountryName(userId, countryName)
                .orElseThrow(() -> new ResourceNotFoundException("Travel info not found."));
    }

    private TravelInfoDto toDto(TravelInfo travelInfo) {
        return new TravelInfoDto(
                travelInfo.getId(),
                travelInfo.getCountryId(),
                travelInfo.getCountryName(),
                travelInfo.getDisplayName(),
                travelInfo.getArea(),
                travelInfo.getPopulation(),
                travelInfo.getLanguage(),
                travelInfo.getCapital(),
                travelInfo.getContinent(),
                travelInfo.getFlagImageUrl(),
                travelInfo.getMapImageUrl(),
                travelInfo.getUserNote(),
                travelInfo.getTravelPurpose(),
                travelInfo.getPlacesToVisit(),
                travelInfo.getLocalPhrase(),
                travelInfo.getTravelTips(),
                travelInfo.getLandmark(),
                travelInfo.getFoodToTry(),
                travelInfo.getPackingList(),
                travelInfo.getCautions(),
                travelInfo.getWeatherNote(),
                travelInfo.getFreeMemo(),
                travelInfo.getCreatedAt(),
                travelInfo.getUpdatedAt());
    }
}
