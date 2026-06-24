package com.baeum.passport;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.StreamUtils;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BaeumPassportApplication {

    public static void main(String[] args) {
        SpringApplication.run(BaeumPassportApplication.class, args);
    }

    @Bean
    ApplicationRunner initializeDatabase(JdbcTemplate jdbcTemplate) {
        return args -> {
            String schema = readSchemaSql();
            for (String statement : schema.split(";")) {
                String sql = statement.trim();
                if (!sql.isEmpty()) {
                    jdbcTemplate.execute(sql);
                }
            }
        };
    }

    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
    }

    private String readSchemaSql() throws IOException {
        ClassPathResource schemaResource = new ClassPathResource("schema.sql");
        return StreamUtils.copyToString(schemaResource.getInputStream(), StandardCharsets.UTF_8);
    }
}
