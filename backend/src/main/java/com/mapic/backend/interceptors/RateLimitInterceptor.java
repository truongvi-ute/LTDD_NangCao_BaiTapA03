package com.mapic.backend.interceptors;

import com.mapic.backend.exceptions.RateLimitException;
import com.mapic.backend.services.RateLimitService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {
    
    @Autowired
    private RateLimitService rateLimitService;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String clientIp = getClientIp(request);
        String endpoint = request.getRequestURI();
        
        // Only apply rate limiting to auth endpoints
        if (!endpoint.startsWith("/api/auth/")) {
            return true;
        }
        
        // Check rate limit
        if (!rateLimitService.isAllowed(clientIp, endpoint)) {
            long retryAfter = rateLimitService.getSecondsUntilReset(clientIp, endpoint);
            throw new RateLimitException(
                "Bạn đã thực hiện quá nhiều yêu cầu. Vui lòng đợi " + retryAfter + " giây!",
                retryAfter
            );
        }
        
        return true;
    }
    
    /**
     * Get client IP address from request
     * Handles proxy headers (X-Forwarded-For, X-Real-IP)
     */
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        
        // If multiple IPs in X-Forwarded-For, take the first one
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        
        return ip;
    }
}
