package com.medisaas.infrastructure.adapter.out.messaging;

import com.medisaas.domain.model.AppointmentCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AppointmentEventPublisher {

    private final RabbitTemplate rabbitTemplate;
    
    // Asumiremos un exchange directo o topic. Esto puede parametrizarse en application.yml
    private static final String EXCHANGE = "medisaas.appointments.exchange";
    private static final String ROUTING_KEY = "appointment.created";

    public void publishAppointmentCreated(AppointmentCreatedEvent event) {
        log.info("Publicando evento de cita creada: {}", event.appointmentId());
        rabbitTemplate.convertAndSend(EXCHANGE, ROUTING_KEY, event);
    }
}
