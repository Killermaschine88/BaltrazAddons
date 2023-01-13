/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

const Essential = Java.type("gg.essential.api.EssentialAPI");

export const essentialsNotification = (title, message, duration) => {
    Essential.getNotifications().push(title, message, duration);
};
