package com.matthewjohnson42.memex.service.web.controller;

import com.matthewjohnson42.memex.service.data.dto.UserDetailsDto;
import com.matthewjohnson42.memex.service.data.mongo.service.UserDetailsMongoService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Web server HTTP request controller for the user data type.
 */
@RestController
@RequestMapping("/api/v0/user")
public class UserController {

    private UserDetailsMongoService userDetailsMongoService;

    public UserController(UserDetailsMongoService userDetailsMongoService) {
        this.userDetailsMongoService = userDetailsMongoService;
    }

    @RequestMapping(method=RequestMethod.POST)
    public void create(@RequestBody UserDetailsDto userDetailsDto) {
        userDetailsMongoService.create(userDetailsDto);
    }
}
