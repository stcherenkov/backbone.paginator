(function (collections, pagination, model) {
    collections.Tags = Backbone.Collection.extend({
        model : model,

        url: 'http://odata.netflix.com/v2/Catalog/Titles?&',

//decodeURIComponent($.param(pagination.queryMap))
/*
        url : 'http://odata.netflix.com/v2/Catalog/Titles?' +
            '$top=30&' +
            '$skip=0&' +
            '$orderby=ReleaseYear&' +
            '$inlinecount=allpages&' +
            '$filter=substringof%28%27Batman%27,%20Name%29%20eq%20true&' +
            '$format=json&' +
            '$callback=callback',*/


        sync : function (method, model, options) {


            var params = _.extend({
                type : 'GET',
                dataType : 'jsonp',
                jsonpCallback : 'callback',
                data: decodeURIComponent($.param(pagination.queryMap)),
                url : this.url,
                processData : false
            }, options);

            return $.ajax(params);
        },

        parse : function (response) {
            var tags = response.d.results;
            this.queryParams.totalPages = response.d.__count;
            return tags;
        }

    });

    _.extend(collections.Tags.prototype, pagination);
})(App.collections, App.mixins.Paginator, App.models.Tag);

