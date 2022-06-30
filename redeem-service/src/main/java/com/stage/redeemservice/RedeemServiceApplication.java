package com.stage.redeemservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableEurekaClient
@SpringBootApplication
@EnableFeignClients(basePackages = "com.stage.redeemservice.service")
public class RedeemServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(RedeemServiceApplication.class, args);
    }
}
