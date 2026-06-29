package com.baeum.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp");

    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping("/flag")
    public ResponseEntity<Map<String, String>> uploadFlag(@RequestParam("image") MultipartFile file) {
        return uploadImage(file, "flag_");
    }

    @PostMapping("/map")
    public ResponseEntity<Map<String, String>> uploadMap(@RequestParam("image") MultipartFile file) {
        return uploadImage(file, "map_");
    }

    private ResponseEntity<Map<String, String>> uploadImage(MultipartFile file, String prefix) {
        if (!ALLOWED_CONTENT_TYPES.contains(file.getContentType())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "지원하지 않는 파일 형식입니다."));
        }

        String originalFilename = StringUtils.cleanPath(
                StringUtils.hasText(file.getOriginalFilename()) ? file.getOriginalFilename() : "image");
        String filename = prefix + System.currentTimeMillis() + "_" + originalFilename;

        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            Path targetPath = uploadPath.resolve(filename).normalize();
            if (!targetPath.startsWith(uploadPath)) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "파일 업로드에 실패했습니다."));
            }

            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("url", "/uploads/" + filename));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "파일 업로드에 실패했습니다."));
        }
    }
}
