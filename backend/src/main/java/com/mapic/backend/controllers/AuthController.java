package com.mapic.backend.controllers;

import com.mapic.backend.dtos.LoginRequest;
import com.mapic.backend.dtos.RegisterRequest;
import com.mapic.backend.entities.User;
import com.mapic.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired 
    private AuthService authService;

    // Endpoint Đăng ký: POST http://localhost:8080/api/auth/register
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest req) {
        String res = authService.register(req);
        if (res.equals("Đăng ký thành công!")) {
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.badRequest().body(res);
    }

    // Endpoint Đăng nhập: POST http://localhost:8080/api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        User user = authService.login(req);
        if (user != null) {
            return ResponseEntity.ok(user); // Trả về JSON chứa toàn bộ info User
        }
        return ResponseEntity.status(401).body("Sai email hoặc mật khẩu");
    }
}