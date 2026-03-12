package com.backend_alejo.registerAndLogin.dto;

import lombok.Builder;

@Builder
public record AuthResponse(
        String token,
        String username,
        String email,
        Long userId
) {}