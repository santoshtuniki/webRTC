### Create a local https server

###### mkcert --> Create self signed tls certificates without OpenSSL.

1.  npm i mkcert

2.  mkcert create-ca

        Create a Certificate Authority
    
3.  mkcert create-cert

        Create a Certificate Authority

4.  Read keys & certificate from files:

        const fs = require("fs");

        const key = fs.readFileSync("create-cert-key.pem");
       
        const cert = fs.readFileSync("create-cert.pem");

5.  Run server with certificate:

        const expressServer = createServer({ key, cert }, app);

        expressServer.listen(3000)

6.  Execute the port:

        https://localhost:3000/index.html

- - - -

- - - -


### TaskList

1.  Someone must getUserMedia() - CLIENT1

2.  CLIENT1 creates peerConnection (pc)

3.  peerConnection needs STUN servers

    -   we will need ICE candidates later

4.  CLIENT1 adds localstream tracks to peerConnection

    -   we need to assosciate CLIENT1 feed with peerConnection

5.  CLIENT1 creates an offer (createOffer())

    -   needed peerConnection with tracks

    -   offer = RTCSessionDescription

        1.  SDP

        2.  Type (offer) 

6.  CLIENT1 hands the offer to pc.setLocalDescription

7.  ICE Candidates can now start coming in (ASYNC)


SIGNALING

8.  CLIENT1 emits offer

    -   socket.io server holds it(offer) for the other browser

    -   assosciate with CLIENT1


9.  Once "Step 7" happends, send the ICE Candidates to the SIGNALING server 

    -   socket.io server holds it(ICE Candidates) for the other browser

    -   assosciate with CLIENT1


CLIENT1 & SIGNALING server wait.

    - They wait for the CLIENT2

- - - -

10. CLIENT2 loads up the webpage with "io"

    -   a new client is connected to the SIGNALING server

11. socket.io emits the RTCSessionDescription to the new client

    -   an offer to be sent!


12. CLIENT2 runs getUserMedia()

13.  CLIENT2 creates a peerConnection

    -   pass the STUN servers

14. CLIENT2 adds the localstream tracks to peerConnection

15. CLIENT2 creates an answer (createAnswer())

    -   answer = RTCSessionDescription 

        1.  SDP

        2.  Type (answer)

16.  CLIENT2 hands the answer to pc.setLocalDescription

17. Because CLIENT2 has an offer, CLIEN2 can hand the offer to the pc.setRemoteDescription

18. when setLocalDescription, start collecting ICE Candidates (ASYNC)


SIGNALING server has been waiting...

19. CLIENT2 emits answer upto the SIGNALING server

20. CLIENT2 will listen for the tracks/ICE from remote

    -   & is done.

    -   waiting on ICE Candidates

    -   waiting on tracks

- - - -

21. SIGNALING server sends CLIENT1 the answer.

22. CLIENT1 takes the answer & hands it to the pc.setRemoteDescription.

    CANDIDATE | localDesc | remoteDesc      |
    ------- | ---------------- | ---------- |
    CLIENT1  | offer | answer |
    CLIENT2  | answer        | offer       |


23. 