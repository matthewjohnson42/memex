package com.matthewjohnson42.memex.dataservice.web.controller;

import com.matthewjohnson42.memex.dataservice.logic.service.DataTransferService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v0/dataTransfer")
public class DataTransferController {

    private final DataTransferService dataTransferService;

    public DataTransferController(DataTransferService dataTransferService) {
        this.dataTransferService = dataTransferService;
    }

    @RequestMapping(method= RequestMethod.POST, path="/rawText/mongoToES")
    public void transferRawTextMongoToES() {
        dataTransferService.transferRawTextToES();
    }

    @RequestMapping(method = RequestMethod.POST, path="/rawText/mongoToDrive")
    public void transferRawTextMongoToGoogleDrive() {
        dataTransferService.transferRawTextToGoogleDrive();
    }

}
