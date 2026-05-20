if (!window.matchMedia) {
    window.matchMedia = () => ({
        matches: false,
        addEventListener: () => { },
        removeEventListener: () => { },
        addListener: () => { },
        removeListener: () => { },
        dispatchEvent: () => false,
    });
}

class MockAudio {
    constructor() {
        this.src = '';
        this.volume = 1;
        this.currentTime = 0;
        this.duration = 100;
        this.events = {};
    }

    addEventListener(event, callback) {
        this.events[event] = callback;
    }

    removeEventListener(event) {
        delete this.events[event];
    }

    load() {
        if (this.events.loadedmetadata) {
            this.events.loadedmetadata();
        }
    }

    play() {
        return Promise.resolve();
    }

    pause() {
        return undefined;
    }
}

window.Audio = window.Audio || MockAudio;
