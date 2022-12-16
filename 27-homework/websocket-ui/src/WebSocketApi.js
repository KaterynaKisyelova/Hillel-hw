export default class WebSocketApi {
  constructor(url, options) {
    this.options = options;
    this.ws = new WebSocket(url);
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.onError.bind(this);
  }

  send(message) {
    this.ws.send(JSON.stringify(message));
  }

  onOpen() {
    console.log("Connection with server was established");

    this.ws.send(
      JSON.stringify({ name: "server", message: "New client connected" })
    );
  }

  onMessage(e) {
    this.options.onMessage(JSON.parse(e.data));
  }

  onError(err) {
    console.log(err);
  }
}
