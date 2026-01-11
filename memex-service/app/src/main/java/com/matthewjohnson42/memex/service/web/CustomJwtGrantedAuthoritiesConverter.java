package com.matthewjohnson42.memex.service.web;

import com.matthewjohnson42.memex.service.logic.service.AuthService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Collection;

/**
 * Provides Spring authorities objects during the handling of a request by the Spring Security filter.
 * Takes a JWT as input (includes encoded information about the user).
 */
@Component
public class CustomJwtGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private AuthService authService;

    public CustomJwtGrantedAuthoritiesConverter(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        return authService.getAuthorities(jwt);
    }

}
