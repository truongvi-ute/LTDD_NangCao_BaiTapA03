package com.mapic.backend.services;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {
    
    // Store: key = IP:endpoint, value = RequestInfo
    private final Map<String, RequestInfo> requestStore = new ConcurrentHashMap<>();
    
    // Configuration
    private static final int MAX_REQUESTS = 5;
    private static final int TIME_WINDOW_MINUTES = 1;
    
    /**
     * Check if request is allowed
     * @param clientIp Client IP address
     * @param endpoint Endpoint path
     * @return true if allowed, false if rate limited
     */
    public boolean isAllowed(String clientIp, String endpoint) {
        String key = clientIp + ":" + endpoint;
        LocalDateTime now = LocalDateTime.now();
        
        // Clean up old entries periodically
        cleanupOldEntries();
        
        RequestInfo info = requestStore.get(key);
        
        if (info == null) {
            // First request
            requestStore.put(key, new RequestInfo(now, 1));
            return true;
        }
        
        // Check if time window has passed
        LocalDateTime windowStart = now.minusMinutes(TIME_WINDOW_MINUTES);
        
        if (info.getFirstRequestTime().isBefore(windowStart)) {
            // Time window expired, reset counter
            requestStore.put(key, new RequestInfo(now, 1));
            return true;
        }
        
        // Within time window, check count
        if (info.getRequestCount() >= MAX_REQUESTS) {
            // Rate limit exceeded
            return false;
        }
        
        // Increment counter
        info.incrementCount();
        return true;
    }
    
    /**
     * Get remaining time until rate limit resets
     * @param clientIp Client IP address
     * @param endpoint Endpoint path
     * @return seconds until reset
     */
    public long getSecondsUntilReset(String clientIp, String endpoint) {
        String key = clientIp + ":" + endpoint;
        RequestInfo info = requestStore.get(key);
        
        if (info == null) {
            return 0;
        }
        
        LocalDateTime resetTime = info.getFirstRequestTime().plusMinutes(TIME_WINDOW_MINUTES);
        LocalDateTime now = LocalDateTime.now();
        
        if (now.isAfter(resetTime)) {
            return 0;
        }
        
        return java.time.Duration.between(now, resetTime).getSeconds();
    }
    
    /**
     * Clean up entries older than time window
     */
    private void cleanupOldEntries() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(TIME_WINDOW_MINUTES * 2);
        requestStore.entrySet().removeIf(entry -> 
            entry.getValue().getFirstRequestTime().isBefore(cutoff)
        );
    }
    
    /**
     * Inner class to store request information
     */
    private static class RequestInfo {
        private final LocalDateTime firstRequestTime;
        private int requestCount;
        
        public RequestInfo(LocalDateTime firstRequestTime, int requestCount) {
            this.firstRequestTime = firstRequestTime;
            this.requestCount = requestCount;
        }
        
        public LocalDateTime getFirstRequestTime() {
            return firstRequestTime;
        }
        
        public int getRequestCount() {
            return requestCount;
        }
        
        public void incrementCount() {
            this.requestCount++;
        }
    }
}
