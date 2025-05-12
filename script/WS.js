class WebSocketWrapper {
    constructor({
        maxReconnectAttempts = 5,
        reconnectDelay = 1000,
        maxReconnectDelay = 30000
    } = {}) {
        this.socket = null;
        this.url = null;
        this.callbacks = {};
        this.pendingCallbacks = {};
        this.connectedCallbacks = [];
        this.disconnectedCallbacks = [];

        // Reconnection logic
        this.shouldReconnect = true;
        this.reconnectDelay = reconnectDelay;
        this.maxReconnectDelay = maxReconnectDelay;
        this.baseReconnectDelay = reconnectDelay;
        this.maxReconnectAttempts = maxReconnectAttempts;
        this.currentReconnectAttempts = 0;
    }

    connect(url) {
        this.url = url;
        this._connectSocket();
    }

    _connectSocket() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            this.currentReconnectAttempts = 0;
            this.reconnectDelay = this.baseReconnectDelay;
            this.connectedCallbacks.forEach(cb => cb());
        };

        this.socket.onclose = () => {
            this.disconnectedCallbacks.forEach(cb => cb());

            if (this.shouldReconnect && this.currentReconnectAttempts < this.maxReconnectAttempts) {
                this.currentReconnectAttempts++;
                setTimeout(() => {
                    this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay);
                    this._connectSocket();
                }, this.reconnectDelay);
            }
        };

        this.socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                const { destination, payload, packetID } = message;

                if (packetID && this.pendingCallbacks[packetID]) {
                    this.pendingCallbacks[packetID](payload);
                    delete this.pendingCallbacks[packetID];
                } else if (destination && this.callbacks[destination]) {
                    this.callbacks[destination](payload, packetID);
                }
            } catch (err) {
                console.error("Invalid message received:", event.data, err);
            }
        };
    }

    disconnect() {
        this.shouldReconnect = false;
        if (this.socket) {
            this.socket.close();
        }
    }

    retryConnect() {
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
            this.shouldReconnect = true;
            this.currentReconnectAttempts = 0;
            this.reconnectDelay = this.baseReconnectDelay;
            this._connectSocket();
        }
    }

    onConnected(callback) {
        this.connectedCallbacks.push(callback);
    }

    onDisconnect(callback) {
        this.disconnectedCallbacks.push(callback);
    }

    registerCallback(destination, callback) {
        this.callbacks[destination] = callback;
    }

    registerCallbacks(destinations, callback) {
        if(Array.isArray(destinations)) {
            destinations.forEach(destination => {
                this.callbacks[destination] = callback;
            });
            return;
        }else {
            this.callbacks[destinations] = callback;
        }
    }

    sendPacket(destination, payload = {}) {
        if (this.socket.readyState === WebSocket.OPEN) {
            const packet = { destination, payload };
            this.socket.send(JSON.stringify(packet));
            return true;
        }else {
            return false;
        }
    }

    sendCallbackPacket(destination, callback, payload = {}) {
        const packetID = this._generatePacketID();
        this.pendingCallbacks[packetID] = callback;

        const packet = {
            destination,
            payload,
            packetID
        };

        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(packet));
        }
    }

    _generatePacketID() {
        return Math.random().toString(36).substr(2, 9) + Date.now();
    }
}
