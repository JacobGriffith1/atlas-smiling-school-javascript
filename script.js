function getQuote() {
    //loader();
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        method: 'GET',
        success: function(quotes) {
            const q = quotes;
            const carouselCont = $('#carouselExampleControls .carousel-inner');

            carouselCont.empty();

            q.forEach((quote, index) => {
                const isActive = index === 0 ? 'active' : '';
                const carouselItem = `
                    <div class="carousel-item ${isActive}">
                        <div class="row mx-auto align-items-center">
                            <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                                <img src="${quote.pic_url}" class="d-block align-self-center" alt="${quote.name}'s picture">
                            </div>
                            <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                                <div class="quote-text">
                                    <p class="text-white">${quote.text}"</p>
                                    <h4 class="text-white font-weight-bold">${quote.name}</h4>
                                    <span class="text-white">${quote.title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                carouselCont.append(carouselItem);
            });

            //loader();
        },
        error: function(error) {
            console.log('Error fetching quotes:', error);
            loader();
        }
    });
}

getQuote();