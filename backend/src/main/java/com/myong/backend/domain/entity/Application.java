package com.myong.backend.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Application {
    @Id
    @Column(name ="ap_id")
    private String id;

    @Column(nullable = false, name = "ap_wantday")
    private String wantday;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "d_key")
//    Designer designer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jp_id")
    JobPost jobPost;
}
