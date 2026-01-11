package com.matthewjohnson42.memex.service.logic.service;

import com.matthewjohnson42.memex.service.data.dto.AuthRequestDto;
import com.matthewjohnson42.memex.service.data.dto.AuthResponseDto;
import com.matthewjohnson42.memex.service.data.dto.UserDetailsDto;
import com.matthewjohnson42.memex.service.data.mongo.service.UserDetailsMongoService;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import javax.security.auth.login.CredentialException;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

@Service
public class AuthService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final long TOKEN_VALIDITY_INTERVAL = (long) 7 * 24 * 60 * 60 * 1000;

    private final MACSigner macSigner;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsMongoService userDetailsMongoService;

    public AuthService(
            MACSigner macSigner,
            PasswordEncoder passwordEncoder,
            UserDetailsMongoService userDetailsMongoService
    ) {
        this.macSigner = macSigner;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsMongoService = userDetailsMongoService;
    }

    public AuthResponseDto processAuthenticationRequest(AuthRequestDto authRequestDto) throws JOSEException, CredentialException {
        UserDetailsDto userDetailsDto = userDetailsMongoService.getById(authRequestDto.getUsername());
        String encodedPassword = userDetailsMongoService.getEncodedPasswordForUser(authRequestDto.getUsername());
        if (passwordEncoder.matches(authRequestDto.getPassword(), encodedPassword)) {
            SignedJWT signedJWT = getSignedJwt(userDetailsDto);
            return new AuthResponseDto().setToken(signedJWT.serialize());
        } else {
            logger.error("Failure to authenticate user password");
            throw new CredentialException("Failed to authenticate user password");
        }
    }

    public Collection<GrantedAuthority> getAuthorities(Jwt jwt) {
        Collection<GrantedAuthority> authorities = new HashSet<>();
        UserDetailsDto userDetailsDto = userDetailsMongoService.getById(jwt.getSubject());
        for (String authority: userDetailsDto.getAuthorities()) {
            authorities.add(new SimpleGrantedAuthority(authority));
        }
        return authorities;
    }

    private SignedJWT getSignedJwt(UserDetailsDto userDetailsDto) throws JOSEException {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder()
                .issuer("memex-service")
                .expirationTime(new Date(System.currentTimeMillis() + TOKEN_VALIDITY_INTERVAL))
                .subject(userDetailsDto.getUsername());
        for (String authority: userDetailsDto.getAuthorities()) {
            builder.claim("Authority", authority);
        }
        JWTClaimsSet claims = builder.build();
        SignedJWT signedJWT = new SignedJWT(jwsHeader, claims);
        signedJWT.sign(macSigner);
        return signedJWT;
    }

}
