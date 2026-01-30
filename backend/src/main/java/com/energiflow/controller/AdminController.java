package com.energiflow.controller;

import com.energiflow.dto.ActivityLogResponse;
import com.energiflow.dto.UserResponse;
import com.energiflow.service.ActivityService;
import com.energiflow.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AuthService authService;
    private final ActivityService activityService;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @GetMapping("/activities")
    public ResponseEntity<List<ActivityLogResponse>> getAllActivities() {
        return ResponseEntity.ok(activityService.getAllLogs());
    }
}
