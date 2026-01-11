package com.matthewjohnson42.memex.service.data.dto;

/**
 * A response object containing a bearer token
 * See WebSecurityConfiguration, CustomJwtGrantedAuthoritiesController
 */
public class AuthResponseDto {

    private String token;

    public AuthResponseDto() { }

    public String getToken() {
        return token;
    }

    public AuthResponseDto setToken(String token) {
        this.token = token;
        return this;
    }

}
