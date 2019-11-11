package com.stackroute.gipherrecommendersystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.stackroute.gipherrecommendersystem.jwtfilter.JwtFilter;

@SpringBootApplication
@EnableDiscoveryClient
public class GipherRecommenderSystemApplication {
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/gipherrecommender/**")
				.allowedOrigins("*")
				.allowedMethods("GET", "POST", "DELETE" ,"OPTIONS")
				.allowedHeaders("*");
			}
		};
    }
	
	@Bean
	public FilterRegistrationBean jwtFilter() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(new JwtFilter());
		registrationBean.addUrlPatterns("/gipherrecommender/api/v1/*");
	       
	    return registrationBean;
	}

	public static void main(String[] args) {
		SpringApplication.run(GipherRecommenderSystemApplication.class, args);
	}

}

