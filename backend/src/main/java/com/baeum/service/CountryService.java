package com.baeum.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baeum.dto.ContinentDto;
import com.baeum.dto.CountryDto;
import com.baeum.entity.Continent;
import com.baeum.entity.Country;
import com.baeum.exception.ResourceNotFoundException;
import com.baeum.repository.ContinentRepository;
import com.baeum.repository.CountryRepository;

@Service
@Transactional(readOnly = true)
public class CountryService {

    private final ContinentRepository continentRepository;
    private final CountryRepository countryRepository;

    public CountryService(
            ContinentRepository continentRepository,
            CountryRepository countryRepository) {
        this.continentRepository = continentRepository;
        this.countryRepository = countryRepository;
    }

    public List<ContinentDto> getContinents() {
        return continentRepository.findAll().stream()
                .map(this::toContinentDto)
                .toList();
    }

    public List<CountryDto> getCountries() {
        return countryRepository.findAll().stream()
                .map(this::toCountryDto)
                .toList();
    }

    public List<CountryDto> getFeaturedCountries() {
        return countryRepository.findByIsFeatured(1).stream()
                .map(this::toCountryDto)
                .toList();
    }

    public CountryDto getCountry(Long id) {
        return countryRepository.findById(id)
                .map(this::toCountryDto)
                .orElseThrow(() -> new ResourceNotFoundException("Country not found."));
    }

    private ContinentDto toContinentDto(Continent continent) {
        return new ContinentDto(
                continent.getId(),
                continent.getName(),
                continent.getColor(),
                continent.getPopulation(),
                continent.getAreaKm2(),
                continent.getCountryCount());
    }

    private CountryDto toCountryDto(Country country) {
        String continentName = continentRepository.findById(country.getContinentId())
                .map(Continent::getName)
                .orElse(null);

        return new CountryDto(
                country.getId(),
                country.getName(),
                country.getContinentId(),
                continentName,
                country.getFlagImageUrl(),
                country.getMapImageUrl(),
                country.getCapital(),
                country.getPopulation(),
                country.getAreaKm2(),
                country.getLanguage(),
                country.getDescription(),
                country.getIsFeatured(),
                country.getCurrency(),
                country.getAreaComparison(),
                country.getPopulationComparison(),
                country.getGreeting(),
                country.getOverview(),
                country.getMapNote(),
                country.getClothing(),
                country.getFood(),
                country.getHouse(),
                country.getColor());
    }
}
