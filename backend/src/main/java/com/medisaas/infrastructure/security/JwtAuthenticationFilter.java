package com.medisaas.infrastructure.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.lang.NonNull;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        final String tokenOrgId;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        try {
            userEmail = jwtService.extractUsername(jwt);
            tokenOrgId = jwtService.extractOrganizationId(jwt);

            // Multitenancy Check: Evitar que JWT válido de org A llame a endpoint de org B.
            // Si la ruta contiene /organizations/{orgId}, lo comparamos.
            String requestURI = request.getRequestURI();
            if (requestURI.contains("/organizations/") && tokenOrgId != null) {
                String pathOrgId = extractOrgIdFromPath(requestURI);
                if (pathOrgId != null && !pathOrgId.equals(tokenOrgId)) {
                    response.sendError(HttpStatus.FORBIDDEN.value(), "Acceso denegado: Multitenant cross-origin no permitido.");
                    return;
                }
            }

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                if (jwtService.isTokenValid(jwt)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userEmail, null, new ArrayList<>()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Token inválido o expirado");
            return; // Bloqueamos el paso
        }
        
        filterChain.doFilter(request, response);
    }

    private String extractOrgIdFromPath(String uri) {
        try {
            String[] parts = uri.split("/");
            for (int i = 0; i < parts.length; i++) {
                if (parts[i].equals("organizations") && i + 1 < parts.length) {
                    return parts[i + 1];
                }
            }
        } catch (Exception ignored) {}
        return null;
    }
}
