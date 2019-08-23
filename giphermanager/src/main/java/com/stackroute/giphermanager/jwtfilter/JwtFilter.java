package com.stackroute.giphermanager.jwtfilter;


import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import java.io.IOException;


public class JwtFilter extends GenericFilterBean {
	
	@Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    	HttpServletRequest httpReq = (HttpServletRequest) request;
		
		String authHeader = httpReq.getHeader("authorization");
		if(authHeader == null || !authHeader.startsWith("Bearer")) {
			throw new ServletException("Missing or Invalid Authorization Header");
		}
		String token = authHeader.substring(7);
		
		Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
		
		httpReq.setAttribute("claims", claims);
		chain.doFilter(request, response); 
    }
    
    
}
