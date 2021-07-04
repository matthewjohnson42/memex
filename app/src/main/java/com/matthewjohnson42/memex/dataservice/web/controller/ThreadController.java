package com.matthewjohnson42.memex.dataservice.web.controller;

import com.matthewjohnson42.memex.dataservice.data.dto.ThreadDto;
import com.matthewjohnson42.memex.dataservice.data.mongo.service.ThreadMongoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/api/v0/threads")
public class ThreadController {

    private final ThreadMongoService threadService;

    public ThreadController(ThreadMongoService threadService) {
        this.threadService = threadService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<ThreadDto> getRunningThreads() {
        return threadService.getRunningThreads();
    }

}
