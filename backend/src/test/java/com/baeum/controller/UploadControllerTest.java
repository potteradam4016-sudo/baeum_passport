package com.baeum.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

class UploadControllerTest {

    @TempDir
    Path uploadDir;

    @AfterEach
    void tearDown() {
        RequestContextHolder.resetRequestAttributes();
    }

    @Test
    void uploadsFlagImageAndReturnsAbsoluteUrl() {
        UploadController controller = uploadController();
        bindRequest();
        MockMultipartFile file = new MockMultipartFile(
                "image",
                "flag.png",
                "image/png",
                new byte[] { 1, 2, 3 });

        var response = controller.uploadFlag(file);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        Map<String, String> body = response.getBody();
        assertNotNull(body);
        String url = body.get("url");
        assertNotNull(url);
        assertTrue(url.startsWith("http://localhost:4000/uploads/flag_"));
        assertTrue(Files.exists(uploadDir.resolve(url.substring(url.lastIndexOf("/") + 1))));
    }

    @Test
    void rejectsUnsupportedFileType() {
        UploadController controller = uploadController();
        bindRequest();
        MockMultipartFile file = new MockMultipartFile(
                "image",
                "memo.txt",
                "text/plain",
                "hello".getBytes());

        var response = controller.uploadMap(file);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("지원하지 않는 파일 형식입니다.", response.getBody().get("error"));
    }

    @Test
    void rejectsEmptyFile() {
        UploadController controller = uploadController();
        bindRequest();
        MockMultipartFile file = new MockMultipartFile(
                "image",
                "empty.png",
                "image/png",
                new byte[0]);

        var response = controller.uploadFlag(file);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("업로드할 이미지 파일을 선택해 주세요.", response.getBody().get("error"));
    }

    private UploadController uploadController() {
        UploadController controller = new UploadController();
        ReflectionTestUtils.setField(controller, "uploadDir", uploadDir.toString());
        return controller;
    }

    private void bindRequest() {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setScheme("http");
        request.setServerName("localhost");
        request.setServerPort(4000);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
    }
}
