package com.matthewjohnson42.memex.service.web.controller;

import com.matthewjohnson42.memex.service.data.dto.AuthRequestDto;
import com.matthewjohnson42.memex.service.data.dto.AuthResponseDto;
import com.matthewjohnson42.memex.service.data.dto.EncryptedPasswordRequestDto;
import com.matthewjohnson42.memex.service.data.dto.EncryptedPasswordResponseDto;
import com.matthewjohnson42.memex.service.logic.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Web server HTTP request controller for authentication and authorization requests
 */
@RestController
@RequestMapping(path="/api/v0/auth")
@Slf4j
public class AuthController {

    AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @RequestMapping(method=RequestMethod.POST)
    public ResponseEntity<AuthResponseDto> authenticate(@RequestBody AuthRequestDto authRequestDto) {
        try {
            return new ResponseEntity<>(authService.processAuthenticationRequest(authRequestDto), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @Profile("dev")
    @RequestMapping(method=RequestMethod.POST, path="/getEncryptedPassword")
    public ResponseEntity<EncryptedPasswordResponseDto> getEncryptedPassword(@RequestBody EncryptedPasswordRequestDto dto) {
        return new ResponseEntity<>(
                new EncryptedPasswordResponseDto(authService.getEncryptedPassword(dto)),
                HttpStatus.OK
        );
    }

}
