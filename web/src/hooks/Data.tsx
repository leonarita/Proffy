import React from 'react'

export interface Data {

    id: string,
    name: string,
    surname: string,
    email: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    
    subject: string,
    cost: string,

    class_schedule: [{
        weekday: string,
        from: string,
        to: string
    }]
}

export interface ScheduleItem {
    week_day: number,
    to: string,
    from: string
}