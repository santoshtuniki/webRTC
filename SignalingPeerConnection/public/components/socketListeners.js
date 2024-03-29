
socket.on("availableOffers", (offers) => {
    createOfferEls(offers);
})

socket.on("newOfferAwaiting", (offers) => {
    createOfferEls(offers);
})

socket.on('answerResponse', (offerObj) => {
    addAnswer(offerObj);
})

socket.on('receivedIceCandidateFromServer', (iceCandidate) => {
    addNewIceCandidate(iceCandidate);
    console.log('iceCandidate:\n', iceCandidate);
})

const createOfferEls = (offers) => {
    // Make green answer button for this new answer
    const answerEl = document.querySelector("#answer");
    offers.forEach((offer) => {
        const newAnswerEl = document.createElement("div");
        newAnswerEl.innerHTML = `<button class="btn btn-success col-1">Answer ${offer.offerUserName}</button>`;
        newAnswerEl.addEventListener("click", () => answerOffer(offer))
        answerEl.appendChild(newAnswerEl);
    })
};
