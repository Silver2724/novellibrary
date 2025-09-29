package com.example.novellibrary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootApplication marks this as the main Spring Boot app
//enables component scanning, auto-cpnfiguration and configures Spring context
@SpringBootApplication
public class NovelLibraryApplication {

	public static void main(String[] args) {
		//starts embedded Tomcat server on port 8080
		SpringApplication.run(NovelLibraryApplication.class, args);
	}

}
