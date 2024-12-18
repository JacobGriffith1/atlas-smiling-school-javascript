$(document).ready(function () {
    let searchValue = '';
    let topicValue = '';
    let sortValue = '';
    
    function fetchCourses() {
        $('#loader').show();

        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            method: 'GET',
            data: {
                q: searchValue,
                topic: topicValue,
                sort: sortValue
            },
            success: function (data) {
                const courses = data.courses;
                const topics = data.topics;
                const sorts = data.sorts;
                
                populateDropdowns(topics, sorts);

                const courseContainer = $('#course-cards');
                courseContainer.empty();

                courses.forEach((course) => {
                    const card = `
                        <div class="col-md-4">
                            <div class="card">
                                <img src="${course.thumb_url}" class="card-img-top" alt="${course.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${course.title}</h5>
                                    <p class="card-text">${course.sub-title}</p>
                                    <p class="card-text"><strong>${course.duration}</strong></p>
                                </div>
                            </div>
                        </div>
                    `;
                    courseContainer.append(card);
                });

                $('#loader').hide();
            },
            error: function () {
                console.log('Error fetching courses');
                $('#loader').hide();
            }
        });
    }

    function populateDropdowns(topics, sorts) {
        const topicDropdown = $('#topic');
        const sortDropdown = $('#sort');

        topicDropdown.empty();
        sortDropdown.empty();

        topicDropdown.append('<option value="">Select Topic</option>');
        sortDropdown.append('<option value="">Sort by</option>');

        topics.forEach(topic => {
            topicDropdown.append(`<option value="${topic.id}">${topic.name}</option>`);
        });

        sorts.forEach(sort => {
            sortDropdown.append(`<option value="${sort.value}">${sort.name}</option>`);
        });
    }

    $('#search').on('input', function () {
        searchValue = $(this).val();
        fetchCourses();
    });

    $('#topic').on('change', function () {
        topicValue = $(this).val();
        fetchCourses();
    });

    $('#sort').on('change', function () {
        sortValue = $(this).val();
        fetchCourses();
    });

    fetchCourses();
});
