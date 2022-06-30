package com.stage.customerservice.config;

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
public class CustomerSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    CustomerRequestFilter customerRequestFilter;

    //Intercept requests and decide who can do what
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
                //Authorize requests for /authenticate from anybody
                .authorizeRequests()
                //Endpoint used only by the managers
                .antMatchers("/**/get/all/**").hasRole("MANAGER")
                //Endpoint used by both the manager and customer
                .antMatchers("/**/get/**").hasAnyRole("MANAGER", "CUSTOMER")
                .antMatchers("/**/create/**").permitAll()
                //Enpoints used only by customers
                .antMatchers("/**/update/**", "/**/delete/**")
                .hasRole("CUSTOMER")
                // all other requests need to be authenticated
                .anyRequest().authenticated()
                .and()
                //Doesn't create a session!!!
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //Adding the filter to the security
        httpSecurity.addFilterBefore(customerRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
