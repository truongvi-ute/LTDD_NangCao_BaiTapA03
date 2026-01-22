package com.mapic.backend.services;

import com.mapic.backend.dtos.LoginRequest;
import com.mapic.backend.dtos.RegisterRequest;
import com.mapic.backend.entities.User;
import com.mapic.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthService {
    @Autowired 
    private UserRepository userRepository;

    // ĐĂNG KÝ TRỰC TIẾP
    public String register(RegisterRequest req) {
        // 1. Kiểm tra email tồn tại
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return "Email đã tồn tại!";
        }

        // 2. Tạo và lưu User mới ngay lập tức
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // Lưu mật khẩu thuần
        user.setFullName(req.getFullName());
        user.setIsActive(true); // Mặc định kích hoạt luôn vì không dùng OTP
        
        userRepository.save(user);
        return "Đăng ký thành công!";
    }

    // ĐĂNG NHẬP ĐƠN GIẢN (Không JWT)
    public User login(LoginRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
        
        // Kiểm tra user có tồn tại và mật khẩu có khớp không
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(req.getPassword())) {
            return userOpt.get(); // Trả về thông tin User để App lưu vào bộ nhớ cục bộ
        }
        return null; // Sai thông tin
    }
}