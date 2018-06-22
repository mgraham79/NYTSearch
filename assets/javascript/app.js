$(document).ready(function () {

    var NYTSearch = function () {

        this.start = init;

        function init() {
            console.log("ready");
            $('#submit').on("click", buildParam);
        }

        function buildParam(e) {
            e.preventDefault();
            var obj = {};
            obj['api-key'] = "1b7ba91a999e47e8b6f0faf9f992034f";
            if ($('#searchTerm').val()) obj.q = $("#searchTerm").val();
            if ($('#startYear').val()) obj.begin_date = searchYear($("#startYear").val());
            if ($('#endYear').val()) obj.end_date = searchYear($("#endYear").val());
            obj.page = 0;
            search(obj, $("#numberOfRecords").val());
        }

        function search(obj, limit) {
            // 
            console.log(limit);
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param(obj);
            console.log(url);
            $.ajax({
                url: url,
                method: 'GET',
            }).done(function (result) {
                console.log(result);
                // $.each(result.response.docs, buildArticle);
                for (var i = 0; i < parseInt(limit); i++) {
                    buildArticle(result.response.docs[i]);
                }
            }).fail(function (err) {
                throw err;
            });
        }

        function buildArticle(val) {
            var title = val.headline.main;
            var pubDate = (val.pub_date === undefined) ? " " : val.pub_date;
            var url = val.web_url;
            console.log(title, pubDate, url);
            $("#article-container").append(`<div class="card" style="width: 100%">
            <div class="card-body">
                <h5 class="card-title">`+ title + `</h5>
                <h6 class="card-title">`+ pubDate + `</h6>
                <a href="`+ url + `" class="card-link">` + url + `</a>
            </div>
        </div>`)
        }

        function searchYear(year) {
            year += "0101";
            return year;
        }
        //
        //
    }

    var myNYT = new NYTSearch();
    myNYT.start();

});