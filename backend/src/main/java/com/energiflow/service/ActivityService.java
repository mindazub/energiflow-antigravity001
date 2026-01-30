package com.energiflow.service;

import com.energiflow.dto.ActivityLogResponse;
import com.energiflow.model.ActivityLog;
import com.energiflow.model.User;
import com.energiflow.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityLogRepository repository;

    public void log(User user, String action, String details) {
        ActivityLog log = ActivityLog.builder()
                .user(user)
                .action(action)
                .details(details)
                .build();
        repository.save(log);
    }

    public List<ActivityLogResponse> getAllLogs() {
        return repository.findAllByOrderByTimestampDesc().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<ActivityLogResponse> getUserLogs(Long userId) {
        return repository.findByUserIdOrderByTimestampDesc(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private ActivityLogResponse convertToResponse(ActivityLog log) {
        return ActivityLogResponse.builder()
                .id(log.getId())
                .action(log.getAction())
                .details(log.getDetails()) // Fixing access to details
                .timestamp(log.getTimestamp())
                .userName(log.getUser() != null ? log.getUser().getName() : "System")
                .userEmail(log.getUser() != null ? log.getUser().getEmail() : null)
                .build();
    }
}
