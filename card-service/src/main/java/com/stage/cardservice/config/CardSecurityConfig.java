package com.stage.cardservice.config;

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
public class CardSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    CardRequestFilter cardRequestFilter;

    //Intercept requests and decide who can do what
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
                //Authorize requests for /authenticate from anybody
                .authorizeRequests()
                //Endpoint used by both manager and customer
                .antMatchers("/**/create/**",
                        "/**/delete/**",
                        "/**/redeemDetraction/**",
                        "/**/get/isEnoughPoints/**"
                        )
                .hasRole("CUSTOMER")
                //Enpoints used only by managers
                .antMatchers("/**/get/catalog_cards/**",
                        "/**/get/card_points/**",
                        "/**/get/numberOfSubcription/")
                .hasRole("MANAGER")
                .antMatchers("/**/update/**",
                        "/**/get/top/**",
                        "/**/get/date_points_info/**",
                        "/**/get/card_points_info/**")
                .permitAll()
                // all other requests need to be authenticated
                .anyRequest().authenticated()
                .and()
                //Doesn't create a session!!!
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        //Adding the filter to the security
        httpSecurity.addFilterBefore(cardRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
