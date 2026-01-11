package com.matthewjohnson42.memex.service.data.mongo.entity;

import com.matthewjohnson42.memex.data.entity.Entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

/**
 * Mongo entity describing a user
 */
@Document(collection="userDetails")
public class UserDetailsMongo extends Entity<String> {

    @Id
    private String username;
    private String password;
    private Set<String> authorities;

    public UserDetailsMongo() { }

    public UserDetailsMongo(UserDetailsMongo userDetailsMongo) {
        super(userDetailsMongo);
        this.username = userDetailsMongo.getUsername();
        this.password = userDetailsMongo.getPassword();
        this.authorities = userDetailsMongo.getAuthorities();
    }

    @Override
    public String getId() {
        return username;
    }

    @Override
    public UserDetailsMongo setId(String username) {
        this.username = username;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserDetailsMongo setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserDetailsMongo setPassword(String password) {
        this.password = password;
        return this;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public UserDetailsMongo setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
        return this;
    }

}
