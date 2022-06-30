package com.stage.apigateway.config;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;

@Component
public class CheckJwtFilter extends AbstractGatewayFilterFactory<CheckJwtFilter.Config> {

    public CheckJwtFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            //Check if there is the field for registration
            if (exchange.getRequest().getHeaders().containsKey("Registration")) {
                // Pre-processing
                System.out.println("Pre-filter");
                System.out.println("L'utente si sta registrando...");
                return chain.filter(exchange)
                        .then(Mono.fromRunnable(() -> {
                            // Post-processing
                            System.out.println("Post-filter: Registrazione in corso...");
                        }));
            }else{//The user wants to perform other things
                // Pre-processing
                System.out.println("Pre-filter");
                //check if request contains Authorization header
                if (exchange.getRequest().getHeaders().containsKey("Authorization")) {
                    String jwt = exchange.getRequest().getHeaders().get("Authorization").get(0);
                    System.out.println("Token preso: " + jwt.substring(7));
                    return WebClient.create().get()
                            .uri("http://gateway-service:8080/api/auth/checkToken/{jwt}", jwt.substring(7))
                            .retrieve().bodyToMono(String.class).flatMap(result -> {
                                System.out.println("Riposta: " + result);
                                if (!result.equals(null)) {
                                    //Splitting the result into username, password and role
                                    String[] args = result.split(" ");
                                    //Adding to the header request the username, password and role
                                    ServerHttpRequest request = exchange.getRequest().mutate()
                                            .header("username", args[0])
                                            .header("password", args[1])
                                            .header("role", args[2])
                                            .build();
                                    System.out.println("Customizing the header...");
                                    //Chain with the customized header
                                    return chain.filter(exchange.mutate().request(request).build());
                                } else {
                                    return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                                        // Post-processing
                                        System.out.println("Post-filter: Success!");
                                    }));
                                }
                            });
                } else {
                    System.out.println("Authorization header missing...");
                    exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                    return chain.filter(exchange)
                            .then(Mono.fromRunnable(() -> {
                                // Post-processing
                                System.out.println("Post-filter: Authorization missing!");
                            }));
                }
            }
        });
    }
    public static class Config {
    }
}
