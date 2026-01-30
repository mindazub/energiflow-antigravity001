package com.energiflow.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLogResponse {
    private Long id;
    private String action;
    private String details;
    private LocalDateTime timestamp;
    private String userName;
    private String userEmail;
}
