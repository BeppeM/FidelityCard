package com.stage.statisticservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableEurekaClient
@EnableFeignClients(basePackages = "com.stage.statisticservice.service")
@SpringBootApplication
public class StatisticServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(StatisticServiceApplication.class, args);
    }
}
