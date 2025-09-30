package com.example.novellibrary.controller;

import com.example.novellibrary.dto.NovelDTO;
import com.example.novellibrary.model.Novel;
import com.example.novellibrary.model.User;
import com.example.novellibrary.service.NovelService;
import com.example.novellibrary.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.example.novellibrary.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/novels")
public class NovelController {
    private final NovelService service;
    private final UserService uService;
    private final RestTemplate rest = new RestTemplate();
    private final JwtUtil jwtUtil = new JwtUtil();

    @Value("${GOOGLE_BOOKS_API_KEY}")
    //API KEY: AIzaSyCPBPvQBNuSa9aLUSpQj4LSvhN_oS2-P4M
    private String googleAPIKey;

    //initialze service
    public NovelController(NovelService service, UserService uService) {
        this.service = service;
        this.uService = uService;
    }

    //get all the novels in the library
    @GetMapping("/library") 
    public ResponseEntity<?> getLibrary(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        Optional<User> user = uService.findByEmail(email);
        if(user.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        List<Novel> novels = service.listAll(user.get());
        return ResponseEntity.ok(novels);
    }

    //save a novel title to a library
    @PostMapping("/novels")
    public ResponseEntity<?> saveNovel(@RequestBody NovelDTO dto, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        Optional<User> user = uService.findByEmail(email);
        if(user.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        Novel n = new Novel(dto.getTitle(), dto.getAuthor(), dto.getDescription(), dto.getSourceURL(), user.get());
        service.save(n, user.get());
        return ResponseEntity.ok(n);
    }

    //delete a novel from your library
    @DeleteMapping("/novels/{id}")
    public ResponseEntity<Void> deleteNovel(@PathVariable Long id) {
        Optional<Novel> maybe = service.findById(id); //find novel by its id
        if(maybe.isEmpty()) return ResponseEntity.notFound().build(); //check whether novel title exists in your library
        service.delete(id); //delete the novel
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<Map<String, String>> search (@RequestParam("q") String q) {
        //when searching for a book, check if book title exists or whether it's empty or not
        if(q == null || q.trim().isEmpty()) return Collections.emptyList();
        q = q.trim();

        //if google API key is not blank
        if(!googleAPIKey.isBlank()) {
            String url = "https://www.googleapis.com/books/v1/volumes?q=" + q + "&maxResults=10&key=" + googleAPIKey;
            System.out.println("Using Google Books API Key: " + googleAPIKey);
            Map<?, ?> resp = rest.getForObject(url, Map.class);
            List<Map<String, String>> out = new ArrayList<>();

            if(resp != null && resp.containsKey("items")) {
                List<?> items = (List<?>) resp.get("items");
                for(Object itemObj : items) {
                    Map<?, ?> item = (Map<?, ?>) itemObj;
                    Map<String, String> info = new HashMap<>();
                    Map<?, ?> volInfo = (Map<?, ?>) item.get("volumeInfo");

                    //if the novel is no null
                    //then put the novel info into the map
                    if (volInfo != null) {
                        info.put("title", Objects.toString(volInfo.get("title"), ""));
                        info.put("author", volInfo.get("authors") != null ? volInfo.get("authors").toString() : "");
                        info.put("description", Objects.toString(volInfo.get("description"), ""));
    
                        // Try infoLink first, fallback to previewLink
                        String sourceURL = Objects.toString(volInfo.get("infoLink"), "");
                        if (sourceURL.isBlank()) {
                            sourceURL = Objects.toString(volInfo.get("previewLink"), "");
                        }
                        info.put("sourceURL", sourceURL);
                    }

                    out.add(info);
                }
            }
            return out;
        }

        //if there's no API jey, then return mock/fake results
        List<Map<String, String>> mock = new ArrayList<>();
        Map<String, String> m1 = new HashMap<>();
        m1.put("title", q + " - A Novel");
        m1.put("author", "Unknown Author");
        m1.put("description", "Mock Description for " + q);
        m1.put("sourceURL", "");
        mock.add(m1);
        return mock;
    }
}