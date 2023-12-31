"use strict";

class MediaFactory {
    constructor(data) {
        if('video' in data) {
            return new Video(data);
        } else if('image' in data) {
            return new Photo(data);
        }
        throw new Error('Invalid type of media');
    }
}