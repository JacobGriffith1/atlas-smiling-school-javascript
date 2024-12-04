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

function getTutorial() {
    //loader();

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/popular-tutorials',
        method: 'GET',
        success: function(tutorials) {
            const carouselHand = $('#hand');
            carouselHand.empty();

            tutorials.forEach((tutorial, index) => {
                const isActive = index === 0 ? 'active' : '';
                const stars = createStars(tutorial.star);
                const carouselItem = `
                    <div class="carousel-item ${isActive}">
                    <div class="row align-items-center mx-auto">
                      <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                        <div class="card">
                          <img src="${tutorial.thumb_url}" class="card-img-top" alt="Video thumbnail"/>
                          <div class="card-img-overlay text-center">
                            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay"/>
                          </div>
                          <div class="card-body">
                            <h5 class="card-title font-weight-bold">${tutorial.title}</h5>
                            <p class="card-text text-muted">${tutorial['sub-title']}</p>
                            <div class="creator d-flex align-items-center">
                              <img src="${tutorial.author_pic_url}" alt="Creator" width="30px" class="rounded-circle"/>
                              <h6 class="pl-3 m-0 main-color">${tutorial.author}</h6>
                            </div>
                            <div class="info pt-3 d-flex justify-content-between">
                              <div class="rating">${stars}</div>
                              <span class="main-color">${tutorial.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                carouselHand.append(carouselItem);
            });
        },
        error: function(error) {
            console.error('Error fetching tutorials:', error);
        }
    });
}

function createStars(rating) {
    let stars = ''
    for (let i = 0; 0 < 5; i++) {
        if (i < rating) {
            stars += '<img src="images/star_on.png" alt="star on" width="15px"/>';
        } else {
            stars += '<img src="images/star_off.png" alt="star off" width="15px"/>';
        }
    }
    return stars;
}