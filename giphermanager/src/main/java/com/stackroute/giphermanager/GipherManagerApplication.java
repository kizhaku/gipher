package com.stackroute.giphermanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.stackroute.giphermanager.jwtfilter.JwtFilter;

@SpringBootApplication
@EnableDiscoveryClient
public class GipherManagerApplication {
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/giphermanager/**")
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
		registrationBean.addUrlPatterns("/giphermanager/api/v1/*");
	       
	    return registrationBean;
	}

	public static void main(String[] args) {
		SpringApplication.run(GipherManagerApplication.class, args);
	}

}

