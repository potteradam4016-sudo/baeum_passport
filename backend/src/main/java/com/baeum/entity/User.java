package com.baeum.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String name;
    private Integer grade;

    @Column(name = "class_num")
    private Integer classNum;

    @Column(name = "student_num")
    private Integer studentNum;

    private String gender;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "created_at", insertable = false, updatable = false)
    private String createdAt;

    public User(
            String username,
            String password,
            String name,
            Integer grade,
            Integer classNum,
            Integer studentNum,
            String gender,
            String birthDate) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.grade = grade;
        this.classNum = classNum;
        this.studentNum = studentNum;
        this.gender = gender;
        this.birthDate = birthDate;
    }
}
