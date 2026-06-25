package com.baeum;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.StreamUtils;

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

    private String readSchemaSql() throws IOException {
        ClassPathResource schemaResource = new ClassPathResource("schema.sql");
        return StreamUtils.copyToString(schemaResource.getInputStream(), StandardCharsets.UTF_8);
    }
}
