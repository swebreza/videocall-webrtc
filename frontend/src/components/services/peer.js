class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:global.stun.twilio.com:3478',
            ],
          },
        ],
      })
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer)
      const ans = await this.peer.createAnswer()
      await this.peer.setLocalDescription(new RTCSessionDescription(ans))
      return ans
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      try {
        await this.peer.setRemoteDescription(ans)
        console.log('Remote description set successfully')
      } catch (error) {
        console.log('Failed to set remote description', error)
      }
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer()
      await this.peer.setLocalDescription(new RTCSessionDescription(offer))
      return offer
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PeerService()
