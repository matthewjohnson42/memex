package com.matthewjohnson42.memex.dataservice.web.controller;

import com.matthewjohnson42.memex.dataservice.data.RunnableStatusList;
import com.matthewjohnson42.memex.dataservice.logic.service.ThreadService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/api/v0/threads")
public class ThreadController {

    private final ThreadService threadService;

    public ThreadController(ThreadService threadService) {
        this.threadService = threadService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public RunnableStatusList getRunnableStatusList() {
        return threadService.getRunnableStatusList();
    }
}
