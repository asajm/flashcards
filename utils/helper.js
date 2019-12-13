import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
const NOTIFICATION_KEY = 'Flashcards:notifications'


export function getDeckInfo(title) {
    return {
        title: title,
        questions: []
    }
}


export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'quiz time!',
        body: "👋 don't forget to conduct your quiz for today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        console.log(status)
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let notificationDate = new Date()
                            notificationDate.setDate(notificationDate.getDate() + 1)
                            notificationDate.setHours(20)
                            notificationDate.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: notificationDate,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
