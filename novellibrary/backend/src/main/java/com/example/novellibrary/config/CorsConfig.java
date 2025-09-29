package com.example.novellibrary.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override //allows cross-origin requests from React frontend
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") //allows API endpoints
        .allowedOrigins("*") //react runs on 3000
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*"); //allow all headers
    }
}