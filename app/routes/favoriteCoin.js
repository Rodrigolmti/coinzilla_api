module.exports = function (app) {

    var apiAuthentication = app.api.authentication;
    var favoriteCoin = app.api.favoriteCoin;

    app.use(apiAuthentication.checkToken);

    app.route('/api/v2/favoriteCoin/add')
        .post(favoriteCoin.addFavoriteCoin);

    app.route('/api/v2/favoriteCoin/remove')
        .post(favoriteCoin.removeFavoriteCoin);

    app.route('/api/v2/favoriteCoin/list/:userId')
        .get(favoriteCoin.getFavoriteCoinList);
};