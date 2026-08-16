var productionbasedress = [];
var typetext = 'Headquarters';
var areaid
$(function () {

    if ($("header").length > 0) {
        $("header").load("./header.html");
    }
    if ($("footer").length > 0) {
        $("footer").load("./footer.html");
    }
    if ($(".pop-up").length > 0) {
        $(".pop-up").load("./pop.html");
    };
    navTimer(".nav-li5");
    $("body").on("click", '.classification-item', function () {
        for (var i = 0; i < $(this).siblings(".active").length; i++) {
            $($(this).siblings(".active")[i]).removeClass("active")
        }

        $(this).addClass('active')
    });
    $(".map_tipsbox_close").click(function () {
        $(".map_tips").hide();
    });

    $("body").on("click", '.classification-row2 .classification-item', function () {
        var id = $(this).children("span").attr("data-id");
        areaid = id;
        strongholdsearch()
    })

    $("body").on("click", '.classification-row1 .classification-item', function () {
        var text = $(this).children("span").text();
        typetext = text;
        strongholdsearch()
    })



    $("body").on("click", '.site-item', function () {
        if ($(window).width() < 1024) {
            $(this).toggleClass('active');
        } else {
            for (var i = 0; i < $(this).siblings(".active").length; i++) {
                $($(this).siblings(".active")[i]).removeClass("active")
            }
            $(this).addClass('active');
            var index = $(this).index();
            $(".site-contain .site-message-box .site-message").eq(index).show().siblings().hide();
        }
    })

    $("body").on("click", '.area-item', function () {
        if ($(window).width() < 1024) {
            $(this).toggleClass('active');
        } else {
            for (var i = 0; i < $(this).siblings(".active").length; i++) {
                $($(this).siblings(".active")[i]).removeClass("active")
            }

            $(this).addClass('active');
            var index = $(this).index();
            $(".area-message-box .area-message").eq(index).show().siblings().hide();
        }
    })

    $("body").on("click", '.fae-item-m', function () {
        $(this).toggleClass('active');
    })



    $(".map-contain").animate({ scrollLeft: ($(".map-contain").width()) / 3 });


    productionbase();
    fae();
    strongholdareatype();
    areaid = $(".classification-row2 .items .classification-item.active").children("span").attr("data-id");
    strongholdsearch();
    region();
});



/**
 *生产基地
 *
 * @param {*} swiper
 */
function productionbase() {
    var productionbasedata = senAjax1("productionbase", "get", { lang: "en" });
    if ($(window).width() < 1024) {
        var html = '';
        $(".site-contain-m").empty()
        $.each(productionbasedata, function (i, n) {
            html += `<div class="site-item"><div class="site-title"><span>${n.area}</span><div class="arrow"></div></div>` +
                `<div class="site-message"><span class="message-title">${n.company}</span><div class="line"></div>` +
                `<div class="row"><img class="row-icon" src="../images/contact/foothold-icon-local.png"><div class="row-message"><span>${n.address}</span></div></div>` +
                `<div class="row"><img class="row-icon" src="../images/contact/foothold-icon-phone.png"><div class="row-message"><span>${n.phone}</span></div></div>` +
                `<div class="row"><img class="row-icon" src="../images/contact/site-fax.png"><div class="row-message"><span>${n.tel}</span></div></div>` +
                `<div class="row"><img class="row-icon" src="../images/contact/fae-email.png"><div class="row-message"><span>${n.email}</span></div></div>` +
                `<div class="row" style = "display:${n.name == '' ? "none" : "flex"}"><img class="row-icon" src="../images/contact/fae-email.png"><div class="row-message"><span>${n.name}</span></div></div>` +
                `<div class="row" style = "display:${n.fax == '' ? "none" : "flex"}"><img class="row-icon" src="../images/contact/fae-email.png"><div class="row-message"><span>${n.fax}</span></div></div>` +
                `<div class="row" style = "display:${n.map == '' ? "none" : "flex"}"><img class="row-icon" src="../images/contact/map_icon.png"><div class="row-message" onclick = "mapTps(this)" data-imgurl="${n.mapurl}"><span>Map</span></div></div></div></div></div></div>`;
        });
        $(".site-contain-m").append(html);
        // 清除空白数据
        let doubleJudgment = 0
        for (let i = 0; i < $('.site-contain-m .row-message').length; i++) {
            for (let v = 0; v < $('.site-contain-m .row-message').eq(i).find('span').length; v++) {
                if (!$('.site-contain-m .row-message').eq(i).find('span').eq(v).html()) {
                    doubleJudgment++
                    if (doubleJudgment >= $('.site-contain-m .row-message').eq(i).find('span').length) {
                        $('.site-contain-m .row').eq(i).remove()
                        doubleJudgment = 0
                    }
                } else {
                    doubleJudgment = 0
                }
            }
        }
    } else {
        var html = '';
        var htmlbox = '';
        $(".site-contain .site-list").empty();
        $(".site-contain .site-message-box").empty();
        $.each(productionbasedata, function (i, n) {
            html += '<div class ="site-item"><span>' + n.area + '</span></div>';
            htmlbox += '<div class="site-message"><div class="site-title"><span>' + n.company + '</span></div>' +
                '<div class="site-content"><div class="row">' +
                '<div class="row-item"><img src="../images/contact/foothold-icon-local.png"><span>' + n.address + '</span></div>' +
                '<div class="row-item"><img src="../images/contact/foothold-icon-phone.png"><span>' + n.tel + '</span></div>' +
                '<div class="row-item"><img src="../images/contact/fae-email.png"><span>' + n.email + '</span></div>' +
                '<div class="row-item" style = "display:' + (n.fax == '' ? "none" : "flex") + '"><img src="../images/contact/site-fax.png"><span>' + n.fax + '</span></div>' +
                '<div class="row-item" style = "display:' + (n.phone == '' ? "none" : "flex") + '"><img src="../images/contact/foothold-icon-tel.png"><span>' + n.phone + '</span></div>' +
                '<div class="row-item" style = "display:' + (n.name == '' ? "none" : "flex") + '"><img src="../images/contact/fae-people.png"><span>' + n.name + '</span></div></div>' +
                '<div class="row-item row_map" style = "display:' + (n.map == '' ? "none" : "flex") + '" onclick = "mapTps(this)" data-imgurl="' + n.mapurl + '"><img src="../images/contact/map_icon.png"><span>Map</span></div></div></div></div>'
        });
        $(".site-contain .site-list").append(html);
        $(".site-contain .site-message-box").append(htmlbox);
        $(".site-contain .site-message-box .site-message").eq(0).show().siblings().hide();
        $(".site-contain .site-list .site-item").eq(0).addClass("active");
        // 清除空白数据
        let doubleJudgment = 0
        for (let i = 0; i < $('.site-content .row-item').length; i++) {
            for (let v = 0; v < $('.site-content .row-item').eq(i).find('span').length; v++) {
                if (!$('.site-content .row-item').eq(i).find('span').eq(v).html()) {
                    doubleJudgment++
                    if (doubleJudgment >= $('.site-content .row-item').eq(i).find('span').length) {
                        $('.site-content .row-item').eq(i).remove()
                        doubleJudgment = 0
                    }
                } else {
                    doubleJudgment = 0
                }
            }
        }
    }
}


/**
 *fae
 *
 */
function fae() {
    var faedata = senAjax1("fae", "get", { lang: "en" });
    var html = '';
    $(".fae-container .fae-list").empty();
    if ($(window).width() < 1024) {
        $.each(faedata, function (i, n) {
            html += `<div class="fae-item-m">
                     <div class="fae-title">
                         <span>${n.area}</span>
                         <div class="arrow"></div>
                     </div>
                     <div class="fae-message">
                         <span class="message-title">${n.company}</span>
                         <div class="line"></div>
                         <div class="row">
                             <img class="row-icon" src="../images/contact/foothold-icon-local.png">
                             <div class="row-message">
                                 <span>${n.address}</span>
                             </div>
                         </div>
                         <div class="row">
                             <img class="row-icon" src="../images/contact/foothold-icon-phone.png">
                             <div class="row-message">
                                 <span>${n.tel + ' ' + n.otel}</span>
                             </div>
                         </div>
                         <div class="row">
                             <img class="row-icon" src="../images/contact/fae-people.png">
                             <div class="row-message">
                                 <span>${n.contacts}</span>
                             </div>
                         </div>
                         <div class="row">
                             <img class="row-icon" src="../images/contact/fae-email.png">
                             <div class="row-message">
                                 <span>${n.email}</span>
                             </div>
                         </div>
                         <div class="row" style = "display:${n.map == '' ? "none" : "flex"}" onclick = "mapTps(this)" data-imgurl = "${n.mapurl}">
                             <img class="row-icon" src="../images/contact/map_icon.png">
                             <div class="row-message">
                                 <span>Map</span>
                             </div>
                         </div>
                     </div>
                 </div>`
        });
        $(".fae-container .fae-list").append(html);
        // 清除空白数据
        let doubleJudgment = 0
        for (let i = 0; i < $('.fae-item-m .row-message').length; i++) {
            for (let v = 0; v < $('.fae-item-m .row-message').eq(i).find('span').length; v++) {
                if (!$('.fae-item-m .row-message').eq(i).find('span').eq(v).html()) {
                    doubleJudgment++
                    if (doubleJudgment >= $('.fae-item-m .row-message').eq(i).find('span').length) {
                        $('.fae-item-m .row').eq(i).remove()
                        doubleJudgment = 0
                    }
                } else {
                    doubleJudgment = 0
                }
            }
        }
    } else {
        $.each(faedata, function (i, n) {
            html += '<div class = "fae-item"><div class="fae-name"><span>' + n.company + '</span></div>' +
                '<div class="fae-content"><div class = "row"><div class = "row-item"> <img src="../images/contact/foothold-icon-local.png"><div><span>' + n.address + '</span></div></div><div class = "row-item"> <img src="../images/contact/foothold-icon-tel.png"><div><span>' + n.tel + '</span><span>' + n.otel + '</span></div></div></div>' +
                '<div class = "row"><div class = "row-item"> <img src="../images/contact/fae-people.png"><div><span>' + n.contacts + '</span><span>' + n.ocontacts + '</span></div></div><div class = "row-item"> <img src="../images/contact/fae-email.png"><div><span>' + n.email + '</span><span>' + n.oemail + '</span></div></div></div>' +
                '<div class = "row"><div class = "row-item row_map" style = "display:' + (n.map == '' ? "none" : "flex") + '" onclick = "mapTps(this)" data-imgurl = "' + n.mapurl + '"><img src = "../images/contact/map_icon.png"><div><span>Map</span></div></div></div>'
                + '</div>'
        });
    }
    $(".fae-container .fae-list").append(html);
    // 清除空白数据
    let doubleJudgment = 0
    for (let i = 0; i < $('.fae-list .row-item').length; i++) {
        for (let v = 0; v < $('.fae-list .row-item').eq(i).find('span').length; v++) {
            if (!$('.fae-list .row-item').eq(i).find('span').eq(v).html()) {
                doubleJudgment++
                if (doubleJudgment >= $('.fae-list .row-item').eq(i).find('span').length) {
                    $('.fae-list .row-item').eq(i).remove()
                    doubleJudgment = 0
                }
            } else {
                doubleJudgment = 0
            }
        }
    }
}

/**
 *地区类型
 *
 */
function strongholdareatype() {
    var strongholdareatype = senAjax1("strongholdareatype", "get", { lang: "en" });
    $(".classification-row2 .items").empty();

    var html = '';
    $.each(strongholdareatype, function (i, n) {
        html += '<div class = "classification-item"><span data-id = "' + n.id + '">' + n.area + '</span></div>'
    });
    $(".classification-row2 .items").append(html);

    $(".classification-row2 .items .classification-item").eq(0).addClass("active");

    // swiper.update();
}

/**
 *据点搜索
 *
 */
function strongholdsearch() {
    var data = {
        type: typetext,
        area: areaid,
        lang: "en"
    }
    var strongholdsearchdata = senAjax1("strongholdsearch", "get", data);
    $(".foothold-list").empty();
    var html = '';
    if (strongholdsearchdata.length == 0) {
        html = '<div class = "nodata">There is no data at present. Please look forward to it.</div>'
    } else {
        $.each(strongholdsearchdata, function (i, n) {
            if (typetext == 'Headquarters') {
                html += '<div class = "foothold-item"><div class = "foothold-name"><span>' + n.company + '</span></div>' +
                    '<div class="foothold-content"><div class = "row">' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-local.png"><div><span>' + n.address + '</span></div>' +
                    '</div><div class ="row-item"><img src="../images/contact/foothold-icon-tel.png"><div><span>' + n.phone + '</span><span>' + n.ophone + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/fae-people.png"><div><span>' + n.name + '</span><span>' + n.oname + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-phone.png"><div><span>' + n.tel + '</span><span>' + n.otel + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/site-fax.png"><div><span>' + n.fax + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/fae-email.png"><div><span>' + n.email + '</span><span>' + n.oemail + '</span></div></div></div></div></div>'
            } else if (typetext == "Subsidiary") {
                html += '<div class = "foothold-item"><div class = "foothold-name"><span>' + n.company + '</span></div>' +
                    '<div class="foothold-content"><div class = "row">' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-local.png"><div><span>' + n.address + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-phone.png"><div><span>' + n.otel + '</span><span>' + n.tel + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-card.png"><div><span>' + n.subsidiary + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-type.png"><div><span>' + n.dep + '</span></div></div></div></div></div>'
            } else if (typetext == "Factory") {
                html += '<div class = "foothold-item"><div class = "foothold-name"><span>' + n.company + '</span></div>' +
                    '<div class="foothold-content"><div class = "row">' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-local.png"><div><span>' + n.address + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-phone.png"><div><span>' + n.tel + '</span></div></div>' +
                    '<div class ="row-item" style = "display:' + (n.phone == '' ? "none" : "flex") + '"><img src="../images/contact/foothold-icon-tel.png"><div><span>' + n.phone + '</span></div></div>' +
                    '<div class ="row-item" style = "display:' + (n.name == '' ? "none" : "flex") + '"><img src="../images/contact/fae-people.png"><div><span>' + n.name + '</span></div></div>' +
                    '<div class ="row-item" style = "display:' + (n.fax == '' ? "none" : "flex") + '"><img src="../images/contact/site-fax.png"><div><span>' + n.fax + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/fae-email.png"><div><span>' + n.email + '</span></div></div>' +
                    '<div class ="row-item row_map" style = "display:' + (n.map == '' ? "none" : "flex") + '" onclick = "mapTps(this)" data-imgurl = "' + n.mapurl + '"><img src="../images/contact/map_icon.png"><div><span>Map</span></div></div></div></div></div>'
            } else if (typetext == "Sales") {
                html += '<div class = "foothold-item"><div class = "foothold-name"><span>' + n.company + '</span></div>' +
                    '<div class="foothold-content"><div class = "row">' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-local.png"><div><span>' + n.address + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-tel.png"><div><span>' + n.phone + '</span><span>' + n.ophone + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/fae-people.png"><div><span>' + n.contacts + '</span><span>' + n.ocontacts + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-phone.png"><div><span>' + n.tel + '</span><span>' + n.otel + '</span></div></div>' +
                    '<div class ="row-item" style = "display:' + (n.fax == '' ? "none" : "flex") + '"><img src="../images/contact/site-fax.png"><div><span>' + n.fax + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/fae-email.png"><div><span>' + n.email + '</span><span>' + n.oemail + '</span></div></div>' +
                    '<div class ="row-item" style = "display:' + (n.link == '' ? "none" : "flex") + '"><img src="../images/contact/site-fax.png"><div><a href = "' + n.link + '" target = "_blank">' + n.link + '</a></div></div>' +
                    '<div class ="row-item row_map" style = "display:' + (n.map == '' ? "none" : "flex") + '" onclick = "mapTps(this)" data-imgurl = "' + n.mapurl + '"><img src="../images/contact/map_icon.png"><div><span>Map</span></div></div></div></div></div>'

            } else {
                html += '<div class = "foothold-item"><div class = "foothold-name"><span>' + n.company + '</span></div>' +
                    '<div class="foothold-content"><div class = "row">' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-local.png"><div><span>' + n.address + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/foothold-icon-phone.png"><div><span>' + n.tel + '</span><span>' + n.otel + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/fae-people.png"><div><span>' + n.contacts + '</span><span>' + n.ocontacts + '</span></div></div>' +
                    '<div class ="row-item"><img src="../images/contact/fae-email.png"><div><span>' + n.email + '</span><span>' + n.oemail + '</span></div></div>' +
                    '<div class ="row-item row_map" style = "display:' + (n.map == '' ? "none" : "flex") + '" onclick = "mapTps(this)" data-imgurl = "' + n.mapurl + '"><img src="../images/contact/map_icon.png"><div><span>Map</span></div></div></div></div></div>'
            }
        });
    }
    $(".foothold-list").append(html);
    // 清除空白数据
    let doubleJudgment = 0
    for (let i = 0; i < $('.foothold-content .row-item').length; i++) {
        for (let v = 0; v < $('.foothold-content .row-item').eq(i).find('span').length; v++) {
            if (!$('.foothold-content .row-item').eq(i).find('span').eq(v).html()) {
                doubleJudgment++
                if (doubleJudgment >= 2) {
                    $('.foothold-content .row-item').eq(i).remove()
                    doubleJudgment = 0
                }
            } else {
                doubleJudgment = 0
            }
        }
    }
};

/**
 *区域
 *
 */
function region() {
    var regiondata = senAjax1("region", "get", { lang: "en" });
    var html = '';
    var htmlbox = '';
    if ($(window).width() < 1024) {
        $(".area-contain-m").empty();
        $.each(regiondata, function (i, n) {
            html += '<div class = "area-item"><div class = "area-title"><span>' + n.area + '</span><div class="arrow"></div></div>' +
                '<div class = "area-message"><span class="message-title">' + n.company + '</span><div class="line"></div>' +
                '<div class = "row"><img class="row-icon" src="../images/contact/foothold-icon-local.png"><div class="row-message"><span>' + n.address + '</span></div></div>' +
                '<div class = "row"><img class="row-icon" src="../images/contact/foothold-icon-phone.png"><div class="row-message"><span>' + n.phone + '</span><span>' + n.ophone + '</span></div></div>' +
                '<div class = "row"><img class="row-icon" src="../images/contact/fae-people.png"><div class="row-message"><span>' + n.contacts + '</span><span>' + n.ocontacts + '</span></div></div>' +
                '<div class = "row"><img class="row-icon" src="../images/contact/foothold-icon-tel.png"><div class="row-message"><span>' + n.tel + '</span><span>' + n.otel + '</span></div></div>' +
                '<div class = "row" style = "display:' + (n.fax == '' ? "none" : "flex") + '"><img class="row-icon" src="../images/contact/site-fax.png"><div class="row-message"><span>' + n.fax + '</span></div></div>' +
                '<div class = "row"><img class="row-icon" src="../images/contact/fae-email.png"><div class="row-message"><span>' + n.email + '</span><span>' + n.oemail + '</span></div></div>' +
                '<div class = "row" style = "display:' + (n.link == '' ? "none" : "flex") + '"><img class="row-icon" src="../images/contact/website.png"><div class="row-message"><a href = "' + n.link + '" target = "_blank">' + n.link + '</a></div></div>' +
                '<div class = "row" style = "display:' + (n.map == '' ? "none" : "flex") + '" onclick = "mapTps(this)" data-imgurl = "' + n.mapurl + '"><img class="row-icon" src="../images/contact/map_icon.png"><div class="row-message"><span>Map</span></div></div>' +
                '</div></div></div>'

        })
        $(".area-contain-m").append(html)
        // 清除空白数据
        let doubleJudgment = 0
        for (let i = 0; i < $('.area-contain-m .row-message').length; i++) {
            for (let v = 0; v < $('.area-contain-m .row-message').eq(i).find('span').length; v++) {
                if (!$('.area-contain-m .row-message').eq(i).find('span').eq(v).html()) {
                    doubleJudgment++
                    if (doubleJudgment >= 2) {
                        $('.area-contain-m .row').eq(i).remove()
                        doubleJudgment = 0
                    }
                } else {
                    doubleJudgment = 0
                }
            }
        }
    } else {
        $(".area-contain .area-list").empty();
        $(".area-message-box").empty();
        $.each(regiondata, function (i, n) {
            htmlbox += '<div class = "area-item "><span data-id = "' + n.id + '">' + n.area + '</span></div>';
            html += '<div class = "area-message"><div class="area-title"><span>' + n.company + '</span></div>' +
                '<div class="area-content">' +
                '<div class = "row-item"><img src = "../images/contact/foothold-icon-local.png"><div><span>' + n.address + '</span></div></div>' +
                '<div class = "row-item"><img src = "../images/contact/foothold-icon-tel.png"><div><span>' + n.phone + '</span><span>' + n.ophone + '</span></div></div>' +
                '<div class = "row-item"><img src = "../images/contact/fae-people.png"><div><span>' + n.contacts + '</span><span>' + n.ocontacts + '</span></div></div>' +
                '<div class = "row-item"><img src = "../images/contact/foothold-icon-phone.png"><div><span>' + n.tel + '</span><span>' + n.otel + '</span></div></div>' +
                '<div class = "row-item"   style = "display:' + (n.fax == '' ? "none" : "flex") + '"><img src = "../images/contact/site-fax.png"><div><span>' + n.fax + '</span></div></div>' +
                '<div class = "row-item"><img src = "../images/contact/fae-email.png"><div><span>' + n.email + '</span><span>' + n.oemail + '</span></div></div>' +
                '<div class = "row-item" style = "display:' + (n.link == '' ? "none" : "flex") + '"><img src = "../images/contact/website.png"><div><a href = "' + n.link + '" target = "_blank"><p>' + n.link + '</p></a></div></div>' +
                '<div class = "row-item row-map" style = "display:' + (n.map == '' ? "none" : "flex") + '" onclick = "mapTps(this)" data-imgurl = "' + n.mapurl + '"><img class="row-icon" src="../images/contact/map_icon.png"><div><span>Map</span></div></div>' +
                '</div></div>'

        })
        $(".area-contain .area-list").append(htmlbox)
        $(".area-contain .area-list .area-item").eq(0).addClass("active");
        $(".area-message-box").append(html);
        $(".area-message-box .area-message").eq(0).show().siblings().hide();
        // 清除空白数据
        let doubleJudgment = 0
        for (let i = 0; i < $('.area-content .row-item').length; i++) {
            for (let v = 0; v < $('.area-content .row-item').eq(i).find('span').length; v++) {
                if (!$('.area-content .row-item').eq(i).find('span').eq(v).html()) {
                    doubleJudgment++
                    if (doubleJudgment >= 2) {
                        $('.area-content .row-item').eq(i).remove()
                        doubleJudgment = 0
                    }
                } else {
                    doubleJudgment = 0
                }
            }
        }
    }
}

//点击展开地图
function mapTps(e) {
    $(".map_tips").show();
    var imgurl = $(e).data("imgurl");
    $(".map_tipsbox_mapurl").attr("src", imgurl);
}