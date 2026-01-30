package com.energiflow.component;

import com.energiflow.model.User;
import com.energiflow.model.UserRole;
import com.energiflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@admin.com";

        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            log.info("Creating default admin user...");
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin000"));
            admin.setName("Default Admin");
            admin.setRole(UserRole.ADMIN);
            userRepository.save(admin);
            log.info("Default admin user created successfully.");
        } else {
            log.info("Admin user already exists.");
        }
    }
}
