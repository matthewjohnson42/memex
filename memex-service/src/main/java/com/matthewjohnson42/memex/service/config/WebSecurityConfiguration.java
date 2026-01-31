package com.matthewjohnson42.memex.service.config;

import com.matthewjohnson42.memex.service.web.CustomJwtGrantedAuthoritiesConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.List;

@EnableWebSecurity
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private List<String> allowedOrigins = new ArrayList<>();
    private List<String> activeProfiles = new ArrayList<>();

    private final CustomJwtGrantedAuthoritiesConverter customJwtGrantedAuthConverter;

    public WebSecurityConfiguration(
            CustomJwtGrantedAuthoritiesConverter customJwtGrantedAuthConverter,
            @Value("${cors.allowed-origins}") String allowedOriginsFromYml,
            @Value("${spring.profiles.active}") String activeProfilesFromContext) {
        this.customJwtGrantedAuthConverter = customJwtGrantedAuthConverter;
        List<String> allowedOriginList = List.of(allowedOriginsFromYml.split(","));
        for (String origin: allowedOriginList) {
            allowedOrigins.add(origin.trim());
        }
        List<String> activeProfilesList = List.of(activeProfilesFromContext.split(","));
        for (String profile: activeProfilesList) {
            activeProfiles.add(profile.trim());
        }
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        if (activeProfiles.contains("dev")) {
            httpSecurity
                    .authorizeRequests()
                    .antMatchers("/api/v0/auth/**").permitAll()
                    .antMatchers("/**").authenticated()
                    .and().csrf().ignoringAntMatchers("/api/v0/auth/**")
                    .and().cors().configurationSource(
                            urlBasedCorsConfigurationSource()
                    )
                    .and().oauth2ResourceServer().jwt(
                            jwtConfigurer -> jwtConfigurer.jwtAuthenticationConverter(jwtAuthenticationConverter())
                    );
        } else {
            httpSecurity
                    .authorizeRequests()
                    .antMatchers("/api/v0/auth").permitAll()
                    .antMatchers("/**").authenticated()
                    .and().csrf().ignoringAntMatchers("/api/v0/auth")
                    .and().cors().configurationSource(
                            urlBasedCorsConfigurationSource()
                    )
                    .and().oauth2ResourceServer().jwt(
                            jwtConfigurer -> jwtConfigurer.jwtAuthenticationConverter(jwtAuthenticationConverter())
                    );
        }
    }

    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(customJwtGrantedAuthConverter);
        return jwtAuthenticationConverter;
    }

    UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource() {
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(allowedOrigins);
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.setMaxAge(1800L);
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return urlBasedCorsConfigurationSource;
    }

}
