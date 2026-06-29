package com.baeum.jwt;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(
                jwtUtil,
                "secret",
                "baeumyeokwonSecretKey1234567890abcdef");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 86_400_000L);
    }

    @Test
    void generatesAndParsesToken() {
        String token = jwtUtil.generateToken(7L, "student7");

        assertTrue(jwtUtil.validateToken(token));
        assertEquals("student7", jwtUtil.getUsernameFromToken(token));
        assertEquals(7L, jwtUtil.getUserIdFromToken(token));
    }

    @Test
    void rejectsInvalidToken() {
        assertFalse(jwtUtil.validateToken("invalid-token"));
    }
}
