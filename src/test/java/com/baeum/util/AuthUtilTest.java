package com.baeum.util;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Collections;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import com.baeum.exception.UnauthorizedException;

class AuthUtilTest {

    private final AuthUtil authUtil = new AuthUtil();

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void returnsAuthenticatedUserId() {
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(42L, null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        assertEquals(42L, authUtil.getCurrentUserId());
    }

    @Test
    void rejectsUnauthenticatedRequest() {
        UnauthorizedException exception = assertThrows(
                UnauthorizedException.class,
                authUtil::getCurrentUserId);

        assertEquals("로그인이 필요합니다.", exception.getMessage());
    }
}
