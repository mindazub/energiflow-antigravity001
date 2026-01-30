package com.energiflow.controller;

import com.energiflow.repository.UserRepository;
import com.energiflow.service.ActivityService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;
    private final UserRepository userRepository;

    @PostMapping("/log")
    public ResponseEntity<Void> logActivity(@RequestBody ActivityRequest request, Authentication authentication) {
        if (authentication != null) {
            userRepository.findByEmail(authentication.getName()).ifPresent(user -> {
                activityService.log(user, request.getAction(), request.getDetails());
            });
        }
        return ResponseEntity.ok().build();
    }

    @Data
    public static class ActivityRequest {
        private String action;
        private String details;
    }
}
