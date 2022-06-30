package com.stage.catalogservice.config;

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
public class CatalogSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    CatalogRequestFilter catalogRequestFilter;

    //Intercept requests and decide who can do what
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
                .authorizeRequests()
                .antMatchers(
                        //Create catalog
                        "/api/catalog/type/create/**",
                        //Delete a catalog
                        "/api/catalog/type/delete/**",
                        //Update the description of a catalog
                        "/api/catalog/type/update/**"
                ).hasRole("MANAGER")
                //Allow the get catalogs to everybody
                .antMatchers("/api/catalog/type/get/**").permitAll()
                //REWARD roles
                .antMatchers(
                        //Create a reward
                        "/api/catalog/reward/create/**",
                        //Update methods for reward
                        "/api/catalog/reward/update/**"
                ).hasRole("MANAGER")
                .antMatchers(
                        "/api/catalog/reward/redeemed/**"
                )
                .hasRole("CUSTOMER")
                .antMatchers("/api/catalog/reward/get/**").permitAll()
                // all other requests need to be authenticated
                .anyRequest().authenticated()
                .and()
                //Doesn't create a session!!!
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //Adding the filter to the security
        httpSecurity.addFilterBefore(catalogRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
