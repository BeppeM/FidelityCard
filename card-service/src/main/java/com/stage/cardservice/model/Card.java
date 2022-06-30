package com.stage.cardservice.model;

import net.bytebuddy.dynamic.loading.InjectionClassLoader;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "Card")
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "subscriptiondate")
    private LocalDate subscriptionDate;
    @Column(name = "expirationdate")
    private LocalDate expirationDate;
    @Column(name = "currentpoints")
    private int currentPoints;
    @Column(name = "customerusername")
    private String customerUsername;
    @Column(name = "manager")
    private String manager;
    @Column(name = "catalogname")
    private String catalogName;
    @Column(name = "earnedpoints")
    private int earnedPoints;

    public Card() {
    }

    public Card(Long id, LocalDate subscriptionDate, LocalDate expirationDate, int currentPoints, String customerUsername,
                String manager, String catalogName, int earnedPoints) {
        this.id = id;
        this.subscriptionDate = subscriptionDate;
        this.expirationDate = expirationDate;
        this.currentPoints = currentPoints;
        this.customerUsername = customerUsername;
        this.manager = manager;
        this.catalogName = catalogName;
        this.earnedPoints = earnedPoints;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getSubscriptionDate() {
        return subscriptionDate;
    }

    public void setSubscriptionDate(LocalDate subscriptionDate) {
        this.subscriptionDate = subscriptionDate;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public int getCurrentPoints() {
        return currentPoints;
    }

    public void setCurrentPoints(int currentPoints) {
        this.currentPoints = currentPoints;
    }

    public String getCustomerUsername() {
        return customerUsername;
    }

    public void setCustomerUsername(String customerUsername) {
        this.customerUsername = customerUsername;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public String getCatalogName() {
        return catalogName;
    }

    public void setCatalogName(String catalogName) {
        this.catalogName = catalogName;
    }

    public int getEarnedPoints() {
        return earnedPoints;
    }

    public void setEarnedPoints(int earnedPoints) {
        this.earnedPoints = earnedPoints;
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", subscriptionDate=" + subscriptionDate +
                ", expirationDate=" + expirationDate +
                ", currentPoints=" + currentPoints +
                ", customerUsername='" + customerUsername + '\'' +
                ", manager='" + manager + '\'' +
                ", catalogName='" + catalogName + '\'' +
                ", earnedPoints=" + earnedPoints +
                '}';
    }
}

