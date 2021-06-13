package com.matthewjohnson42.memex.dataservice.config;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.util.Collections;

@Configuration
public class GoogleDriveConfig {

    Logger logger = LoggerFactory.getLogger(GoogleDriveConfig.class);

    private final String GOOGLE_CLOUD_OAUTH_SCOPE_DRIVE = "https://www.googleapis.com/auth/drive";

    @Value("${google.cloud.serviceAccountId}")
    String serviceAccountId;

    @Value("${google.cloud.serviceAccountKeyFile}")
    String serviceAccountKeyFile;

    @Bean
    public Drive drive(HttpTransport httpTransport) {
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        File keyFile = new File(serviceAccountKeyFile);
        GoogleCredential requestInitializer;
        try {
            requestInitializer = new GoogleCredential.Builder()
                    .setTransport(httpTransport)
                    .setJsonFactory(jsonFactory)
                    .setServiceAccountId(serviceAccountId)
                    .setServiceAccountScopes(Collections.singleton(GOOGLE_CLOUD_OAUTH_SCOPE_DRIVE))
                    .setServiceAccountPrivateKeyFromP12File(keyFile)
                    .build();
        } catch (Exception e) {
            logger.error("Error when building credentials", e);
            throw new RuntimeException("Error when building credentials", e);
        }
        return new Drive(httpTransport, jsonFactory, requestInitializer);
    }

    @Bean
    public HttpTransport httpTransport() {
        try {
            return GoogleNetHttpTransport.newTrustedTransport();
        } catch (Exception e) {
            logger.error("Error when initializing HTTP Transport for Google Drive API", e);
            throw new RuntimeException("Error when initializing HTTP Transport for Google Drive API", e);
        }
    }

}
