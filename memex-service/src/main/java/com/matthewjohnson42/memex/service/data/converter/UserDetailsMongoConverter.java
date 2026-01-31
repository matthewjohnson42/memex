package com.matthewjohnson42.memex.service.data.converter;

import com.matthewjohnson42.memex.data.converter.DtoEntityConverter;
import com.matthewjohnson42.memex.service.data.dto.UserDetailsDto;
import com.matthewjohnson42.memex.service.data.mongo.entity.UserDetailsMongo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Entity/DTO converter for user details
 */
@Component
public class UserDetailsMongoConverter implements DtoEntityConverter<String, UserDetailsDto, UserDetailsMongo> {

    private PasswordEncoder encoder;

    public UserDetailsMongoConverter(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Override
    public UserDetailsMongo convertDto(UserDetailsDto userDetailsDto) {
        return updateFromDto(new UserDetailsMongo(), userDetailsDto);
    }

    @Override
    public UserDetailsDto convertEntity(UserDetailsMongo userDetailsMongo) {
        return updateFromEntity(new UserDetailsDto(), userDetailsMongo);
    }

    @Override
    public UserDetailsMongo updateFromDto(UserDetailsMongo userDetailsMongo, UserDetailsDto userDetailsDto) {
        if (userDetailsDto.getUsername() != null) {
            userDetailsMongo.setUsername(userDetailsDto.getUsername());
        }
        if (userDetailsDto.getPassword() != null) {
            userDetailsMongo.setPassword(encoder.encode(userDetailsDto.getPassword()));
        }
        if (userDetailsDto.getAuthorities() != null) {
            userDetailsMongo.setAuthorities(userDetailsDto.getAuthorities());
        }
        return userDetailsMongo;
    }

    @Override
    public UserDetailsDto updateFromEntity(UserDetailsDto userDetailsDto, UserDetailsMongo userDetailsMongo) {
        if (userDetailsMongo.getUsername() != null) {
            userDetailsDto.setUsername(userDetailsMongo.getUsername());
        }
        if (userDetailsMongo.getAuthorities() != null) {
            userDetailsDto.setAuthorities(userDetailsMongo.getAuthorities());
        }
        return userDetailsDto;
    }

}
