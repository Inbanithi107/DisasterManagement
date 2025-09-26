package com.Techforge.DisasterManagement.Controller;

import com.Techforge.DisasterManagement.DTO.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RequestController {

    @Autowired
    private SimpMessagingTemplate template;

    @PostMapping("/senddata1")
    public void sendData(@RequestBody Request data){
        System.out.println("data recied");
        template.convertAndSend("/topic/esp1", data);
    }

    @PostMapping("/senddata2")
    public void senddata(@RequestBody Request data){
        template.convertAndSend("/topic/esp2", data);
    }

}
