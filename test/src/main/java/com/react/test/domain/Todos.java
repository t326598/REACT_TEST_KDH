package com.react.test.domain;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class Todos {
    
    private Long no;        // PK
    private String id;      // UK
    private String name;    // 할일
    private Boolean status; // 상태
    private Integer seq;        // 순서
    private Date createdAt; // 등록일자
    private Date updatedAt; // 수정일자

    private Todos(){
        this.id = UUID.randomUUID().toString();
    }
    
}
