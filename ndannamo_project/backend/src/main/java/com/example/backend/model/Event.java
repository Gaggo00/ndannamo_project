package com.example.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS) 
@Data
@NoArgsConstructor
@AllArgsConstructor
//@MappedSuperclass
public abstract class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public enum EventType {ACTIVITY, NIGHT, TRAVEL};
    private EventType type;

    @ManyToOne
    @JoinColumn(name="trip_id", nullable=false)
    private Trip trip;

    private String place;
    
    private LocalDate date;

//    @OneToMany(mappedBy = "relatedEvent", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<Attachments> attachments;


}
