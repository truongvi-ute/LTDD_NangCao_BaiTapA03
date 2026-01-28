package com.mapic.backend.controllers;

import com.mapic.backend.dtos.*;
import com.mapic.backend.services.AuthService;
import jakarta.validation.Valid; // 1. Thêm import này
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired 
    private AuthService authService;

    // ĐĂNG KÝ VỚI OTP
    @PostMapping("/register")
    // 2. Thêm @Valid vào trước @RequestBody
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest req) {
        try {
            String result = authService.register(req);
            if (result.contains("thành công")) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi server: " + e.getMessage());
        }
    }
    
    // KÍCH HOẠT TÀI KHOẢN
    @PostMapping("/activate")
    public ResponseEntity<String> activateAccount(@Valid @RequestBody ActivateRequest req) {
        try {
            String result = authService.activateAccount(req);
            if (result.contains("thành công")) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi server: " + e.getMessage());
        }
    }
    
    // RESEND ACTIVATION OTP
    @PostMapping("/resend-activation")
    public ResponseEntity<String> resendActivationOtp(@Valid @RequestBody EmailRequest req) {
        try {
            String result = authService.resendActivationOtp(req);
            if (result.contains("gửi")) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi server: " + e.getMessage());
        }
    }

    // ĐĂNG NHẬP VỚI JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            LoginResponse response = authService.login(req);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    
    // FORGOT PASSWORD
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody EmailRequest req) {
        try {
            String result = authService.forgotPassword(req);
            if (result.contains("gửi")) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi server: " + e.getMessage());
        }
    }
    
    // RESET PASSWORD
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest req) {
        try {
            String result = authService.resetPassword(req);
            if (result.contains("thành công")) {
                return ResponseEntity.ok(result);
            }
            return ResponseEntity.badRequest().body(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi server: " + e.getMessage());
        }
    }
}