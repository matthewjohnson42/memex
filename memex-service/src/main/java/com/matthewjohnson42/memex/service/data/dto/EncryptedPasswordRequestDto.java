package com.matthewjohnson42.memex.service.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EncryptedPasswordRequestDto {

    private String password;

    public EncryptedPasswordRequestDto(@JsonProperty(value="password", required=true) String password) {
        this.password = password;
    }

    public EncryptedPasswordRequestDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getPassword() {
        return password;
    }

}
