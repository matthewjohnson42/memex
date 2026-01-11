package com.matthewjohnson42.memex.service.data.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthRequestDto {

    private String username;
    private String password;

    public AuthRequestDto() { }

    @JsonCreator
    public AuthRequestDto(
            @JsonProperty(value="username", required=true) String username,
            @JsonProperty(value="password", required=true) String password
    ) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public AuthRequestDto setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public AuthRequestDto setPassword(String password) {
        this.password = password;
        return this;
    }

}
