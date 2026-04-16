package com.example.frontoffice.controller;

import com.example.framework.annotations.Controller;
import com.example.framework.annotations.GetMapping;

@Controller
public class TestController {
    
    @GetMapping("/test")
    public String test() {
        return "Frontoffice deploye";
    }
}
