package com.matthewjohnson42.memex.service.data.dto;

public class EncryptedPasswordResponseDto {

    private String encryptedPassword;

    public EncryptedPasswordResponseDto(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public EncryptedPasswordResponseDto setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
        return this;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

}
