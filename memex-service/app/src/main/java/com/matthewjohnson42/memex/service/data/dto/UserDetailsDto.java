package com.matthewjohnson42.memex.service.data.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.matthewjohnson42.memex.data.dto.DtoForEntity;

import java.util.HashSet;
import java.util.Set;

public class UserDetailsDto extends DtoForEntity<String> {

    private String username;
    private String password;
    private Set<String> authorities;

    public UserDetailsDto() {
        authorities = new HashSet<>();
    }

    public UserDetailsDto(UserDetailsDto userDetailsDto) {
        super(userDetailsDto);
        this.username = userDetailsDto.getUsername();
        this.password = userDetailsDto.getPassword();
        this.authorities = userDetailsDto.getAuthorities();
    }

    @JsonCreator
    public UserDetailsDto(
            @JsonProperty(value="username", required=true) String username,
            @JsonProperty(value="password", required=true) String password,
            @JsonProperty(value="authorities", required=false) Set<String> authorities
    ) {
        this.username = username;
        this.password = password;
        if (authorities != null) {
            this.authorities = authorities;
        } else {
            this.authorities = new HashSet<>();
        }
    }

    @Override
    @JsonIgnore
    public String getId() {
        return username;
    }

    @Override
    @JsonIgnore
    public UserDetailsDto setId(String username) {
        this.username = username;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserDetailsDto setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserDetailsDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public UserDetailsDto setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
        return this;
    }

}
