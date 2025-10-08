package com.example.novellibrary.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.security.Key;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String SECRET_KEY;
    private Key key;
    private final long EXPIRATION = 24 * 60 * 60 * 1000; //1 day

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    // generate token
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION)) // 1 day
                .signWith(key)
                .compact();
    }

    // extract email
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // validate token
    public boolean validateToken(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return email.equals(userDetails.getUsername()) && !isExpired(token);
    }

    //check if token is expired
    private boolean isExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolve) {
        final Claims claims = extractAllClaims(token);
        return resolve.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }
}