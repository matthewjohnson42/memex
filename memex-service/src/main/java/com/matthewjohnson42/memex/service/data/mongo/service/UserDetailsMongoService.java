package com.matthewjohnson42.memex.service.data.mongo.service;

import com.matthewjohnson42.memex.data.service.DataService;
import com.matthewjohnson42.memex.service.data.converter.UserDetailsMongoConverter;
import com.matthewjohnson42.memex.service.data.mongo.repository.UserDetailsMongoRepo;
import com.matthewjohnson42.memex.service.data.dto.UserDetailsDto;
import com.matthewjohnson42.memex.service.data.mongo.entity.UserDetailsMongo;
import org.springframework.stereotype.Service;

/**
 * Data Service for implementing user details persistence logic
 */
@Service
public class UserDetailsMongoService extends DataService<String, UserDetailsDto, UserDetailsMongo> {

    public UserDetailsMongoService(UserDetailsMongoConverter converter, UserDetailsMongoRepo userDetailsMongoRepo) {
        super(converter, userDetailsMongoRepo);
    }

    public String getEncodedPasswordForUser(String username) {
        UserDetailsMongo userDetailsMongo = getIfExists(username);
        return userDetailsMongo.getPassword();
    }

}
