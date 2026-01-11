package com.matthewjohnson42.memex.service;

import com.nimbusds.jose.crypto.bc.BouncyCastleProviderSingleton;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.security.Security;

/**
 * An application for storing text data in a Mongo database with ElasticSearch for search
 */
@SpringBootApplication(scanBasePackages={"com.matthewjohnson42.memex"})
public class MemexServiceApplication {

	public static void main(String[] args) {
		Security.addProvider(BouncyCastleProviderSingleton.getInstance());
		SpringApplication.run(MemexServiceApplication.class);
	}

}
