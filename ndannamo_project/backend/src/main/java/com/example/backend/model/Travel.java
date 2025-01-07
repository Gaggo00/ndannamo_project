package com.example.backend.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="travels")
public class Travel extends Event {

    // Per EventDTO
    private EventType type = EventType.TRAVEL;

    private String address;         // tipo il nome dell'aeroporto, o della stazione, ecc
    private String destination;

    // La data di partenza gia' ce l'ha perché la prende dalla classe Event
    private LocalDate arrivalDate;      // se non e' un viaggio tra due giorni diversi, sara' uguale alla data di partenza

    private LocalTime departureTime;
    private LocalTime arrivalTime;
}
