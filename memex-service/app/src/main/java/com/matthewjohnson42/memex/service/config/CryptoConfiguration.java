package com.matthewjohnson42.memex.service.config;

import com.nimbusds.jose.KeyLengthException;
import com.nimbusds.jose.crypto.MACSigner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Configuration
public class CryptoConfiguration {

    @Value("${security.oauth2.encKeySecret}")
    private String tokenEncryptionKeySecret;

    @Value("${security.userPassword.encKeySecret}")
    private String userPasswordEncryptionKeySecret;

    @Bean
    public MACSigner macSigner(SecretKey secretKey) throws KeyLengthException {
        return new MACSigner(secretKey);
    }

    @Bean
    public SecretKey secretKey() throws InvalidKeySpecException, NoSuchAlgorithmException {
        // ref: org.bouncycastle.jcajce.provider.digest.SHA256.PBEWithMacKeyFactory
        SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBEwithHmacSHA256");
        char[] secret = tokenEncryptionKeySecret.toCharArray();
        int saltByteCt = 32;
        byte[] salt = new byte[saltByteCt];
        for (int i = 0; i < saltByteCt; i++) {
            salt[i] = (byte) Math.floor(Math.random() * 8);
        }
        PBEKeySpec keySpec = new PBEKeySpec(secret, salt, 185000);
        return secretKeyFactory.generateSecret(keySpec);
    }

    // used by oauth2ResourceServer in JWT mode
    // see OAuth2ResourceServerConfigurer.JwtConfigurer.getJwtDecoder()
    @Bean
    public JwtDecoder jwtDecoder(SecretKey secretKey) {
        return NimbusJwtDecoder.withSecretKey(
                secretKey
        ).build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Pbkdf2PasswordEncoder(userPasswordEncryptionKeySecret);
    }

}
