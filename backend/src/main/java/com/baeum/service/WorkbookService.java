package com.baeum.service;

import java.time.Instant;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baeum.dto.WorkbookCompleteResponse;
import com.baeum.dto.WorkbookDto;
import com.baeum.dto.WorkbookUpdateRequest;
import com.baeum.entity.Country;
import com.baeum.entity.Stamp;
import com.baeum.entity.Workbook;
import com.baeum.exception.DuplicateResourceException;
import com.baeum.exception.ForbiddenException;
import com.baeum.exception.ResourceNotFoundException;
import com.baeum.repository.CountryRepository;
import com.baeum.repository.StampRepository;
import com.baeum.repository.WorkbookRepository;
import com.baeum.util.AuthUtil;

@Service
@Transactional(readOnly = true)
public class WorkbookService {

    private final WorkbookRepository workbookRepository;
    private final CountryRepository countryRepository;
    private final StampRepository stampRepository;
    private final AuthUtil authUtil;

    public WorkbookService(
            WorkbookRepository workbookRepository,
            CountryRepository countryRepository,
            StampRepository stampRepository,
            AuthUtil authUtil) {
        this.workbookRepository = workbookRepository;
        this.countryRepository = countryRepository;
        this.stampRepository = stampRepository;
        this.authUtil = authUtil;
    }

    public WorkbookDto getWorkbook(Long countryId) {
        Long userId = authUtil.getCurrentUserId();
        return toDto(findByUserIdAndCountryId(userId, countryId));
    }

    @Transactional
    public WorkbookDto createWorkbook(Long countryId) {
        Long userId = authUtil.getCurrentUserId();
        Country country = countryRepository.findById(countryId)
                .orElseThrow(() -> new ResourceNotFoundException("해당 국가를 찾을 수 없습니다."));

        if (!Integer.valueOf(1).equals(country.getIsFeatured())) {
            throw new ForbiddenException("대표 국가만 학습지를 작성할 수 있습니다.");
        }

        if (workbookRepository.findByUserIdAndCountryId(userId, countryId).isPresent()) {
            throw new DuplicateResourceException("이미 학습지가 존재합니다.");
        }

        Workbook workbook = new Workbook();
        workbook.setUserId(userId);
        workbook.setCountryId(countryId);
        workbook.setCompleted(0);

        return toDto(workbookRepository.save(workbook));
    }

    @Transactional
    public WorkbookDto updateWorkbook(Long countryId, WorkbookUpdateRequest request) {
        Long userId = authUtil.getCurrentUserId();
        Workbook workbook = findByUserIdAndCountryId(userId, countryId);

        if (request.getOverview() != null) {
            workbook.setOverview(request.getOverview());
        }
        if (request.getMapNote() != null) {
            workbook.setMapNote(request.getMapNote());
        }
        if (request.getFlagNote() != null) {
            workbook.setFlagNote(request.getFlagNote());
        }
        if (request.getTraditionalClothing() != null) {
            workbook.setTraditionalClothing(request.getTraditionalClothing());
        }
        if (request.getTraditionalFood() != null) {
            workbook.setTraditionalFood(request.getTraditionalFood());
        }
        if (request.getTraditionalHouse() != null) {
            workbook.setTraditionalHouse(request.getTraditionalHouse());
        }

        return toDto(workbookRepository.save(workbook));
    }

    @Transactional
    public WorkbookCompleteResponse completeWorkbook(Long countryId) {
        Long userId = authUtil.getCurrentUserId();
        Workbook workbook = findByUserIdAndCountryId(userId, countryId);

        workbook.setCompleted(1);
        workbook.setCompletedAt(Instant.now().toString());
        Workbook savedWorkbook = workbookRepository.save(workbook);

        boolean stampCreated = false;
        if (!stampRepository.existsByUserIdAndCountryId(userId, countryId)) {
            Stamp stamp = new Stamp();
            stamp.setUserId(userId);
            stamp.setCountryId(countryId);
            stamp.setCreatedAt(Instant.now().toString());
            stampRepository.save(stamp);
            stampCreated = true;
        }

        return new WorkbookCompleteResponse(toDto(savedWorkbook), stampCreated);
    }

    private Workbook findByUserIdAndCountryId(Long userId, Long countryId) {
        return workbookRepository.findByUserIdAndCountryId(userId, countryId)
                .orElseThrow(() -> new ResourceNotFoundException("학습지를 찾을 수 없습니다."));
    }

    private WorkbookDto toDto(Workbook workbook) {
        return new WorkbookDto(
                workbook.getId(),
                workbook.getCountryId(),
                workbook.getOverview(),
                workbook.getMapNote(),
                workbook.getFlagNote(),
                workbook.getTraditionalClothing(),
                workbook.getTraditionalFood(),
                workbook.getTraditionalHouse(),
                workbook.getCompleted(),
                workbook.getCompletedAt());
    }
}
