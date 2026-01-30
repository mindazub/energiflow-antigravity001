package com.energiflow.service;

import com.energiflow.dto.AuthResponse;
import com.energiflow.dto.LoginRequest;
import com.energiflow.dto.RegisterRequest;
import com.energiflow.dto.UserResponse;
import com.energiflow.model.User;
import com.energiflow.model.UserRole;
import com.energiflow.repository.UserRepository;
import com.energiflow.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final ActivityService activityService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        if (userRepository.count() == 0) {
            user.setRole(UserRole.ADMIN);
        } else {
            user.setRole(UserRole.USER);
        }

        user = userRepository.save(user);

        activityService.log(user, "REGISTER", "User registered with email: " + user.getEmail());

        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getName(), user.getRole().name());
        return new AuthResponse(token, "Registration successful", user.getRole().name(), user.getName());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            activityService.log(user, "LOGIN_FAILED", "Failed login attempt for email: " + request.getEmail());
            throw new RuntimeException("Invalid credentials");
        }

        activityService.log(user, "LOGIN", "User logged in: " + user.getEmail());

        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getName(), user.getRole().name());
        return new AuthResponse(token, "Login successful", user.getRole().name(), user.getName());
    }

    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole().name(),
                user.getCreatedAt());
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getName(),
                        user.getRole().name(),
                        user.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public void logout(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            activityService.log(user, "LOGOUT", "User logged out: " + email);
        });
    }
}
