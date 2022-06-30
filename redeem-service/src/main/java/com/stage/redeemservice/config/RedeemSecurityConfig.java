package com.stage.redeemservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class RedeemSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    RedeemRequestFilter redeemRequestFilter;

    //Intercept requests and decide who can do what
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
                //Authorize requests for /authenticate from anybody
                .authorizeRequests()
                .antMatchers("/api/redeem/get/all/**").permitAll()
                .antMatchers("/**/api/redeem/perform/**").hasRole("CUSTOMER")
                // all other requests need to be authenticated
                .anyRequest().authenticated()
                .and()
                //Doesn't create a session!!!
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //Adding the filter to the security
        httpSecurity.addFilterBefore(redeemRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
