package com.stackroute.giphermanager.config;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@Configuration
@EnableSwagger2
public class SwaggerConfig {
	
	private final ApiInfo apiInfo = new ApiInfoBuilder()
			.title("Account manager")
			.description("Giph service for bookmark. Produces MQ message.")
			.version("1.0")
			.license("Apache 2.0")
			.licenseUrl("https://www.apache.org/licenses/LICENSE-2.0")
			.contact(new Contact("Arun K", "", "akizhaku@in.ibm.com"))
			.build();
	
	private final Set<String> producesAndConsumes = new HashSet<String>(Arrays.asList("application/json"));

    
	@Bean
    public Docket productApi() {
		return new Docket(DocumentationType.SWAGGER_2)  
			.apiInfo(apiInfo)
			.produces(producesAndConsumes)
			.consumes(producesAndConsumes);
    }

	
}
